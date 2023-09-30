import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

interface Trait {
  name: string;
  type: string;
  id: number;
}

export default async function TraitList() {
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Trait')
    .select('name, type, id')
    .eq('account_id', accountId)

  if (error) {
    console.error('Error getting trait: ' + error.message)
  }

  const trait = data || []

  return (
    <>
      {trait.map((trait: Trait) => (
        <div key={trait.id} className="tagStyle">
          <p>{trait.name}: {trait.type}</p>
        </div>
      ))}
    </>
  )
}