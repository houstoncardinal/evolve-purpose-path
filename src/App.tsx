import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/layout/ScrollToTop";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/free-guide" element={<FreeGuide />} />
            <Route path="/evole-2-purpose" element={<EvolePurpose />} />
            <Route path="/evolve-2-purpose" element={<EvolePurpose />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/community" element={<Community />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
