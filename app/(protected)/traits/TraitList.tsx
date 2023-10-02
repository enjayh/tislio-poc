import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils';
import { Trait } from '@/app/utils/types';
import { PrismaClient } from '@prisma/client';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function TraitList() {
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const prisma = new PrismaClient()
  const traits: Trait[] = await prisma.trait.findMany({
    where: {
      account_id: accountId
    }
  })

  return (
    <>
      {traits.map((trait: Trait) => (
        <div key={trait.id} className="item-pill">
          <p>{trait.name} | {trait.type}</p>
        </div>
      ))}
    </>
  )
}