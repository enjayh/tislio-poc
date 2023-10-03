import { getAccountIdFromRoute } from '@/app/utils/SupabaseUtils'
import prisma from '@/app/utils/prisma-utils'
import { UpdateNote } from '@/app/utils/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const note: UpdateNote = await request.json()

  const tags = note.tags
    .filter(tag => tag.selected)
    .map(tag => ({ id: tag.id }))
  const notTags = note.tags
    .filter(tag => !tag.selected)
    .map(tag => ({ id: tag.id }))

  const newTraits = note.traits
    .filter(trait => trait.selected && !trait.existing)
    .map(trait => ({
      note_id: note.id,
      trait_id: trait.id,
      value: trait.value
    }))
  const existingTraits = note.traits
    .filter(trait => trait.selected && trait.existing)
    .map(trait => ({
      note_id: note.id,
      trait_id: trait.id,
      value: trait.value
    }))
  const removedTraits = note.traits
    .filter(trait => !trait.selected && trait.existing)
    .map(trait => ({
      note_id: note.id,
      trait_id: trait.id
    }))

  const accountId = await getAccountIdFromRoute()

  try {
    await prisma.$transaction(async (tx) => {
      await tx.note.update({
        where: {
          id: note.id,
          account_id: accountId
        },
        data: {
          body: note.body,
          completed: note.completed,
          account_id: accountId,
          tags: {
            connect: tags,
            disconnect: notTags
          }
        }
      })

      await tx.notesOnTraits.createMany({
        data: newTraits
      })

      for (let i = 0; i < existingTraits.length; i++) {
        const trait = existingTraits[i]
        await tx.notesOnTraits.update({
          where: {
            note_id_trait_id: {
              note_id: trait.note_id,
              trait_id: trait.trait_id,
            }
          },
          data: {
            value: trait.value
          }
        })
      }

      for (let i = 0; i < removedTraits.length; i++) {
        const trait = removedTraits[i]
        await tx.notesOnTraits.delete({
          where: {
            note_id_trait_id: {
              note_id: trait.note_id,
              trait_id: trait.trait_id
            }
          }
        })
      }
    })
  } catch (e) {
    console.error(`Error updating note:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}