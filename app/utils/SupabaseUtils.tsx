import { SupabaseClient } from '@supabase/auth-helpers-nextjs'

export async function getSessionUserEmail(supabase: SupabaseClient) {
  const { data: { session } } = await supabase.auth.getSession()
  const email = session?.user.email

  if (!email) {
    throw new Error('No user email found in getSessionUserEmail.')
  }

  return (email)
}

export async function getAccountId(supabase: SupabaseClient, email: string) {
  const { data: account } = await supabase.from('Account')
    .select('id')
    .eq('email', email)
    .single()

  if (!account) {
    throw new Error('Unable to find account in getAccountId')
  }
  
  return (account.id)
}