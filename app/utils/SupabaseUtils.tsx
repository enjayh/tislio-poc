import { SupabaseClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getSupabaseSession() {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  return (session)
}

export async function getSessionUserEmail() {

  const session = await getSupabaseSession()
  const email = session?.user.email

  if (!email) {
    console.log("No user email found in getSessionUserEmail.")
    return ("")
  }
  return (email)
}

export async function getAccountId(supabase: SupabaseClient, email: string) {
  const { data: account } = await supabase.from('Account')
    .select('id')
    .eq('email', email)
    .single()
  if (!account) {
    console.log('Unable to find account in getAccountId')
    return ("")
  }
  return (account.id)
}