import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils'
import { NewTag } from '@/app/utils/types'
import { PrismaClient } from '@prisma/client'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const tag: NewTag = await request.json()

  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

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