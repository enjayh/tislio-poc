import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const account = await request.json()
  
  const prisma = new PrismaClient()

  try {
    await prisma.account.create({
      data: {
        ...account
      }
    })
  } catch (e) {
    console.error(`Error adding account:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}