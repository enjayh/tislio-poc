import { getAccountIdFromRoute } from '@/app/utils/supabase-utils'
import prisma from '@/app/utils/prisma-utils'
import { NewTrait } from '@/app/utils/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const trait: NewTrait = await request.json()

  const accountId = await getAccountIdFromRoute()

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