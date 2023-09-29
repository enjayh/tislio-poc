import { getAccountId, getSessionUserEmail } from "@/app/utils/SupabaseUtils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
export const dynamic = 'force-dynamic'

interface Tag {
  name: string;
  id: number;
}

export default async function TagList() {
  const supabase = createRouteHandlerClient({ cookies })
  const email = await getSessionUserEmail()

  if (!email) {
    console.log('Unable to get session. Cannot return tag list.')
  }

  const accountId = await getAccountId(supabase, email)

  const { data, error } = await supabase
    .from('Tag')
    .select('name, id')
    .eq('account_id', accountId)

  if (error) {
    console.log(error.message)
  }

  let tags: {name: any, id: any}[] = []
  if (data) {
    tags = data
  }

  return (
    <>
      {tags.map((tag: Tag) => (
        <div key={tag.id} className="tagStyle">
          <p>{tag.name}</p>
        </div>
      ))}
    </>
  )
}
