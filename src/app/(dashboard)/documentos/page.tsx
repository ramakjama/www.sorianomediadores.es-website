'use client'

import { useState } from 'react'
import {
  FolderOpen,
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Upload,
  File,
  FileCheck,
  FileClock,
  Calendar,
  ChevronDown,
  MoreVertical,
  Trash2,
  Share2
} from 'lucide-react'

// Mock data
const mockDocuments = [
  {
    id: '1',
    name: 'Póliza Seguro Coche 2024',
    type: 'POLIZA',
    fileName: 'poliza-auto-2024.pdf',
    fileSize: 245000,
    mimeType: 'application/pdf',
    policyNumber: 'POL-AUTO-2024-0001',
    createdAt: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    name: 'Condiciones Generales Auto',
    type: 'CONDICIONES_GENERALES',
    fileName: 'CG-auto-occident.pdf',
    fileSize: 1250000,
    mimeType: 'application/pdf',
    policyNumber: 'POL-AUTO-2024-0001',
    createdAt: '2024-01-15T10:30:00',
  },
  {
    id: '3',
    name: 'Recibo Prima Anual 2025',
    type: 'RECIBO',
    fileName: 'recibo-2025-001234.pdf',
    fileSize: 89000,
    mimeType: 'application/pdf',
    policyNumber: 'POL-AUTO-2024-0001',
    createdAt: '2025-01-10T09:00:00',
  },
  {
    id: '4',
    name: 'Póliza Seguro Hogar',
    type: 'POLIZA',
    fileName: 'poliza-hogar-2024.pdf',
    fileSize: 312000,
    mimeType: 'application/pdf',
    policyNumber: 'POL-HOGAR-2024-0002',
    createdAt: '2024-02-01T11:00:00',
  },
  {
    id: '5',
    name: 'Certificado de Póliza Vida',
    type: 'CERTIFICADO_POLIZA',
    fileName: 'certificado-vida.pdf',
    fileSize: 156000,
    mimeType: 'application/pdf',
    policyNumber: 'POL-VIDA-2023-0001',
    createdAt: '2023-06-01T14:00:00',
  },
  {
    id: '6',
    name: 'Carta Verde Internacional',
    type: 'CARTA_VERDE',
    fileName: 'carta-verde-2024.pdf',
    fileSize: 78000,
    mimeType: 'application/pdf',
    policyNumber: 'POL-AUTO-2024-0001',
    createdAt: '2024-06-15T16:00:00',
  },
  {
    id: '7',
    name: 'DNI Titular',
    type: 'DNI',
    fileName: 'dni-titular.jpg',
    fileSize: 450000,
    mimeType: 'image/jpeg',
    policyNumber: null,
    createdAt: '2024-01-10T08:00:00',
  },
]

const documentTypeConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  POLIZA: { label: 'Póliza', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: FileText },
  CONDICIONES_GENERALES: { label: 'Cond. Generales', color: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400', icon: File },
  CONDICIONES_PARTICULARES: { label: 'Cond. Particulares', color: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400', icon: File },
  CERTIFICADO_POLIZA: { label: 'Certificado', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: FileCheck },
  RECIBO: { label: 'Recibo', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: FileClock },
  JUSTIFICANTE_PAGO: { label: 'Justificante', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: FileCheck },
  CARTA_VERDE: { label: 'Carta Verde', color: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400', icon: FileText },
  DNI: { label: 'DNI', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: File },
  SINIESTRO: { label: 'Siniestro', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: File },
  OTROS: { label: 'Otros', color: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400', icon: File },
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function DocumentosPage() {
  const [filter, setFilter] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesFilter = filter === 'todos' || doc.type === filter
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: mockDocuments.length,
    polizas: mockDocuments.filter(d => d.type === 'POLIZA').length,
    recibos: mockDocuments.filter(d => d.type === 'RECIBO').length,
    totalSize: mockDocuments.reduce((sum, d) => sum + d.fileSize, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Mis Documentos
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Todos tus documentos de seguros en un solo lugar
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E30613] text-white rounded-xl hover:bg-[#CC050F] transition font-medium">
          <Upload className="w-5 h-5" />
          Subir documento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Total</p>
              <p className="text-xl font-bold text-neutral-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Pólizas</p>
              <p className="text-xl font-bold text-neutral-900 dark:text-white">{stats.polizas}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <FileClock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Recibos</p>
              <p className="text-xl font-bold text-neutral-900 dark:text-white">{stats.recibos}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <File className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Tamaño Total</p>
              <p className="text-xl font-bold text-neutral-900 dark:text-white">{formatFileSize(stats.totalSize)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition cursor-pointer"
        >
          <option value="todos">Todos los tipos</option>
          <option value="POLIZA">Pólizas</option>
          <option value="RECIBO">Recibos</option>
          <option value="CERTIFICADO_POLIZA">Certificados</option>
          <option value="CONDICIONES_GENERALES">Condiciones</option>
          <option value="CARTA_VERDE">Carta Verde</option>
          <option value="DNI">DNI</option>
        </select>
      </div>

      {/* Documents List */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900/50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Póliza
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Tamaño
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredDocuments.map((doc) => {
                const typeConfig = documentTypeConfig[doc.type] || documentTypeConfig.OTROS
                const TypeIcon = typeConfig.icon

                return (
                  <tr key={doc.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                          <TypeIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">{doc.name}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{doc.fileName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                        {doc.policyNumber || '-'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {new Date(doc.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatFileSize(doc.fileSize)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition" title="Ver">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-[#E30613] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" title="Descargar">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400">
              No se encontraron documentos
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
