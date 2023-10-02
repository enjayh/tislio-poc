import { SupabaseClient, createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getAccountIdFromRoute(): Promise<number> {
  const supabase = createRouteHandlerClient({ cookies })
  return getAccountIdFromSupabaseClient(supabase)
}

export async function getAccountIdFromServerComponent(): Promise<number> {
  const supabase = createServerComponentClient({ cookies })
  return getAccountIdFromSupabaseClient(supabase)
}

async function getAccountIdFromSupabaseClient(supabase: SupabaseClient): Promise<number> {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    throw new Error(`Failed to get session: ${error.message}`)
  }
  if (!session) {
    throw new Error('Failed to get session')
  }
  const email = session.user.email

  const { data: account, error: accountError } = await supabase.from('Account')
    .select('id')
    .eq('email', email)
    .single()
  if (accountError) {
    throw new Error(`Failed to get account: ${accountError.message}`)
  }
  if (!account) {
    throw new Error('Failed to get account')
  }

  return account.id
}