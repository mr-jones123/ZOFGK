import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">EduGrade</Link>
        <div className="space-x-2">
          <Button variant="ghost" className="text-white hover:bg-white/20">Dashboard</Button>
          <Button variant="ghost" className="text-white hover:bg-white/20">Uploads</Button>
          <Button variant="ghost" className="text-white hover:bg-white/20">Profile</Button>
        </div>
      </div>
    </nav>
  )
}

