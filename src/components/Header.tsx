import { Film } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Film className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold tracking-tight">MovieFinder</h1>
        </div>
        
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-red-500 transition-colors">Home</a>
          <a href="/popular" className="hover:text-red-500 transition-colors">Popular</a>
          <a href="/top-rated" className="hover:text-red-500 transition-colors">Top Rated</a>
        </nav>
      </div>
    </header>
  )
}