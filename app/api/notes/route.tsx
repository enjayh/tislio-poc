import { getAccountIdFromRoute } from '@/app/utils/supabase-utils'
import { NextRequest, NextResponse } from 'next/server'
import { NewNote, SelectableTag, SelectableTrait } from '@/app/utils/types'
import prisma from '@/app/utils/prisma-utils'

export async function POST(request: NextRequest) {
  const note: NewNote = await request.json()
  const tags = note.tags
    .filter((tag: SelectableTag) => tag.selected)
    .map((tag: SelectableTag) => ({ id: tag.id }))
  const traits = note.traits
    .filter((trait: SelectableTrait) => trait.selected)
    .map((trait: SelectableTrait) => ({ value: trait.value, trait: { connect: { id: trait.id } } }))

  const accountId = await getAccountIdFromRoute()

  try {
    await prisma.note.create({
      data: {
        body: note.body,
        completed: note.completed,
        account_id: accountId,
        tags: { connect: tags },
        traits: {
          create: traits
        }
      }
    })
  } catch (e) {
    console.error(`Error creating note:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}