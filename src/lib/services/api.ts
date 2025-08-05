import { supabase } from '../supabase';
import type { 
  Company, 
  Product, 
  Invoice, 
  Client, 
  ApiResponse,
  BaseFilter
} from '../types/database';

// Clase base para servicios API - SIMPLIFICADA
class BaseApiService {
  protected async handleResponse<T>(promise: Promise<any>): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await promise;
      if (error) throw error;
      return { data, status: 200 };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Error desconocido',
        status: 500
      };
    }
  }
}

// Servicio de empresas - SIMPLIFICADO
export class CompanyService extends BaseApiService {
  async getAll(): Promise<ApiResponse<Company[]>> {
    return this.handleResponse(
      supabase.from('companies').select('*').order('name')
    );
  }

  async getById(id: string): Promise<ApiResponse<Company>> {
    return this.handleResponse(
      supabase.from('companies').select('*').eq('id', id).single()
    );
  }

  async create(company: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Company>> {
    return this.handleResponse(
      supabase.from('companies').insert(company).select().single()
    );
  }

  async update(id: string, updates: Partial<Company>): Promise<ApiResponse<Company>> {
    return this.handleResponse(
      supabase.from('companies').update(updates).eq('id', id).select().single()
    );
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.handleResponse(
      supabase.from('companies').delete().eq('id', id)
    );
  }
}

// Servicio de logs - SIMPLIFICADO
export class LogService extends BaseApiService {
  async log(action: string, entityType?: string, entityId?: string, details?: any): Promise<void> {
    await supabase.from('system_logs').insert({
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      user_agent: navigator.userAgent
    });
  }

  async getLogs(companyId?: string, filters: BaseFilter = {}): Promise<ApiResponse<any[]>> {
    let query = supabase.from('system_logs').select('*');
    
    if (companyId) {
      query = query.eq('company_id', companyId);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    return this.handleResponse(query.order('created_at', { ascending: false }));
  }
}

// Instancias de servicios - SIMPLIFICADAS
export const companyService = new CompanyService();
export const logService = new LogService();
