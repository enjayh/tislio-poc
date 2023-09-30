import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const note = await request.json()

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Note')
    .update({
      body: note.body,
      completed: note.completed,
      updated_at: new Date()
    })
    .eq('id', note.id)
    .select()
    .single()
  return NextResponse.json({ data, error })
}