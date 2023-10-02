import { getAccountIdFromRoute } from '@/app/utils/SupabaseUtils'
import { NewTag } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const tag: NewTag = await request.json()

  const accountId = await getAccountIdFromRoute()

  const prisma = new PrismaClient()
  try {
    await prisma.tag.create({
      data: {
        name: tag.name,
        account_id: accountId
      }
    })
  } catch (e) {
    console.error(`Error creating tag:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}