import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BarChart2, Building2, Newspaper, Sparkles } from "lucide-react";
import Logo from "@/assets/Logo.png";
import Name from "@/assets/nameNoBg.png"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 relative">
      {/* Decorative Hero Background */}
      <div className="absolute inset-0 -z-10 bg-[url('/hero-bg.svg')] bg-cover bg-center opacity-10" />

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-6 bg-background/80 backdrop-blur border-b border-border sticky top-0 z-20">
        <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className={`h-12 w-12 `} />
          <span className="font-bold text-3xl tracking-tight text-white">Stokis</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors font-medium">Login</Link>
          <Button asChild size="sm" className="font-semibold">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mt-10 mb-28">
          {/* <h1 className="text-6xl md:text-8xl  tracking-widest mb-7 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 drop-shadow-lg">
            STOKIS
          </h1> */}
          <img src={Name} alt="Name" className="w-[600px]" />
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mb-10 font-medium">
            Your intelligent platform for analyzing stocks, tracking market performance, and staying ahead of market trends.
          </p>
          <div className="flex gap-5">
            <Button asChild size="lg" className="shadow-lg hover:scale-105 transition-transform">
              <Link href="/login">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="hover:border-primary shadow-md">
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-28">
          <div className="p-8 rounded-2xl bg-card border shadow-md hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-start mb-4">
              <BarChart2 className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-muted-foreground text-lg">
              Get instant insights into market performance with our real-time analytics dashboard.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-card border shadow-md hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-start mb-4">
              <Building2 className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Company Performance</h3>
            <p className="text-muted-foreground text-lg">
              Track and analyze the performance of companies with detailed metrics and visualizations.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-card border shadow-md hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-start mb-4">
              <Newspaper className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">News Analysis</h3>
            <p className="text-muted-foreground text-lg">
              Stay informed with the latest news and analysis affecting the stock market.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-card border shadow-md hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-start mb-4">
              <Sparkles className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Specialized Chatbot</h3>
            <p className="text-muted-foreground text-lg">
              Interact with our AI-powered chatbot for personalized stock insights, instant answers, and expert guidance tailored to your needs.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 shadow-lg">
          <h2 className="text-4xl font-bold mb-5">Ready to start?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            Join thousands of investors who trust Stokis for their market analysis needs.
          </p>
          <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold shadow-md hover:scale-105 transition-transform">
            <Link href="/register">Sign up for free</Link>
          </Button>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full py-6 mt-10 bg-background/80 border-t border-border text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Stokis. All rights reserved. &nbsp;|&nbsp;
        <a href="/about" className="hover:text-primary underline transition-colors">About</a>
      </footer>
    </div>
  );
} 