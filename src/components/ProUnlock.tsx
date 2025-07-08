
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Crown, Lock, MessageCircle, CheckCircle, X } from "lucide-react";
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
          title: "PRO Desbloqueado! 🎉",
          description: "Agora você tem acesso a todas as funcionalidades PRO!",
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full text-white">
            <Crown className="h-8 w-8" />
          </div>
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          Desbloquear PRO
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Como obter acesso PRO?
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              Entre em contato pelo WhatsApp para solicitar sua senha PRO:
            </p>
            <Button 
              variant="outline" 
              className="w-full border-green-500 text-green-700 hover:bg-green-50"
              onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Gostaria de obter acesso PRO ao ToolsIA', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contatar via WhatsApp
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Senha PRO</label>
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
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
          >
            {isLoading ? (
              <>
                <Lock className="h-4 w-4 mr-2 animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Crown className="h-4 w-4 mr-2" />
                Desbloquear PRO
              </>
            )}
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Benefícios PRO:
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Sem limites de uso
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Alta resolução nas imagens
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Funcionalidades avançadas
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Processamento mais rápido
            </li>
          </ul>
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
