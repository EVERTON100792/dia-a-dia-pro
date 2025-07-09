
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, Sparkles, Zap, Infinity, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProFeaturesProps {
  showWhatsApp?: boolean;
}

const ProFeatures = ({ showWhatsApp = true }: ProFeaturesProps) => {
  const proFeatures = [
    {
      title: "Uso Ilimitado",
      description: "Sem limites de uso em todas as ferramentas",
      icon: Infinity
    },
    {
      title: "Processamento Premium",
      description: "IA com qualidade superior e processamento mais rápido",
      icon: Zap
    },
    {
      title: "Resolução 4K",
      description: "Melhore imagens até 4K com qualidade profissional",
      icon: Sparkles
    },
    {
      title: "Múltiplos Arquivos",
      description: "Processe até 50 imagens simultaneamente",
      icon: CheckCircle
    },
    {
      title: "Sem Anúncios",
      description: "Experiência completamente livre de publicidade",
      icon: CheckCircle
    },
    {
      title: "Suporte VIP",
      description: "Atendimento prioritário via WhatsApp",
      icon: MessageCircle
    },
    {
      title: "Atualizações Vitalícias",
      description: "Receba todas as novas ferramentas gratuitamente",
      icon: Crown
    },
    {
      title: "Dashboard Completo",
      description: "Painel de produtividade com relatórios avançados",
      icon: CheckCircle
    }
  ];

  return (
    <Card className="glass-effect border-0 relative overflow-hidden animate-bounce-in mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
      
      <CardHeader className="text-center relative z-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Crown className="h-10 w-10 text-yellow-400 animate-pulse-glow" />
          <CardTitle className="text-3xl gradient-text">
            🌟 Recursos PRO Vitalício 🌟
          </CardTitle>
          <Crown className="h-10 w-10 text-yellow-400 animate-pulse-glow" />
        </div>
        
        <div className="inline-flex items-center gap-3 mb-4">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl px-6 py-3 animate-pulse">
            <Infinity className="h-5 w-5 mr-2" />
            Apenas R$ 29,90 VITALÍCIO
          </Badge>
        </div>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Desbloqueie todo o potencial das ferramentas com acesso vitalício!
        </p>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {proFeatures.map((feature, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-white/50 border border-purple-200/30 animate-bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <h4 className="font-bold text-purple-700 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {showWhatsApp && (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center justify-center gap-2">
                <MessageCircle className="h-6 w-6" />
                Como obter acesso PRO?
              </h3>
              <p className="text-green-700 mb-4">
                Entre em contato via WhatsApp para adquirir seu acesso vitalício por apenas R$ 29,90
              </p>
              <Button
                onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Quero adquirir o PRO Vitalício da Ferramenta Certa por R$ 29,90', '_blank')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 text-lg animate-pulse-glow"
                size="lg"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                💬 Comprar PRO via WhatsApp
                <Sparkles className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProFeatures;
