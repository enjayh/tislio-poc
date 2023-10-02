import { getAccountIdFromServerComponent } from '@/app/utils/SupabaseUtils';
import { Tag } from '@/app/utils/types';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic'

export default async function TagList() {
  const accountId = await getAccountIdFromServerComponent()

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
