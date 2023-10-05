import NavBar from '@/app/components/NavBar'
import DashboardPane from './DashboardPane'
import { getAccountIdFromServerComponent } from '@/app/utils/supabase-utils'
import { getNotes, getTags, getTraits } from '@/app/utils/prisma-utils'

export default async function Dashboard() {
  const accountId = await getAccountIdFromServerComponent()
  const tags = await getTags(accountId)
  const traits = await getTraits(accountId)
  const notes = await getNotes(accountId)

  return (
    <>
      <NavBar />
      <main>
        <DashboardPane tagList={tags} traitList={traits} noteList={notes} />
      </main>
    </>
  )
}