import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { SelectableTag } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const note = await request.json()

  const prisma = new PrismaClient()

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const tags = note.tagList
    .filter((tag: SelectableTag) => tag.selected)
    .map((tag: SelectableTag) => ({ id: tag.id }))

  const notTags = note.tagList
    .filter((tag: SelectableTag) => !tag.selected)
    .map((tag: SelectableTag) => ({ id: tag.id }))

  const updateNote = await prisma.note.update({
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


  return NextResponse.json({ data: {} })
}