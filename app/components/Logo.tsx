import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo-small.png"
        alt="Tislio Logo"
        width={100}
        height={50}
        quality={100}
      />
    </Link>
  )
}