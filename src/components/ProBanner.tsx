
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Sparkles, Gem, Star, Zap, MessageCircle, CheckCircle, X } from "lucide-react";
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

  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Quero adquirir o PRO Vitalício da Ferramenta Certa por R$ 29,90', '_blank');
  };

  if (showUnlock) {
    return <ProUnlock onClose={() => setShowUnlock(false)} />;
  }

  return (
    <Card className="glass-effect border-0 relative overflow-hidden animate-bounce-in mb-8">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-3 left-6 w-12 h-12 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-float blur-sm" style={{animationDelay: '1s'}}></div>
      </div>

      <CardContent className="pt-8 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Lado Esquerdo - Limitações Gratuitas */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gray-500 rounded-xl text-white">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700">
                🆓 Versão Gratuita - {toolName}
              </h3>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                Limitações da versão gratuita:
              </p>
              <ul className="space-y-2">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lado Direito - Recursos PRO */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white animate-pulse-glow">
                  <Crown className="h-6 w-6" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur-lg opacity-50"></div>
                <Gem className="absolute -top-2 -right-2 h-5 w-5 text-yellow-400 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">
                ✨ Versão PRO - {toolName}
              </h3>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
              <p className="font-semibold mb-3 text-purple-700 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Recursos PRO inclusos:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-purple-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Uso completamente ilimitado</span>
                </li>
                <li className="flex items-center gap-2 text-purple-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Processamento em alta qualidade (4K)</span>
                </li>
                <li className="flex items-center gap-2 text-purple-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>IA premium com resultados superiores</span>
                </li>
                <li className="flex items-center gap-2 text-purple-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Sem anúncios nem interrupções</span>
                </li>
                <li className="flex items-center gap-2 text-purple-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Suporte VIP prioritário</span>
                </li>
              </ul>
            </div>

            {/* PREÇO DESTACADO */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl px-8 py-4 font-bold text-2xl animate-pulse-glow">
                  <div className="flex items-center justify-center gap-3">
                    <Gem className="h-6 w-6" />
                    <div className="text-center">
                      <div className="text-sm opacity-90 line-through">R$ 97,00</div>
                      <div className="text-3xl font-black">APENAS R$ 29,90</div>
                      <div className="text-sm opacity-90">VITALÍCIO PARA SEMPRE</div>
                    </div>
                    <Star className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 flex-1 text-lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                💬 Comprar PRO via WhatsApp
              </Button>

              <Button 
                onClick={handleUpgrade}
                size="lg"
                className="btn-gradient text-white font-bold px-6 py-4 flex-1 text-lg animate-pulse-glow"
              >
                <Crown className="h-5 w-5 mr-2" />
                Já tenho a senha PRO
                <Sparkles className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Garantia */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-3">
                🛡️ <strong>Garantia:</strong> Acesso vitalício com suporte completo
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProBanner;
