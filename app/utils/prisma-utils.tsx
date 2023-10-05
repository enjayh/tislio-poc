import { PrismaClient } from '@prisma/client'
import { Note, Tag, Trait } from './types'

let prisma = new PrismaClient()
export default prisma

export async function getTags(accountId: number): Promise<Tag[]> {
  return await prisma.tag.findMany({
    where: {
      account_id: accountId
    },
    select: {
      id: true,
      name: true
    }
  })
}

export async function getTraits(accountId: number): Promise<Trait[]> {
  return await prisma.trait.findMany({
    where: {
      account_id: accountId
    },
    select: {
      id: true,
      name: true,
      type: true
    }
  })
}

export async function getNotes(accountId: number): Promise<Note[]> {
  return await prisma.note.findMany({
    where: {
      account_id: accountId
    },
    orderBy: [
      {
        completed: 'asc'
      },
      {
        updated_at: 'desc'
      },
    ],
    include: {
      tags: {
        select: {
          id: true,
          name: true
        }
      },
      traits: {
        include: {
          trait: {
            select: {
              id: true,
              name: true,
              type: true
            }
          }
        }
      }
    }
  })
}