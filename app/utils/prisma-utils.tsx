import { PrismaClient } from '@prisma/client'
import { Tag } from './types'

export async function getTags(prisma: PrismaClient, accountId: number): Promise<Tag[]> {
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