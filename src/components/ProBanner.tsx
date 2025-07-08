
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";
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
    <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg text-white">
            <Crown className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-yellow-800 mb-1">
              Desbloqueie o {toolName} PRO
            </h3>
            <div className="text-sm text-yellow-700 mb-3">
              <p className="font-medium mb-1">Limitações da versão gratuita:</p>
              <ul className="list-disc list-inside space-y-1">
                {limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </div>
          </div>
          <Button 
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800"
          >
            <Lock className="h-4 w-4 mr-2" />
            Desbloquear PRO
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProBanner;
