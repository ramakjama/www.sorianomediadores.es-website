import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSoriResponse, isClaudeConfigured, ChatMessage } from '@/lib/ai/claude-client'

// GET conversations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')

    if (conversationId) {
      // Get specific conversation with messages
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId: session.user.id,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      })

      return NextResponse.json(conversation)
    }

    // Get all conversations
    const conversations = await prisma.conversation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return NextResponse.json(conversations)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// POST send message
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { message, conversationId } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 })
    }

    let conversation
    let userId = session?.user?.id

    // For unauthenticated users
    if (!userId) {
      if (conversationId) {
        conversation = await prisma.conversation.findUnique({
          where: { id: conversationId },
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
              take: 20,
            },
          },
        })
      }

      if (!conversation) {
        // For anonymous users, generate response without persistence
        const result = await generateSoriResponse(message, [])
        return NextResponse.json({
          response: result.response,
          conversationId: null,
          aiPowered: isClaudeConfigured(),
        })
      }
    }

    // Authenticated user flow
    if (userId) {
      if (conversationId) {
        conversation = await prisma.conversation.findFirst({
          where: {
            id: conversationId,
            userId,
          },
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
              take: 20,
            },
          },
        })
      }

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            userId,
            title: message.substring(0, 50),
          },
          include: {
            messages: true,
          },
        })
      }

      // Save user message
      await prisma.chatMessage.create({
        data: {
          conversationId: conversation.id,
          role: 'USER',
          content: message,
        },
      })

      // Get user context for personalized responses
      const userContext = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          level: true,
          points: true,
          policies: {
            where: { status: 'ACTIVA' },
            select: { type: true, policyNumber: true },
          },
        },
      })

      // Build message history for Claude
      const messageHistory: ChatMessage[] = conversation.messages.map(m => ({
        role: m.role === 'USER' ? 'user' : 'assistant',
        content: m.content,
      }))

      // Add context about user if available
      let contextualMessage = message
      if (userContext?.name) {
        contextualMessage = `[Contexto: Cliente ${userContext.name}, nivel ${userContext.level}, ${userContext.points} puntos, ${userContext.policies?.length || 0} pólizas activas]\n\n${message}`
      }

      // Generate response using Claude API (or fallback)
      const result = await generateSoriResponse(contextualMessage, messageHistory)

      // Save assistant response
      await prisma.chatMessage.create({
        data: {
          conversationId: conversation.id,
          role: 'ASSISTANT',
          content: result.response,
        },
      })

      // Update conversation
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { updatedAt: new Date() },
      })

      // Award points for chat (once per day)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const chatPointsToday = await prisma.pointsHistory.findFirst({
        where: {
          userId,
          action: 'CHAT_SORI',
          createdAt: { gte: today },
        },
      })

      if (!chatPointsToday) {
        await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: { points: { increment: 10 } },
          }),
          prisma.pointsHistory.create({
            data: {
              userId,
              action: 'CHAT_SORI',
              points: 10,
              description: 'Interacción con SORI',
            },
          }),
        ])
      }

      return NextResponse.json({
        response: result.response,
        conversationId: conversation.id,
        aiPowered: isClaudeConfigured(),
      })
    }

    return NextResponse.json({ error: 'Error procesando mensaje' }, { status: 500 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
