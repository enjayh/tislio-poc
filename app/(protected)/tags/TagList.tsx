import { getAccountId, getSessionUserEmail } from '@/app/utils/SupabaseUtils';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

interface Tag {
  name: string;
  id: number;
}

export default async function TagList() {
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail(supabase)
  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Tag')
    .select('name, id')
    .eq('account_id', accountId)

  if (error) {
    console.error('Error getting tag: ' + error.message)
  }

  const tags = data || []

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
