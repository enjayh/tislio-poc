import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { NewTrait } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const trait: NewTrait = await request.json()

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

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