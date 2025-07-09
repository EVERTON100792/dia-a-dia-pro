
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProProvider } from "@/contexts/ProContext";
import BackButton from "@/components/BackButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WordCounter from "./components/tools/WordCounter";
import TextConverter from "./components/tools/TextConverter";
import QRCodeGenerator from "./components/tools/QRCodeGenerator";
import GoalCalculator from "./components/tools/GoalCalculator";
import DigitalCleaner from "./components/tools/DigitalCleaner";
import HabitTracker from "./components/tools/HabitTracker";
import ImageTextExtractor from "./components/tools/ImageTextExtractor";
import EmailSignatureGenerator from "./components/tools/EmailSignatureGenerator";
import ImageEnhancer from "./components/tools/ImageEnhancer";
import ImageCompressor from "./components/tools/ImageCompressor";
import BackgroundRemover from "./components/tools/BackgroundRemover";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BackButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/text-converter" element={<TextConverter />} />
            <Route path="/qr-generator" element={<QRCodeGenerator />} />
            <Route path="/goal-calculator" element={<GoalCalculator />} />
            <Route path="/digital-cleaner" element={<DigitalCleaner />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/image-text-extractor" element={<ImageTextExtractor />} />
            <Route path="/email-signature-generator" element={<EmailSignatureGenerator />} />
            <Route path="/image-enhancer" element={<ImageEnhancer />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/background-remover" element={<BackgroundRemover />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProProvider>
  </QueryClientProvider>
);

export default App;
