// Datos locales de la empresa demo
export const DEMO_COMPANY_DATA = {
  company: {
    id: 'company-demo-001',
    name: 'Empresa Demo S.A.C.',
    ruc: '20123456789',
    email: 'demo@empresa.com',
    phone: '+51 999 888 777',
    address: 'Av. Demo 123, Lima, Perú',
    website: 'www.empresademo.com',
    logo: null,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: new Date().toISOString()
  },
  
  customers: [
    {
      id: 'customer-001',
      name: 'Juan Pérez',
      document_type: 'DNI',
      document_number: '12345678',
      email: 'juan.perez@email.com',
      phone: '+51 987 654 321',
      address: 'Av. Principal 456, Lima',
      is_active: true
    },
    {
      id: 'customer-002',
      name: 'María García',
      document_type: 'DNI',
      document_number: '87654321',
      email: 'maria.garcia@email.com',
      phone: '+51 987 123 456',
      address: 'Jr. Comercio 789, Lima',
      is_active: true
    },
    {
      id: 'customer-003',
      name: 'Corporación ABC S.A.',
      document_type: 'RUC',
      document_number: '20987654321',
      email: 'contacto@corporacionabc.com',
      phone: '+51 999 111 222',
      address: 'Av. Empresarial 1000, San Isidro',
      is_active: true
    }
  ],

  products: [
    {
      id: 'product-001',
      name: 'Laptop HP Pavilion',
      description: 'Laptop HP Pavilion 15.6" Intel Core i5',
      price: 2500.00,
      stock: 15,
      category: 'Tecnología',
      sku: 'LAP-HP-001',
      is_active: true
    },
    {
      id: 'product-002',
      name: 'Mouse Inalámbrico',
      description: 'Mouse inalámbrico ergonómico',
      price: 45.00,
      stock: 50,
      category: 'Accesorios',
      sku: 'MOU-WIR-001',
      is_active: true
    },
    {
      id: 'product-003',
      name: 'Servicio de Consultoría',
      description: 'Consultoría en sistemas por hora',
      price: 150.00,
      stock: null, // Servicio sin stock
      category: 'Servicios',
      sku: 'SRV-CON-001',
      is_active: true
    }
  ],

  invoices: [
    {
      id: 'invoice-001',
      number: 'F001-00001',
      customer_id: 'customer-001',
      customer_name: 'Juan Pérez',
      date: '2024-01-15',
      due_date: '2024-02-15',
      subtotal: 2500.00,
      tax: 450.00,
      total: 2950.00,
      status: 'paid',
      items: [
        {
          product_id: 'product-001',
          product_name: 'Laptop HP Pavilion',
          quantity: 1,
          price: 2500.00,
          total: 2500.00
        }
      ]
    },
    {
      id: 'invoice-002',
      number: 'F001-00002',
      customer_id: 'customer-002',
      customer_name: 'María García',
      date: '2024-01-20',
      due_date: '2024-02-20',
      subtotal: 90.00,
      tax: 16.20,
      total: 106.20,
      status: 'pending',
      items: [
        {
          product_id: 'product-002',
          product_name: 'Mouse Inalámbrico',
          quantity: 2,
          price: 45.00,
          total: 90.00
        }
      ]
    }
  ],

  payments: [
    {
      id: 'payment-001',
      invoice_id: 'invoice-001',
      amount: 2950.00,
      method: 'transfer',
      date: '2024-01-16',
      reference: 'TRF-001-2024',
      status: 'completed'
    }
  ]
};
