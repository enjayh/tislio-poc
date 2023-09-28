import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const tag = await request.json()

  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const email = session?.user.email
  if (!email) {
    console.log('Unable to get session. Tag creation aborted.')
  }

  const { data: account } = await supabase.from('Account')
    .select()
    .eq('email', email)
    .single()
  if (!account) {
    console.log('Unable to find account. Tag creation aborted.')
  }
  
  const { data, error } = await supabase.from('Tag')
    .insert({
      ...tag,
      account_id: account.id
    })
    .select()
    .single()

  return NextResponse.json({ data, error })
}