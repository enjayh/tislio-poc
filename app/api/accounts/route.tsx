import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/prisma-utils'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const account = await request.json()

  try {
    await prisma.account.create({
      data: {
        email: account.email
      }
    })
  } catch (e) {
    console.error(`Error adding account:\n${JSON.stringify(e)}`)
    return NextResponse.error()
  }

  return new NextResponse()
}