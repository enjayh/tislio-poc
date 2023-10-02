import { getAccountIdFromRoute } from '@/app/utils/SupabaseUtils'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { NewNote, SelectableTag } from '@/app/utils/types'

export async function POST(request: NextRequest) {
  const note: NewNote = await request.json()
  const tags = note.tags
    .filter((tag: SelectableTag) => tag.selected)
    .map((tag: SelectableTag) => ({ id: tag.id }))

  const accountId = await getAccountIdFromRoute()

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