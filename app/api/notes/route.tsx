import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { PrismaClient } from '@prisma/client'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { SelectableTag } from '@/app/utils/types'

export async function POST(request: NextRequest) {
  const note = await request.json()

  const tags = note.tagList
    .filter((tag: SelectableTag) => tag.selected)
    .map((tag: SelectableTag) => ({ id: tag.id }))


  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const prisma = new PrismaClient()
  try {
    await prisma.note.create({
      data: {
        body: note.body,
        completed: note.completed,
        account_id: accountId,
        tags: { connect: tags }
      }
    })
  } catch (e) {
    console.error(`Error creating note:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}