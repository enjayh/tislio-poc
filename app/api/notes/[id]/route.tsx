import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { SelectableTag, UpdateNote } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const note: UpdateNote = await request.json()
  const tags = note.tags
    .filter((tag: SelectableTag) => tag.selected)
    .map((tag: SelectableTag) => ({ id: tag.id }))
  const notTags = note.tags
    .filter((tag: SelectableTag) => !tag.selected)
    .map((tag: SelectableTag) => ({ id: tag.id }))

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const prisma = new PrismaClient()
  try {
    await prisma.note.update({
      where: {
        id: note.id,
        account_id: accountId
      },
      data: {
        body: note.body,
        completed: note.completed,
        account_id: accountId,
        tags: { connect: tags, disconnect: notTags }
      }
    })
  } catch (e) {
    console.error(`Error updating note:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}