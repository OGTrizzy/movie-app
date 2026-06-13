export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-800 py-16 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-10">

                    {/**brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-xl">
                                🎬
                            </div>
                            <span className="text-2xl font-bold">MovieFinder</span>
                        </div>
                        <p className="text-zinc-400 text-sm max-w-xs">
                            A smooth movie & tv database built as a portfolio project
                        </p>
                    </div>
                    {/**technologies */}
                    <div>
                        <h4 className="font-semibold mb-4">Built With</h4>
                        <div className="flex flex-col gap-2 text-sm text-zinc-400">
                            <span>React + TypeScript</span>
                            <span>Tailwind CSS</span>
                            <span>TanStack Query</span>
                            <span>Zustand</span>
                            <span>Vite</span>
                        </div>
                    </div>
                    {/**credits */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            Credits
                        </h4>
                        <p className="text-sm text-zinc-400">
                            Data provided by{' '}
                            <a href="https://www.themoviedb.org/" target="_blank" className="text-red-500 hover:underline">
                            The movie database (TMDB)
                            </a>
                        </p>
                        <p className="text-xs text-zinc-500 mt-6">
                            This is only a portfolio project, not commercial project
                        </p>
                    </div>
                </div>

                <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-xs text-zinc-500">
                    © {new Date().getFullYear()} MovieFinder • Made for my portfolio
                </div>
            </div>
        </footer>
    )
}