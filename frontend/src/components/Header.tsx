import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-heading text-xl font-bold text-primary tracking-tight">
            HongChong <span className="text-accent">Glass</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/glass-containers" className="text-sm font-medium text-text hover:text-accent transition-colors">
              Glass Containers
            </Link>
            <Link href="/about" className="text-sm font-medium text-text hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="/request-quote" className="btn-primary text-sm h-10 px-5">
              Request a Quote
            </Link>
          </nav>

          {/* Mobile menu trigger (simplified) */}
          <button className="lg:hidden p-2 text-text" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
