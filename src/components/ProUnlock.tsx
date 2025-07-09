
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Crown, Lock, MessageCircle, CheckCircle, X, Sparkles, Infinity, AlertCircle } from "lucide-react";
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

    // Simular delay para dar feedback visual
    setTimeout(() => {
      const success = unlockPro(password);
      
      if (success) {
        toast({
          title: "🎉 PRO Vitalício Desbloqueado!",
          description: "Agora você tem acesso completo a todas as funcionalidades para sempre!",
        });
        onClose?.();
      } else {
        toast({
          title: "❌ Senha incorreta",
          description: "A senha fornecida não é válida. Entre em contato via WhatsApp para obter a senha correta.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
      setPassword("");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md glass-effect border-purple-200 shadow-2xl animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white animate-pulse-glow">
                <Crown className="h-8 w-8" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-lg opacity-50"></div>
            </div>
          </div>
          
          <CardTitle className="flex items-center justify-center gap-2 text-2xl gradient-text">
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
          {/* Instruções para obter a senha */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">
                  Como obter a senha PRO?
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  1. Entre em contato pelo WhatsApp<br/>
                  2. Efetue o pagamento de R$ 29,90<br/>
                  3. Receba sua senha PRO exclusiva<br/>
                  4. Digite a senha aqui para desbloquear
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-green-500 text-green-700 hover:bg-green-50"
                  onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Quero adquirir o PRO Vitalício da Ferramenta Certa por R$ 29,90', '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  💬 Comprar PRO via WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Campo de senha */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Senha PRO (Recebida após o pagamento)
              </label>
              <Input
                type="password"
                placeholder="Digite sua senha PRO aqui..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                disabled={isLoading}
              />
            </div>

            <Button 
              onClick={handleUnlock}
              disabled={isLoading || !password.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Lock className="h-4 w-4 mr-2 animate-spin" />
                  Verificando senha...
                </>
              ) : (
                <>
                  <Crown className="h-4 w-4 mr-2" />
                  Ativar PRO Vitalício
                </>
              )}
            </Button>
          </div>

          {/* Benefícios PRO */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-600" />
              O que você ganha com o PRO:
            </h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span>✨ Uso ilimitado de todas as ferramentas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span>🎯 Dashboard de produtividade completo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span>🚀 IA com qualidade premium</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span>🖼️ Processamento em alta resolução (4K)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span>📊 Relatórios e exportações avançadas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span>🔄 Atualizações gratuitas para sempre</span>
              </div>
            </div>
          </div>

          {/* Botão fechar */}
          {onClose && (
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="w-full text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-2" />
              Fechar
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProUnlock;
