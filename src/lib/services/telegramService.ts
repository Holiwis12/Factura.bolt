// Servicio completo de Telegram para envío de facturas

interface TelegramMessage {
  chat_id: string;
  text?: string;
  document?: {
    filename: string;
    content: string; // Base64
  };
  parse_mode?: 'HTML' | 'Markdown';
}

interface TelegramResponse {
  ok: boolean;
  result?: any;
  error_code?: number;
  description?: string;
}

export class TelegramBotService {
  private botToken: string;
  private baseUrl: string;

  constructor(botToken: string) {
    this.botToken = botToken;
    this.baseUrl = `https://api.telegram.org/bot${botToken}`;
  }

  // Enviar mensaje de texto
  async sendMessage(chatId: string, text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: parseMode,
        }),
      });

      return await response.json();
    } catch (error) {
      return {
        ok: false,
        error_code: 500,
        description: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Enviar documento (PDF de factura)
  async sendDocument(chatId: string, filename: string, documentBuffer: Buffer, caption?: string): Promise<TelegramResponse> {
    try {
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('document', new Blob([documentBuffer], { type: 'application/pdf' }), filename);
      
      if (caption) {
        formData.append('caption', caption);
      }

      const response = await fetch(`${this.baseUrl}/sendDocument`, {
        method: 'POST',
        body: formData,
      });

      return await response.json();
    } catch (error) {
      return {
        ok: false,
        error_code: 500,
        description: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Verificar si el bot token es válido
  async verifyBot(): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/getMe`);
      return await response.json();
    } catch (error) {
      return {
        ok: false,
        error_code: 500,
        description: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Obtener información del chat
  async getChat(chatId: string): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/getChat?chat_id=${chatId}`);
      return await response.json();
    } catch (error) {
      return {
        ok: false,
        error_code: 500,
        description: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }
}

// Servicio para generar mensajes de factura
export class InvoiceTelegramService {
  static generateInvoiceMessage(invoice: any, company: any): string {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: company.currency || 'DOP'
      }).format(amount);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('es-DO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    let message = `
🧾 <b>FACTURA GENERADA</b>

🏢 <b>${company.name}</b>
📄 Factura: <b>${invoice.number}</b>
📅 Fecha: ${formatDate(invoice.created_at)}

👤 <b>Cliente:</b>
${invoice.clients?.name || 'Cliente General'}
${invoice.clients?.email ? `📧 ${invoice.clients.email}` : ''}
${invoice.clients?.phone ? `📞 ${invoice.clients.phone}` : ''}

💰 <b>Resumen:</b>
• Subtotal: ${formatCurrency(invoice.subtotal)}
• Impuestos: ${formatCurrency(invoice.tax)}
${invoice.discount > 0 ? `• Descuento: ${formatCurrency(invoice.discount)}` : ''}
• <b>Total: ${formatCurrency(invoice.total)}</b>

📋 <b>Estado:</b> ${this.getStatusEmoji(invoice.status)} ${this.getStatusText(invoice.status)}
`;

    if (invoice.notes) {
      message += `\n📝 <b>Notas:</b> ${invoice.notes}`;
    }

    if (invoice.due_date) {
      message += `\n⏰ <b>Vence:</b> ${formatDate(invoice.due_date)}`;
    }

    return message.trim();
  }

  private static getStatusEmoji(status: string): string {
    const statusEmojis: Record<string, string> = {
      'draft': '📝',
      'pending': '⏳',
      'paid': '✅',
      'cancelled': '❌',
      'overdue': '⚠️'
    };
    return statusEmojis[status] || '📄';
  }

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

  // Generar mensaje para cotización
  static generateQuotationMessage(quotation: any, company: any): string {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: company.currency || 'DOP'
      }).format(amount);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('es-DO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    let message = `
📋 <b>COTIZACIÓN GENERADA</b>

🏢 <b>${company.name}</b>
📄 Cotización: <b>${quotation.number}</b>
📅 Fecha: ${formatDate(quotation.created_at)}

👤 <b>Cliente:</b>
${quotation.clients?.name || 'Cliente General'}

💰 <b>Resumen:</b>
• Subtotal: ${formatCurrency(quotation.subtotal)}
• Impuestos: ${formatCurrency(quotation.tax)}
${quotation.discount > 0 ? `• Descuento: ${formatCurrency(quotation.discount)}` : ''}
• <b>Total: ${formatCurrency(quotation.total)}</b>

⏰ <b>Válida hasta:</b> ${quotation.valid_until ? formatDate(quotation.valid_until) : 'No especificado'}
`;

    if (quotation.notes) {
      message += `\n📝 <b>Notas:</b> ${quotation.notes}`;
    }

    return message.trim();
  }
}

// Hook para usar el servicio de Telegram
export function useTelegramService(botToken?: string) {
  const service = botToken ? new TelegramBotService(botToken) : null;

  const sendInvoiceToTelegram = async (
    invoice: any,
    company: any,
    chatId: string,
    includePDF: boolean = false
  ) => {
    if (!service) {
      throw new Error('Token de bot de Telegram no configurado');
    }

    // Enviar mensaje de texto
    const message = InvoiceTelegramService.generateInvoiceMessage(invoice, company);
    const textResult = await service.sendMessage(chatId, message);

    if (!textResult.ok) {
      throw new Error(`Error enviando mensaje: ${textResult.description}`);
    }

    // Si se requiere PDF, generarlo y enviarlo
    if (includePDF) {
      // Aquí se integraría con el servicio de generación de PDF
      // const pdfBuffer = await generateInvoicePDF(invoice, company);
      // const pdfResult = await service.sendDocument(
      //   chatId,
      //   `Factura_${invoice.number}.pdf`,
      //   pdfBuffer,
      //   `Factura ${invoice.number} - ${company.name}`
      // );
      
      // if (!pdfResult.ok) {
      //   throw new Error(`Error enviando PDF: ${pdfResult.description}`);
      // }
    }

    return textResult;
  };

  const sendQuotationToTelegram = async (
    quotation: any,
    company: any,
    chatId: string
  ) => {
    if (!service) {
      throw new Error('Token de bot de Telegram no configurado');
    }

    const message = InvoiceTelegramService.generateQuotationMessage(quotation, company);
    const result = await service.sendMessage(chatId, message);

    if (!result.ok) {
      throw new Error(`Error enviando cotización: ${result.description}`);
    }

    return result;
  };

  const verifyBotToken = async () => {
    if (!service) return null;
    return await service.verifyBot();
  };

  return {
    sendInvoiceToTelegram,
    sendQuotationToTelegram,
    verifyBotToken,
    service
  };
}
