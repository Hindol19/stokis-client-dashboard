import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/theme-provider";
import { AuthProvider } from "@/context/auth-provider";
import MainLayout from "@/components/layout/main-layout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Dashboard from "@/pages/dashboard";
import CompanyPerformance from "@/pages/company-performance";
import NewsAnalysis from "@/pages/news-analysis";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";

// Simple layout for public pages
function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Switch>
      {/* Public routes don't use the app layout */}
      <Route path="/" component={() => <PublicLayout><Landing /></PublicLayout>} />
      <Route path="/login" component={() => <PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" component={() => <PublicLayout><Register /></PublicLayout>} />
      
      {/* Protected routes use the app layout with sidebar */}
      <Route path="/dashboard">
        {() => (
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/company-performance">
        {() => (
          <ProtectedRoute>
            <MainLayout>
              <CompanyPerformance />
            </MainLayout>
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/news-analysis">
        {() => (
          <ProtectedRoute>
            <MainLayout>
              <NewsAnalysis />
            </MainLayout>
          </ProtectedRoute>
        )}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <Switch>
            {/* Public routes */}
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            
            {/* Protected routes with layout */}
            <Route path="/dashboard">
              {() => (
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/company-performance">
              {() => (
                <ProtectedRoute>
                  <MainLayout>
                    <CompanyPerformance />
                  </MainLayout>
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/news-analysis">
              {() => (
                <ProtectedRoute>
                  <MainLayout>
                    <NewsAnalysis />
                  </MainLayout>
                </ProtectedRoute>
              )}
            </Route>
            
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
