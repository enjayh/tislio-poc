import { getAccountIdFromServerComponent } from '@/app/utils/supabase-utils';
import { getTags } from '@/app/utils/prisma-utils';
import { Tag } from '@/app/utils/types';

export const dynamic = 'force-dynamic'

export default async function TagList() {
  const accountId = await getAccountIdFromServerComponent()
  const tags: Tag[] = await getTags(accountId)

  return (
    <>
      {tags.length === 0 && (<div>Add some tags to have them show up here.</div>)}
      {tags.map((tag: Tag) => (
        <button key={tag.id} className="pill pill-tag">
          <p>{tag.name}</p>
        </button>
      ))}
    </>
  )
}
