import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemePaletteProvider } from '@/contexts/ThemePaletteContext';
import { EditModeProvider } from '@/contexts/EditModeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { EditModeToggle } from '@/components/EditModeToggle';
import { AdminPanel } from '@/components/AdminPanel';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ThemePaletteProvider>
          <EditModeProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ThemeToggle />
              <EditModeToggle />
              <AdminPanel />
            </div>
          </EditModeProvider>
        </ThemePaletteProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;