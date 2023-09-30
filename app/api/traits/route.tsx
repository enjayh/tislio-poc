import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const trait = await request.json()
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)

  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Trait')
    .insert({
      name: trait.name,
      type: trait.type,
      account_id: accountId
    })
    .select()
    .single()
  return NextResponse.json({ data, error })
}