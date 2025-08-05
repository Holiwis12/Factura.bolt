import { createClient } from '@supabase/supabase-js'
import { UserRole } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getCurrentUserRole(): Promise<UserRole | null> {
  const user = await getCurrentUser()
  if (!user) return null

  const { data: member } = await supabase
    .from('organization_members')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return member?.role || null
}

export async function getCurrentOrganization() {
  const user = await getCurrentUser()
  if (!user) return null

  const { data: member } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .single()

  if (!member?.organization_id) return null

  const { data: org } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', member.organization_id)
    .single()

  return org
}

export async function hasPermission(requiredRole: UserRole): Promise<boolean> {
  const userRole = await getCurrentUserRole()
  if (!userRole) return false

  const roleHierarchy: Record<UserRole, number> = {
    'global_admin': 4,
    'org_admin': 3,
    'accountant': 2,
    'sales': 1,
    'inventory': 1
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}
