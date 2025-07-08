
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Sparkles, Gem, Star, Zap } from "lucide-react";
import { usePro } from "@/contexts/ProContext";
import { useState } from "react";
import ProUnlock from "./ProUnlock";

interface ProBannerProps {
  toolName: string;
  limitations: string[];
  isCompleteFree?: boolean;
  onUpgrade?: () => void;
}

const ProBanner = ({ toolName, limitations, isCompleteFree = false, onUpgrade }: ProBannerProps) => {
  const { isPro } = usePro();
  const [showUnlock, setShowUnlock] = useState(false);

  if (isPro || isCompleteFree) return null;

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      setShowUnlock(true);
    }
  };

  if (showUnlock) {
    return <ProUnlock onClose={() => setShowUnlock(false)} />;
  }

  return (
    <Card className="glass-effect border-0 relative overflow-hidden animate-bounce-in">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-3 left-6 w-12 h-12 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-float blur-sm" style={{animationDelay: '1s'}}></div>
      </div>

      <CardContent className="pt-8 pb-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl text-white animate-pulse-glow">
              <Crown className="h-8 w-8" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl blur-lg opacity-50"></div>
            
            {/* Floating gems */}
            <Gem className="absolute -top-2 -right-2 h-5 w-5 text-yellow-400 animate-bounce" />
            <Star className="absolute -bottom-1 -left-1 h-4 w-4 text-yellow-300 animate-pulse" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold gradient-text">
                Desbloqueie o {toolName} PRO Vitalício
              </h3>
              <div className="flex gap-1">
                <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
                <Zap className="h-5 w-5 text-pink-500 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
            </div>
            
            <div className="text-gray-700 mb-4">
              <p className="font-semibold mb-2 text-lg">✨ Limitações da versão gratuita:</p>
              <ul className="list-none space-y-2">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-50"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl px-6 py-3 font-bold text-lg animate-pulse-glow">
                <div className="flex items-center gap-2">
                  <Gem className="h-5 w-5" />
                  <span>OFERTA ESPECIAL: R$ 29,90 VITALÍCIO</span>
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleUpgrade}
            size="lg"
            className="btn-gradient text-white font-bold px-8 py-4 text-lg relative overflow-hidden group animate-pulse-glow"
          >
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 group-hover:animate-bounce" />
              <span>Desbloquear por R$ 29,90</span>
              <Sparkles className="h-6 w-6 group-hover:animate-spin" />
            </div>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 shimmer"></div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProBanner;
