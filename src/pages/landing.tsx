import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mt-16 mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Stokis
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
            Your intelligent platform for analyzing stocks, tracking market performance, and staying ahead of market trends.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/login">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-6 rounded-lg bg-card border">
            <h3 className="text-xl font-medium mb-2">Real-time Analytics</h3>
            <p className="text-muted-foreground">
              Get instant insights into market performance with our real-time analytics dashboard.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border">
            <h3 className="text-xl font-medium mb-2">Company Performance</h3>
            <p className="text-muted-foreground">
              Track and analyze the performance of companies with detailed metrics and visualizations.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border">
            <h3 className="text-xl font-medium mb-2">News Analysis</h3>
            <p className="text-muted-foreground">
              Stay informed with the latest news and analysis affecting the stock market.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join thousands of investors who trust Stokis for their market analysis needs.
          </p>
          <Button asChild>
            <Link href="/register">Sign up for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 