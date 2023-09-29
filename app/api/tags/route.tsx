import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const tag = await request.json()
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail()

  if (!email) {
    console.log('Unable to get session. Tag creation aborted.')
  }

  const accountId = await getAccountId(supabase, email)
  
  const { data, error } = await supabase
    .from('Tag')
    .insert({
      name: tag.name,
      account_id: accountId
    })
    .select()
    .single()
  return NextResponse.json({ data, error })
}

export async function GET(request:NextRequest) {

  console.log('hello from get')
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail()

  if (!email) {
    console.log('Unable to get session. Cannot return tag list.')
  }

  const accountId = await getAccountId(supabase, email)
  
  const { data, error } = await supabase
    .from('Tag')
    .select('name, id')
    .eq('account_id', accountId)
  return NextResponse.json({ data, error })
}