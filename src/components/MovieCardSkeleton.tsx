export default function MovieCardSkeleton() {
    return (
        <div className="bg-zinc-900 rounded-xl overflow-hidden animate-pulse">
            <div className="relative">
                {/* Poster placeholder */}
                <div className="w-full aspect-[2/3] bg-zinc-800" />
        
                {/* Rating placeholder */}
                <div className="absolute top-2 right-2 bg-zinc-700 h-5 w-10 rounded" />
            </div>
      
            <div className="p-4 space-y-3">
                {/* Title placeholder */}
                <div className="h-5 bg-zinc-800 rounded w-4/5" />
                <div className="h-5 bg-zinc-800 rounded w-3/5" />
        
                {/* Year placeholder */}
                <div className="h-4 bg-zinc-800 rounded w-1/3" />
            </div>
        </div>
    )
}