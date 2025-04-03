import { Github, Wallet } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export function Navbar() {
    return (
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
    )
}