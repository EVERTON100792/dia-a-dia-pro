
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Crown, Lock, MessageCircle, CheckCircle, X, Sparkles, Infinity } from "lucide-react";
import { usePro } from "@/contexts/ProContext";
import { useToast } from "@/hooks/use-toast";

interface ProUnlockProps {
  onClose?: () => void;
}

const ProUnlock = ({ onClose }: ProUnlockProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { unlockPro } = usePro();
  const { toast } = useToast();

  const handleUnlock = () => {
    if (!password.trim()) {
      toast({
        title: "Senha obrigatória",
        description: "Por favor, digite a senha PRO.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simular delay
    setTimeout(() => {
      const success = unlockPro(password);
      
      if (success) {
        toast({
          title: "PRO Vitalício Desbloqueado! 🎉",
          description: "Agora você tem acesso completo a todas as funcionalidades para sempre!",
        });
        onClose?.();
      } else {
        toast({
          title: "Senha incorreta",
          description: "A senha fornecida não é válida. Entre em contato via WhatsApp para obter a senha.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
      setPassword("");
    }, 1000);
  };

  return (
    <Card className="w-full max-w-lg mx-auto glass-effect">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white animate-pulse-glow">
            <Crown className="h-8 w-8" />
          </div>
        </div>
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          Desbloquear PRO Vitalício
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <Infinity className="h-3 w-3 mr-1" />
            Vitalício
          </Badge>
        </CardTitle>
        
        {/* Destaque do preço */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-white mt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-lg font-bold">Oferta Especial</span>
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-center">
            <span className="line-through opacity-75 text-lg">R$ 97,00</span>
            <span className="text-3xl font-bold ml-3">R$ 29,90</span>
          </div>
          <p className="text-sm opacity-90 text-center mt-2">
            Pagamento único • Acesso vitalício • Todas as ferramentas
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Como obter acesso PRO?
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Entre em contato pelo WhatsApp para adquirir seu acesso PRO vitalício por apenas R$ 29,90:
            </p>
            <Button 
              variant="outline" 
              className="w-full border-green-500 text-green-700 hover:bg-green-50"
              onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Quero adquirir o PRO Vitalício da Ferramenta Certa por R$ 29,90', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              💬 Comprar PRO via WhatsApp
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Senha PRO (Recebida após o pagamento)</label>
            <Input
              type="password"
              placeholder="Digite sua senha PRO aqui..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
            />
          </div>

          <Button 
            onClick={handleUnlock}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            {isLoading ? (
              <>
                <Lock className="h-4 w-4 mr-2 animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Crown className="h-4 w-4 mr-2" />
                Ativar PRO Vitalício
              </>
            )}
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            O que você ganha com o PRO:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Uso ilimitado de todas as ferramentas
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Dashboard de produtividade completo
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              IA com qualidade premium
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Processamento em alta resolução
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Relatórios e exportações avançadas
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Atualizações gratuitas para sempre
            </div>
          </div>
        </div>

        {onClose && (
          <Button variant="ghost" onClick={onClose} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Fechar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProUnlock;
