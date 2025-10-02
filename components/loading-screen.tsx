export function LoadingScreen() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Animated loading indicator */}
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-8 border-foreground animate-pulse" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-8 border-foreground animate-pulse delay-150" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-8 border-foreground animate-pulse delay-300" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <div className="text-4xl font-bold tracking-tight dithered">analyzing domain</div>
          <div className="space-y-2 text-muted-foreground">
            <p className="animate-pulse">→ fetching x/twitter data</p>
            <p className="animate-pulse delay-150">→ checking doma protocol</p>
            <p className="animate-pulse delay-300">→ analyzing seo metrics</p>
            <p className="animate-pulse delay-500">→ generating ai insights</p>
          </div>
        </div>

        <div className="w-full h-16 flex items-center justify-center gap-2">
          <div className="halftone-dot animate-halftone-pulse" />
          <div className="halftone-dot animate-halftone-pulse delay-150" />
          <div className="halftone-dot animate-halftone-pulse delay-300" />
          <div className="halftone-dot animate-halftone-pulse delay-500" />
          <div className="halftone-dot animate-halftone-pulse delay-700" />
        </div>
      </div>
    </div>
  )
}
