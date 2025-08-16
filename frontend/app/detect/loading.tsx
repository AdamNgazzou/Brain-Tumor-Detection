import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DetectLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header Skeleton */}
      <header className="bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-md border-b border-border/50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="w-32 h-10 bg-muted rounded animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl animate-pulse"></div>
              <div>
                <div className="w-64 h-7 bg-muted rounded mb-1 animate-pulse"></div>
                <div className="w-48 h-4 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-24 h-10 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Upload Card Skeleton */}
        <Card className="mb-12 border-0 shadow-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-muted rounded-lg animate-pulse"></div>
              <div className="w-48 h-7 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="w-96 h-5 bg-muted rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto animate-pulse"></div>
                <div>
                  <div className="w-64 h-7 bg-muted rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="w-80 h-5 bg-muted rounded mx-auto animate-pulse"></div>
                </div>
                <div className="w-40 h-12 bg-muted rounded-xl mx-auto animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section Skeleton */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/80">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg animate-pulse"></div>
              <div className="w-48 h-7 bg-muted rounded animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="border-0 bg-gradient-to-br from-muted/30 to-muted/10 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 bg-muted rounded animate-pulse"></div>
                      <div className="w-32 h-5 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-muted rounded-full mt-2 animate-pulse"></div>
                          <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 bg-gradient-to-r from-muted/20 to-muted/10 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-muted rounded animate-pulse"></div>
                  <div className="w-48 h-5 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="w-16 h-8 bg-muted rounded mx-auto mb-1 animate-pulse"></div>
                      <div className="w-20 h-4 bg-muted rounded mx-auto animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
