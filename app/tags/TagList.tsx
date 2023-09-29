import { headers } from "next/headers"
import { TiDelete } from 'react-icons/ti'
export const dynamic = 'force-dynamic'

interface Tag {
  name: string;
  id: number;
}

export default async function TagList() {

  const res = await fetch('http://localhost:3000/api/tags', {
    method: "GET",
    headers: headers(),
    next:{
      revalidate: 0
    }
  })

  const tagsObj = await res.json()
  const tags = tagsObj.data

  return (
    <>
      {tags.map((tag:Tag) => (
        <div key={tag.id} className="tagStyle">
          <p>{tag.name}</p>
        </div>
      ))}
    </>
  )
}
