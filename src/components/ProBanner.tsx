
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Sparkles } from "lucide-react";
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
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 glass-effect">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white animate-pulse-glow">
            <Crown className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-800 mb-1 flex items-center gap-2">
              Desbloqueie o {toolName} PRO Vitalício
              <Sparkles className="h-4 w-4" />
            </h3>
            <div className="text-sm text-purple-700 mb-3">
              <p className="font-medium mb-1">Limitações da versão gratuita:</p>
              <ul className="list-disc list-inside space-y-1">
                {limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-2 inline-block">
              <span className="text-xs">💎 OFERTA ESPECIAL:</span>
              <span className="font-bold ml-1">R$ 29,90 VITALÍCIO</span>
            </div>
          </div>
          <Button 
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-pulse-glow"
          >
            <Lock className="h-4 w-4 mr-2" />
            Desbloquear por R$ 29,90
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProBanner;
