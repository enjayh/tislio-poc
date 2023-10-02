import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const tag = await request.json()
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)

  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Tag')
    .insert({
      name: tag.name,
      account_id: accountId
    })
    .select()
    .single()
  
  if (error) {
    console.error(`Error creating tag:\n${error.message}`)
    return NextResponse.error()
  }
  
  return new NextResponse()
}