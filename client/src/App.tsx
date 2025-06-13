import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Actions from "@/pages/actions";
import NewAction from "@/pages/new-action";
import Leaderboard from "@/pages/leaderboard";
import Groups from "@/pages/groups";
import Blog from "@/pages/blog";
import Profile from "@/pages/profile";
import { AuthProvider, useAuth } from "./context/auth-context";
import Layout from "./components/layout/layout";


function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  
  return <Component />;
}
function App() {
  return (
   <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Layout>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/actions" component={Actions} />
          <Route path="/actions/new" component={NewAction} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/groups" component={Groups} />
          <Route path="/blog" component={Blog} />
          <Route path="/profile" component={Profile} />
          <Route path="/:rest*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </TooltipProvider>
  </AuthProvider>
  );
}

export default App;
