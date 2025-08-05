// Servicio para generación de PDF al vuelo (sin almacenamiento)
import html2pdf from 'html2pdf.js';
import type { Invoice, Company, Client } from '../types/database';

export interface PDFOptions {
  margin: number;
  filename: string;
  image: { type: string; quality: number };
  html2canvas: { scale: number };
  jsPDF: { unit: string; format: string; orientation: string };
}

export class PDFGeneratorService {
  private static defaultOptions: PDFOptions = {
    margin: 1,
    filename: 'documento.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generar HTML de factura
  static generateInvoiceHTML(invoice: Invoice, company: Company, client: Client): string {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: company.currency || 'DOP'
      }).format(amount);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('es-DO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    };

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura ${invoice.number}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            background: white;
        }
        
        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
        }
        
        .company-info {
            flex: 1;
        }
        
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 5px;
        }
        
        .company-details {
            color: #666;
            font-size: 11px;
        }
        
        .invoice-info {
            text-align: right;
            flex: 1;
        }
        
        .invoice-title {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        
        .invoice-number {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .client-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        
        .client-info, .invoice-details {
            flex: 1;
            padding: 15px;
            background: #f8fafc;
            border-radius: 8px;
            margin-right: 15px;
        }
        
        .client-info:last-child, .invoice-details:last-child {
            margin-right: 0;
        }
        
        .section-title {
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .items-table th {
            background: #2563eb;
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: bold;
            font-size: 11px;
        }
        
        .items-table td {
            padding: 10px 8px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }
        
        .items-table tr:nth-child(even) {
            background: #f8fafc;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .totals-section {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
        }
        
        .totals-table {
            width: 300px;
        }
        
        .totals-table td {
            padding: 8px 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .totals-table .total-row {
            background: #2563eb;
            color: white;
            font-weight: bold;
            font-size: 14px;
        }
        
        .notes-section {
            margin-bottom: 20px;
        }
        
        .notes-content {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }
        
        .footer {
            text-align: center;
            color: #666;
            font-size: 10px;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-draft { background: #fbbf24; color: #92400e; }
        .status-pending { background: #60a5fa; color: #1e40af; }
        .status-paid { background: #34d399; color: #065f46; }
        .status-cancelled { background: #f87171; color: #991b1b; }
        .status-overdue { background: #f97316; color: #9a3412; }
    </style>
</head>
<body>
    <div class="invoice-container">
        <!-- Header -->
        <div class="header">
            <div class="company-info">
                <div class="company-name">${company.name}</div>
                <div class="company-details">
                    ${company.rnc ? `RNC: ${company.rnc}<br>` : ''}
                    ${company.phone ? `Tel: ${company.phone}<br>` : ''}
                    ${company.address ? `${company.address}<br>` : ''}
                </div>
            </div>
            <div class="invoice-info">
                <div class="invoice-title">FACTURA</div>
                <div class="invoice-number"># ${invoice.number}</div>
                ${invoice.ncf ? `<div><strong>NCF:</strong> ${invoice.ncf}</div>` : ''}
                <div class="status-badge status-${invoice.status}">
                    ${this.getStatusText(invoice.status)}
                </div>
            </div>
        </div>
        
        <!-- Client and Invoice Details -->
        <div class="client-section">
            <div class="client-info">
                <div class="section-title">FACTURAR A:</div>
                <div><strong>${client.name}</strong></div>
                ${client.rnc ? `<div>RNC: ${client.rnc}</div>` : ''}
                ${client.email ? `<div>Email: ${client.email}</div>` : ''}
                ${client.phone ? `<div>Tel: ${client.phone}</div>` : ''}
                ${client.address ? `<div>${client.address}</div>` : ''}
            </div>
            <div class="invoice-details">
                <div class="section-title">DETALLES:</div>
                <div><strong>Fecha:</strong> ${formatDate(invoice.created_at)}</div>
                ${invoice.due_date ? `<div><strong>Vence:</strong> ${formatDate(invoice.due_date)}</div>` : ''}
                <div><strong>Términos:</strong> ${this.getPaymentTermsText(invoice.payment_terms)}</div>
                <div><strong>Estado Pago:</strong> ${this.getPaymentStatusText(invoice.payment_status)}</div>
            </div>
        </div>
        
        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 10%">Código</th>
                    <th style="width: 40%">Descripción</th>
                    <th style="width: 10%" class="text-center">Cant.</th>
                    <th style="width: 15%" class="text-right">Precio Unit.</th>
                    <th style="width: 10%" class="text-right">Desc.</th>
                    <th style="width: 15%" class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                ${invoice.items.map(item => `
                    <tr>
                        <td>${item.product_code}</td>
                        <td>${item.product_name}</td>
                        <td class="text-center">${item.quantity}</td>
                        <td class="text-right">${formatCurrency(item.unit_price)}</td>
                        <td class="text-right">${formatCurrency(item.discount)}</td>
                        <td class="text-right">${formatCurrency(item.total)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Totals -->
        <div class="totals-section">
            <table class="totals-table">
                <tr>
                    <td><strong>Subtotal:</strong></td>
                    <td class="text-right">${formatCurrency(invoice.subtotal)}</td>
                </tr>
                ${invoice.discount > 0 ? `
                <tr>
                    <td><strong>Descuento:</strong></td>
                    <td class="text-right">-${formatCurrency(invoice.discount)}</td>
                </tr>
                ` : ''}
                <tr>
                    <td><strong>Impuestos (ITBIS):</strong></td>
                    <td class="text-right">${formatCurrency(invoice.tax)}</td>
                </tr>
                <tr class="total-row">
                    <td><strong>TOTAL:</strong></td>
                    <td class="text-right"><strong>${formatCurrency(invoice.total)}</strong></td>
                </tr>
            </table>
        </div>
        
        <!-- Notes -->
        ${invoice.notes ? `
        <div class="notes-section">
            <div class="section-title">NOTAS:</div>
            <div class="notes-content">
                ${invoice.notes}
            </div>
        </div>
        ` : ''}
        
        <!-- Footer -->
        <div class="footer">
            <p>Factura generada electrónicamente - ${formatDate(new Date().toISOString())}</p>
            <p>Gracias por su preferencia</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  // Generar PDF desde HTML
  static async generatePDF(htmlContent: string, options: Partial<PDFOptions> = {}): Promise<Blob> {
    const finalOptions = { ...this.defaultOptions, ...options };
    
    // Crear elemento temporal
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);

    try {
      // Generar PDF
      const pdf = await html2pdf()
        .set(finalOptions)
        .from(element)
        .outputPdf('blob');

      return pdf;
    } finally {
      // Limpiar elemento temporal
      document.body.removeChild(element);
    }
  }

  // Generar y descargar PDF de factura
  static async downloadInvoicePDF(invoice: Invoice, company: Company, client: Client): Promise<void> {
    const htmlContent = this.generateInvoiceHTML(invoice, company, client);
    const options: Partial<PDFOptions> = {
      filename: `Factura_${invoice.number}.pdf`
    };

    const pdfBlob = await this.generatePDF(htmlContent, options);
    
    // Crear enlace de descarga
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = options.filename!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Obtener PDF como buffer para Telegram
  static async getInvoicePDFBuffer(invoice: Invoice, company: Company, client: Client): Promise<ArrayBuffer> {
    const htmlContent = this.generateInvoiceHTML(invoice, company, client);
    const pdfBlob = await this.generatePDF(htmlContent);
    return await pdfBlob.arrayBuffer();
  }

  // Funciones auxiliares
  private static getStatusText(status: string): string {
    const statusTexts: Record<string, string> = {
      'draft': 'Borrador',
      'pending': 'Pendiente',
      'paid': 'Pagada',
      'cancelled': 'Cancelada',
      'overdue': 'Vencida'
    };
    return statusTexts[status] || 'Desconocido';
  }

  private static getPaymentTermsText(terms: string): string {
    const termsTexts: Record<string, string> = {
      'immediate': 'Inmediato',
      'net_15': 'Neto 15 días',
      'net_30': 'Neto 30 días',
      'net_60': 'Neto 60 días'
    };
    return termsTexts[terms] || terms;
  }

  private static getPaymentStatusText(status: string): string {
    const statusTexts: Record<string, string> = {
      'pending': 'Pendiente',
      'partial': 'Parcial',
      'paid': 'Pagado',
      'overdue': 'Vencido'
    };
    return statusTexts[status] || status;
  }
}

// Hook para usar el servicio de PDF
export function usePDFService() {
  const generateInvoicePDF = async (invoice: Invoice, company: Company, client: Client) => {
    return await PDFGeneratorService.downloadInvoicePDF(invoice, company, client);
  };

  const getInvoicePDFBlob = async (invoice: Invoice, company: Company, client: Client) => {
    const htmlContent = PDFGeneratorService.generateInvoiceHTML(invoice, company, client);
    return await PDFGeneratorService.generatePDF(htmlContent);
  };

  const previewInvoiceHTML = (invoice: Invoice, company: Company, client: Client) => {
    const htmlContent = PDFGeneratorService.generateInvoiceHTML(invoice, company, client);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  return {
    generateInvoicePDF,
    getInvoicePDFBlob,
    previewInvoiceHTML
  };
}
