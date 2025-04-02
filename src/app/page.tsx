import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { BarChart3, Code2, CreditCard, Download, Github, LineChart, PieChart, Plus, Wallet } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">FinTrack</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              How It Works
            </Link>
            <Link href="#for-developers" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              For Developers
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/fintrack/repo" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Button className="bg-emerald-500 hover:bg-emerald-600">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Take control of your finances with FinTrack
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  A simple, free, and open-source finance tracking app that helps you monitor your expenses and income
                  month by month.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Download className="mr-2 h-4 w-4" />
                    Download App
                  </Button>
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border shadow-xl">
                <Image
                  src="/interface.png"
                  alt="FinTrack Dashboard"
                  width={1280}
                  height={720}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple yet powerful features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Everything you need to track your finances without the complexity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <CreditCard className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Easily log and categorize your daily expenses to understand where your money goes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Plus className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Income Management</h3>
                <p className="text-center text-muted-foreground">
                  Track multiple income sources and get a clear picture of your monthly earnings.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <BarChart3 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Monthly Reports</h3>
                <p className="text-center text-muted-foreground">
                  View detailed monthly reports to analyze your spending habits and saving patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How FinTrack works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Simple steps to take control of your financial life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-emerald-100 p-2 mt-1">
                    <span className="font-bold text-emerald-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Record your transactions</h3>
                    <p className="text-muted-foreground">
                      Quickly add your expenses and income with just a few taps. Categorize them for better
                      organization.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-emerald-100 p-2 mt-1">
                    <span className="font-bold text-emerald-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">View your monthly summary</h3>
                    <p className="text-muted-foreground">
                      Get a clear overview of your monthly finances with visual charts and breakdowns.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-emerald-100 p-2 mt-1">
                    <span className="font-bold text-emerald-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Analyze your spending habits</h3>
                    <p className="text-muted-foreground">
                      Identify patterns and opportunities to save with detailed analytics and reports.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl border shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="FinTrack App Interface"
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* For Developers */}
        <section id="for-developers" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">For Developers</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  FinTrack is completely free and open source. Build upon our foundation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Open Source & Free</h3>
                <p className="text-muted-foreground">
                  FinTrack is built with modern technologies and is completely open source. Use it as a starting point
                  for your own financial applications.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm">Next.js</div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm">TypeScript</div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm">Tailwind CSS</div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm">Drizzle ORM</div>
                </div>
                <div className="pt-4">
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Code2 className="mr-2 h-4 w-4" />
                    Get the Source Code
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="overflow-x-auto rounded bg-muted p-4 text-sm">
                  <code className="text-muted-foreground">
                    {`// Clone the repository
git clone https://github.com/fintrack/repo.git

// Install dependencies
cd fintrack
npm install

// Run the development server
npm run dev`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Data Visualization */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Visualize your finances</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Understand your financial health at a glance with intuitive charts and graphs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <PieChart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Expense Breakdown</h3>
                <p className="text-center text-muted-foreground">
                  See where your money goes with detailed category breakdowns.
                </p>
                <div className="w-full aspect-square rounded-xl border p-4 shadow-sm">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Expense Pie Chart"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <BarChart3 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Monthly Comparison</h3>
                <p className="text-center text-muted-foreground">
                  Compare your spending across different months to track progress.
                </p>
                <div className="w-full aspect-square rounded-xl border p-4 shadow-sm">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Monthly Bar Chart"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-emerald-100 p-3">
                  <LineChart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Savings Trend</h3>
                <p className="text-center text-muted-foreground">
                  Track your savings growth over time with trend analysis.
                </p>
                <div className="w-full aspect-square rounded-xl border p-4 shadow-sm">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Savings Line Chart"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to take control of your finances?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Start tracking your expenses and income today. It's free and open source.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Now
                </Button>
                <Button variant="outline" size="lg">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-emerald-500" />
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

