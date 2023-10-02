import { getAccountIdFromRoute } from '@/app/utils/SupabaseUtils'
import { NewTrait } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const trait: NewTrait = await request.json()

  const accountId = await getAccountIdFromRoute()

  const prisma = new PrismaClient()
  try {
    await prisma.trait.create({
      data: {
        name: trait.name,
        type: trait.type,
        account_id: accountId
      }
    })
  } catch (e) {
    console.error(`Error creating trait:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}