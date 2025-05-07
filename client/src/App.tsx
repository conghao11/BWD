import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Actions from "@/pages/actions";
import Leaderboard from "@/pages/leaderboard";
import Groups from "@/pages/groups";
import Blog from "@/pages/blog";
import Profile from "@/pages/profile";
import { useAuth } from "./context/auth-context";
import Layout from "./components/layout/layout";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route path="/actions">
        <Layout>
          <ProtectedRoute component={Actions} />
        </Layout>
      </Route>
      <Route path="/leaderboard">
        <Layout>
          <ProtectedRoute component={Leaderboard} />
        </Layout>
      </Route>
      <Route path="/groups">
        <Layout>
          <ProtectedRoute component={Groups} />
        </Layout>
      </Route>
      <Route path="/blog">
        <Layout>
          <Blog />
        </Layout>
      </Route>
      <Route path="/profile">
        <Layout>
          <ProtectedRoute component={Profile} />
        </Layout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
