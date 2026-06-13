import { Film, Search, Menu } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path: string) => location.pathname ===path

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setIsMenuOpen(false)
        }
    }

    const goToHome = () => {
        navigate('/')
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
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for movies or shows..."
                                className="w-full bg-zinc-800 text-white pl-10 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-zinc-500"
                            />
                            <Search className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                        </div>
                    </form>

                    {/**mobile menu btn */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    {/**pc menu */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium">
                        <a href="/" className={`hover:text-red-500 transition-colors ${isActive('/') ? 'text-red-500' : ''}`}>Movies</a>
                        <a href="/tv" className={`hover:text-red-500 transition-colors ${isActive('/tv') ? 'text-red-500' : ''}`}>TV Shows</a>
                        <a href="/top-rated" className={`hover:text-red-500 transition-colors ${isActive('/top-rated') ? 'text-red-500' : ''}`}>Top Rated</a>
                        <a href="/watchlist" className={`hover:text-red-500 transition-colors ${isActive('/watchlist') ? 'text-red-500' : ''}`}>Watchlist</a>
                    </nav>
                </div>
                {/**mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-zinc-800">
                        <nav className="flex flex-col gap-4 text-lg">
                            <a href="/" className="py-3">Movies</a>
                            <a href="/tv" className="py-3">TV Shows</a>
                            <a href="/top-rated" className="py-3">Top Rated</a>
                            <a href="/watchlist" className="py-3">My Watchlist</a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
  )
}