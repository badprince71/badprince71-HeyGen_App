import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { VideoProvider } from "@/contexts/VideoContext";
import Mascots from "./pages/Mascots";
import Text from "./pages/Text";
import Background from "./pages/Background";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VideoProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/mascots" replace />} />
            <Route path="/mascots" element={<Mascots />} />
            <Route path="/text" element={<Text />} />
            <Route path="/background" element={<Background />} />
            <Route path="/video" element={<Videos />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </VideoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
