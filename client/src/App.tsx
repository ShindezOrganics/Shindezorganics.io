import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import EquipmentPage from "@/pages/Equipment";
import AdminDashboard from "@/pages/AdminDashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/equipment" component={EquipmentPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/bookings" component={() => <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 p-8">Bookings page coming soon...</div>} />
      <Route path="/listings" component={() => <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 p-8">My Listings page coming soon...</div>} />
      <Route path="/chat" component={() => <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 p-8">Messages page coming soon...</div>} />
      <Route path="/education" component={() => <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 p-8">Education page coming soon...</div>} />
      <Route path="/add" component={() => <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 p-8">Add Equipment page coming soon...</div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-gray-50">
              <Sidebar />
              <MobileNav />
              <Router />
              <Toaster />
            </div>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
