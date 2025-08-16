import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl animate-pulse"></div>
              <div className="w-32 h-6 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="w-16 h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-24 h-10 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="w-48 h-8 bg-muted rounded-full mx-auto mb-6 animate-pulse"></div>
            <div className="w-full max-w-3xl h-16 bg-muted rounded mx-auto mb-6 animate-pulse"></div>
            <div className="w-full max-w-2xl h-6 bg-muted rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-3/4 max-w-xl h-6 bg-muted rounded mx-auto mb-8 animate-pulse"></div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="w-40 h-14 bg-muted rounded-xl animate-pulse"></div>
              <div className="w-40 h-14 bg-muted rounded-xl animate-pulse"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-8 bg-muted rounded mx-auto mb-2 animate-pulse"></div>
                  <div className="w-24 h-4 bg-muted rounded mx-auto animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="w-64 h-10 bg-muted rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-6 bg-muted rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-muted rounded-lg mb-4 animate-pulse"></div>
                  <div className="w-32 h-6 bg-muted rounded mb-2 animate-pulse"></div>
                  <div className="w-full h-4 bg-muted rounded mb-1 animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-muted rounded animate-pulse"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Skeleton */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="w-48 h-10 bg-muted rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-80 h-6 bg-muted rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-6 animate-pulse"></div>
                <div className="w-32 h-6 bg-muted rounded mx-auto mb-4 animate-pulse"></div>
                <div className="w-full h-4 bg-muted rounded mb-1 animate-pulse"></div>
                <div className="w-3/4 h-4 bg-muted rounded mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="w-80 h-10 bg-muted rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-6 bg-muted rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4 gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-4 h-4 bg-muted rounded animate-pulse"></div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
                    <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
                    <div>
                      <div className="w-24 h-4 bg-muted rounded mb-1 animate-pulse"></div>
                      <div className="w-32 h-3 bg-muted rounded animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto text-center">
          <div className="w-64 h-10 bg-muted-foreground/20 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="w-96 h-6 bg-muted-foreground/20 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="w-48 h-14 bg-muted-foreground/20 rounded-xl mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-muted rounded-xl animate-pulse"></div>
              <div className="w-32 h-6 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="w-80 h-4 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
