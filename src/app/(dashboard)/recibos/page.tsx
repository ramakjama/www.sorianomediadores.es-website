'use client'

import { useState } from 'react'
import {
  Receipt,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  CreditCard,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  Eye,
  History
} from 'lucide-react'

// Mock data - en produccion vendria de la API
const mockReceipts = [
  {
    id: '1',
    receiptNumber: 'REC-2025-001234',
    policyNumber: 'POL-AUTO-2024-0001',
    policyType: 'AUTO',
    concept: 'Prima anual - Seguro de Coche',
    period: '01/01/2025 - 31/12/2025',
    amount: 450.00,
    tax: 28.35,
    totalAmount: 478.35,
    status: 'PAGADO',
    issueDate: '2025-01-01',
    dueDate: '2025-01-15',
    paidDate: '2025-01-10',
    paymentMethod: 'DOMICILIACION',
    bankAccount: 'ES** **** **** **** **34',
  },
  {
    id: '2',
    receiptNumber: 'REC-2025-001235',
    policyNumber: 'POL-HOGAR-2024-0002',
    policyType: 'HOGAR',
    concept: 'Prima anual - Seguro de Hogar',
    period: '01/02/2025 - 31/01/2026',
    amount: 280.00,
    tax: 17.64,
    totalAmount: 297.64,
    status: 'PENDIENTE',
    issueDate: '2025-01-15',
    dueDate: '2025-02-01',
    paidDate: null,
    paymentMethod: 'DOMICILIACION',
    bankAccount: 'ES** **** **** **** **34',
  },
  {
    id: '3',
    receiptNumber: 'REC-2024-009876',
    policyNumber: 'POL-VIDA-2023-0001',
    policyType: 'VIDA',
    concept: 'Prima trimestral - Seguro de Vida',
    period: '01/10/2024 - 31/12/2024',
    amount: 75.00,
    tax: 0,
    totalAmount: 75.00,
    status: 'PAGADO',
    issueDate: '2024-09-25',
    dueDate: '2024-10-05',
    paidDate: '2024-10-03',
    paymentMethod: 'TARJETA',
    bankAccount: null,
  },
  {
    id: '4',
    receiptNumber: 'REC-2024-008543',
    policyNumber: 'POL-AUTO-2024-0001',
    policyType: 'AUTO',
    concept: 'Prima anual - Seguro de Coche',
    period: '01/01/2024 - 31/12/2024',
    amount: 420.00,
    tax: 26.46,
    totalAmount: 446.46,
    status: 'PAGADO',
    issueDate: '2023-12-15',
    dueDate: '2024-01-01',
    paidDate: '2023-12-28',
    paymentMethod: 'DOMICILIACION',
    bankAccount: 'ES** **** **** **** **34',
  },
]

const statusConfig = {
  PENDIENTE: {
    label: 'Pendiente',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    icon: Clock
  },
  PAGADO: {
    label: 'Pagado',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: CheckCircle2
  },
  VENCIDO: {
    label: 'Vencido',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: AlertCircle
  },
  DEVUELTO: {
    label: 'Devuelto',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    icon: XCircle
  },
  ANULADO: {
    label: 'Anulado',
    color: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400',
    icon: XCircle
  },
}

const policyTypeColors = {
  AUTO: 'bg-blue-500',
  HOGAR: 'bg-emerald-500',
  VIDA: 'bg-purple-500',
  SALUD: 'bg-rose-500',
  DECESOS: 'bg-neutral-500',
}

export default function RecibosPage() {
  const [filter, setFilter] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null)

  const filteredReceipts = mockReceipts.filter(receipt => {
    const matchesFilter = filter === 'todos' || receipt.status === filter
    const matchesSearch =
      receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.concept.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: mockReceipts.length,
    pagados: mockReceipts.filter(r => r.status === 'PAGADO').length,
    pendientes: mockReceipts.filter(r => r.status === 'PENDIENTE').length,
    totalPagado: mockReceipts
      .filter(r => r.status === 'PAGADO')
      .reduce((sum, r) => sum + r.totalAmount, 0),
    totalPendiente: mockReceipts
      .filter(r => r.status === 'PENDIENTE')
      .reduce((sum, r) => sum + r.totalAmount, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Mis Recibos
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          Gestiona y descarga tus recibos de pago
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Total Recibos</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Pagados</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.pagados}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Pendientes</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.pendientes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <CreditCard className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Importe Pendiente</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {stats.totalPendiente.toFixed(2)}€
              </p>
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
            placeholder="Buscar por numero, poliza o concepto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent outline-none transition cursor-pointer"
          >
            <option value="todos">Todos los estados</option>
            <option value="PENDIENTE">Pendientes</option>
            <option value="PAGADO">Pagados</option>
            <option value="VENCIDO">Vencidos</option>
            <option value="DEVUELTO">Devueltos</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      {/* Receipts List */}
      <div className="space-y-4">
        {filteredReceipts.map((receipt) => {
          const status = statusConfig[receipt.status as keyof typeof statusConfig]
          const StatusIcon = status.icon
          const policyColor = policyTypeColors[receipt.policyType as keyof typeof policyTypeColors] || 'bg-neutral-500'

          return (
            <div
              key={receipt.id}
              className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Left: Receipt Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-1 h-10 rounded-full ${policyColor}`} />
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {receipt.concept}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {receipt.receiptNumber} · {receipt.policyNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400 ml-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        Periodo: {receipt.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" />
                        {receipt.paymentMethod === 'DOMICILIACION' ? 'Domiciliacion' :
                         receipt.paymentMethod === 'TARJETA' ? 'Tarjeta' :
                         receipt.paymentMethod || 'Sin especificar'}
                      </span>
                    </div>
                  </div>

                  {/* Center: Amount */}
                  <div className="text-left lg:text-right">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {receipt.totalAmount.toFixed(2)}€
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Base: {receipt.amount.toFixed(2)}€ + IVA: {receipt.tax.toFixed(2)}€
                    </p>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {status.label}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedReceipt(selectedReceipt === receipt.id ? null : receipt.id)}
                        className="p-2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition"
                        title="Ver detalles"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition"
                        title="Ver historial"
                      >
                        <History className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-[#E30613] hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                        title="Descargar recibo"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedReceipt === receipt.id && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Fecha Emision</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {new Date(receipt.issueDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Fecha Vencimiento</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {new Date(receipt.dueDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Fecha Pago</p>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {receipt.paidDate
                            ? new Date(receipt.paidDate).toLocaleDateString('es-ES')
                            : '-'}
                        </p>
                      </div>
                      {receipt.bankAccount && (
                        <div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Cuenta Bancaria</p>
                          <p className="font-medium text-neutral-900 dark:text-white font-mono">
                            {receipt.bankAccount}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Download buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#E30613] text-white rounded-lg hover:bg-[#CC050F] transition text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Descargar Recibo PDF
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        Ver Poliza Asociada
                      </button>
                      {receipt.status === 'PAGADO' && (
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Justificante de Pago
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline indicator for pending */}
              {receipt.status === 'PENDIENTE' && (
                <div className="px-5 py-3 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-200 dark:border-amber-900/50">
                  <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Vencimiento: {new Date(receipt.dueDate).toLocaleDateString('es-ES')}
                    {' '}({Math.ceil((new Date(receipt.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias restantes)
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {filteredReceipts.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <Receipt className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400">
              No se encontraron recibos con los filtros aplicados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
