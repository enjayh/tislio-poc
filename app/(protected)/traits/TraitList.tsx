import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils'
import { getTypeIcon } from '@/app/utils/general-utils'
import prisma from '@/app/utils/prisma-utils'
import { Trait } from '@/app/utils/types'

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
      {traits.length === 0 && (<div>Add some traits to have them show up here.</div>)}
      {traits.map((trait: Trait) => (
        <button key={trait.id} className="pill pill-trait">
          {getTypeIcon(trait.type, 'icon-pill')}
          <p>{trait.name}</p>
        </button>
      ))}
    </>
  )
}