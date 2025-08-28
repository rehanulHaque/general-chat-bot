import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <Link href="/chat"><Button>Chat</Button></Link>
    </div>
  )
}
