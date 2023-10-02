import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils';
import prisma from '@/app/utils/prisma-utils';
import { Trait } from '@/app/utils/types';

export const dynamic = 'force-dynamic'

export default async function TraitList() {
  const accountId = await getAccountIdFromServerComponent()

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