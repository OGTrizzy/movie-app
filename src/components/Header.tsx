import { Film, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const goToHome = () => {
        navigate('/')
        setSearchQuery('')
    }

    return (
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
          
                    {/* clickable logo */}
                    <div 
                        onClick={goToHome}
                        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <Film className="w-8 h-8 text-red-500" />
                        <h1 className="text-2xl font-bold tracking-tight">MovieFinder</h1>
                    </div>

                    {/* search field*/}
                    <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for movies or shows..."
                                className="w-full bg-zinc-800 text-white pl-10 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <Search className="absolute left-3.5 top-3 w-5 h-5 text-zinc-400" />
                        </div>
                    </form>

                    <nav className="flex gap-6 text-sm font-medium">
                        <a href="/" className="hover:text-red-500 transition-colors">Popular</a>
                        <a href="/top-rated" className="hover:text-red-500 transition-colors">Top Rated</a>
                        <a href="/watchlist" className="hover:text-red-500 transition-colors">Watchlist</a>
                    </nav>
                </div>
            </div>
        </header>
  )
}