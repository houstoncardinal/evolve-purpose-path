import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Public pages
import Index from "./pages/Index";
import About from "./pages/About";
import Framework from "./pages/Framework";
import Programs from "./pages/Programs";
import Testimonials from "./pages/Testimonials";
import Shop from "./pages/Shop";
import FreeGuide from "./pages/FreeGuide";
import EvolePurpose from "./pages/EvolePurpose";
import Booking from "./pages/Booking";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Account from "./pages/Account";
import Apply from "./pages/Apply";
import ProgramOneOnOne from "./pages/programs/OneOnOne";
import ProgramGroup from "./pages/programs/GroupProgram";
import ProgramPurposeClarity from "./pages/programs/PurposeClarity";
import ProgramHealingIntensive from "./pages/programs/HealingIntensive";
import ProgramMentorship from "./pages/programs/Mentorship";
import SubmitTeaching from "./pages/programs/SubmitTeaching";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminShell from "./components/admin/AdminShell";
import AdminOverview from "./pages/admin/Overview";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminSubscribers from "./pages/admin/Subscribers";
import AdminBookings from "./pages/admin/Bookings";
import AdminCommunity from "./pages/admin/Community";
import AdminPrograms from "./pages/admin/Programs";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminContentManager from "./pages/admin/ContentManager";
import AdminCommunityContent from "./pages/admin/CommunityContent";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Standalone routes — own layout, no public navbar/footer */}
          <Route path="/apply" element={<Apply />} />
          <Route path="/programs/submit-teaching" element={<SubmitTeaching />} />

          {/* Admin routes — own layout, no public navbar/footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="community" element={<AdminCommunity />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="content" element={<AdminContentManager />} />
            <Route path="community-content" element={<AdminCommunityContent />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Public routes — wrapped in the public Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/one-on-one" element={<ProgramOneOnOne />} />
            <Route path="/programs/group" element={<ProgramGroup />} />
            <Route path="/programs/purpose-clarity" element={<ProgramPurposeClarity />} />
            <Route path="/programs/healing-intensive" element={<ProgramHealingIntensive />} />
            <Route path="/programs/mentorship" element={<ProgramMentorship />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/free-guide" element={<FreeGuide />} />
            <Route path="/evole-2-purpose" element={<EvolePurpose />} />
            <Route path="/evolve-2-purpose" element={<EvolePurpose />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/community" element={<Community />} />
            <Route path="/account" element={<Account />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
