import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils';
import { Tag } from '@/app/utils/types';
import { PrismaClient } from '@prisma/client';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function TagList() {
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const prisma = new PrismaClient()
  const tags: Tag[] = await prisma.tag.findMany({
    where: {
      account_id: accountId
    },
    select: {
      id: true,
      name: true
    }
  })

  return (
    <>
      {tags.map((tag: Tag) => (
        <div key={tag.id} className="item-pill">
          <p>{tag.name}</p>
        </div>
      ))}
    </>
  )
}
