
export const dynamic = 'force-dynamic'

export default async function TagList() {

  const res = await fetch('http://localhost:3000/api/tags', {
    method: "GET",
    next:{
      revalidate: 0
    }
  })

  const tags = await res.json()
  console.log(tags.data)
  return (
    <>
      <div>TagList</div>
    </>
  )
}
