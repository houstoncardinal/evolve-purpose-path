import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Framework from "./pages/Framework";
import Programs from "./pages/Programs";
import Testimonials from "./pages/Testimonials";
import Shop from "./pages/Shop";
import FreeGuide from "./pages/FreeGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/free-guide" element={<FreeGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
