
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, Calculator, Zap, TrendingUp, Users, Star, ChevronRight, QrCode, Image, Scissors, Shield, Crown, Lock, Target, Timer, Rocket, Sparkles } from "lucide-react";
import { useState } from "react";
import { usePro } from "@/contexts/ProContext";
import TextGenerator from "@/components/tools/TextGenerator";
import TextConverter from "@/components/tools/TextConverter";
import WordCounter from "@/components/tools/WordCounter";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import ImageCompressor from "@/components/tools/ImageCompressor";
import BackgroundRemover from "@/components/tools/BackgroundRemover";
import PrivacyPolicyGenerator from "@/components/tools/PrivacyPolicyGenerator";
import HiringCalculator from "@/components/tools/HiringCalculator";
import ProductivityDashboard from "@/components/tools/ProductivityDashboard";
import ProUnlock from "@/components/ProUnlock";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showProUnlock, setShowProUnlock] = useState(false);
  const { isPro } = usePro();

  const tools = [
    {
      id: "productivity-dashboard",
      title: "Dashboard de Produtividade",
      description: isPro ? "Seu centro de controle pessoal completo - DESBLOQUEADO" : "Gerencie tarefas, hábitos e foco (versão limitada)",
      icon: Target,
      category: "Produtividade",
      popular: true,
      component: ProductivityDashboard,
      isCompleteFree: false,
      isNew: true
    },
    {
      id: "text-converter",
      title: "Conversor de Texto",
      description: "Converta texto para maiúscula, minúscula, título e muito mais",
      icon: FileText,
      category: "Texto",
      popular: true,
      component: TextConverter,
      isCompleteFree: true
    },
    {
      id: "qr-generator",
      title: "Gerador de QR Code",
      description: "Gere códigos QR personalizados para textos, URLs e muito mais",
      icon: QrCode,
      category: "Utilitários",
      popular: true,
      component: QRCodeGenerator,
      isCompleteFree: true
    },
    {
      id: "text-generator",
      title: "Gerador de Texto IA",
      description: isPro ? "Gere textos únicos e criativos com IA - DESBLOQUEADO" : "Gere textos únicos e criativos com IA - Versão limitada",
      icon: Brain,
      category: "IA",
      popular: true,
      component: TextGenerator,
      isCompleteFree: false
    },
    {
      id: "image-compressor",
      title: "Compressor de Imagens",
      description: isPro ? "Comprima até 50 imagens por vez em alta qualidade" : "Comprima até 5 imagens por vez (versão limitada)",
      icon: Image,
      category: "Imagens",
      popular: true,
      component: ImageCompressor,
      isCompleteFree: false
    },
    {
      id: "background-remover",
      title: "Removedor de Fundo IA",
      description: isPro ? "Remova fundos em alta resolução sem limites" : "Remova fundos em baixa resolução (versão limitada)",
      icon: Scissors,
      category: "IA",
      popular: true,
      component: BackgroundRemover,
      isCompleteFree: false
    },
    {
      id: "privacy-policy",
      title: "Política de Privacidade LGPD",
      description: isPro ? "Gere políticas completas e personalizadas" : "Gere políticas básicas (versão limitada)",
      icon: Shield,
      category: "Jurídico",
      popular: true,
      component: PrivacyPolicyGenerator,
      isCompleteFree: false
    },
    {
      id: "hiring-calculator",
      title: "Calculadora CLT vs PJ",
      description: isPro ? "Compare custos com relatórios detalhados" : "Compare custos básicos (versão limitada)",
      icon: Users,
      category: "Negócios",
      popular: true,
      component: HiringCalculator,
      isCompleteFree: false
    },
    {
      id: "word-counter",
      title: "Contador de Palavras Pro",
      description: isPro ? "Análise completa com relatórios exportáveis" : "Análise básica de texto (versão limitada)",
      icon: Calculator,
      category: "Análise",
      popular: false,
      component: WordCounter,
      isCompleteFree: false
    }
  ];

  const stats = [
    { label: "Ferramentas Ativas", value: "30+", icon: Zap },
    { label: "Usuários Diários", value: "100K+", icon: Users },
    { label: "Tarefas Concluídas", value: "2M+", icon: Target },
    { label: "Avaliação", value: "4.9★", icon: Star }
  ];

  const handleExploreTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showProUnlock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
        <ProUnlock onClose={() => setShowProUnlock(false)} />
      </div>
    );
  }

  if (selectedTool) {
    const tool = tools.find(t => t.id === selectedTool);
    const ToolComponent = tool?.component;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedTool(null)}
              className="mb-4 hover:bg-white/50 transition-colors animate-fade-in"
            >
              ← Voltar às Ferramentas
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white animate-pulse-glow">
                {tool && <tool.icon className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{tool?.title}</h1>
                  {tool?.isNew && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                      🔥 NOVO
                    </Badge>
                  )}
                  {tool?.isCompleteFree ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      100% Grátis
                    </Badge>
                  ) : isPro ? (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      PRO Ativo
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Lock className="h-3 w-3 mr-1" />
                      Versão Limitada
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600">{tool?.description}</p>
              </div>
              {!tool?.isCompleteFree && !isPro && (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-pulse-glow"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Desbloquear PRO - R$ 29,90
                </Button>
              )}
            </div>
          </div>
          
          {ToolComponent && <ToolComponent />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      {/* Header */}
      <header className="border-b glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white animate-pulse-glow">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ferramenta Certa
                </h1>
                <p className="text-sm text-muted-foreground">A ferramenta que você sempre volta</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isPro ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse">
                  <Crown className="h-3 w-3 mr-1" />
                  PRO Vitalício Ativo
                </Badge>
              ) : (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-gradient"
                >
                  <Crown className="h-4 w-4 mr-1" />
                  PRO R$ 29,90 Vitalício
                </Button>
              )}
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 animate-float">
                🚀 Trending
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 px-4 py-2 animate-float">
              ✨ Powered by AI - Sua Produtividade em Primeiro Lugar
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent leading-tight animate-fade-in">
              A Ferramenta Certa para o Seu Sucesso Diário
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Transforme sua rotina com ferramentas inteligentes que você vai usar todos os dias. 
              Produtividade, criatividade e resultados em uma única plataforma.
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button 
                onClick={handleExploreTools}
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Explorar Ferramentas
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              {!isPro && (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-3 text-lg border-2 hover:bg-white/50 border-purple-300 text-purple-700 hover:border-purple-400 animate-float"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  PRO Vitalício R$ 29,90
                </Button>
              )}
            </div>
            
            {/* Destaque do preço PRO */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white max-w-2xl mx-auto animate-pulse-glow">
              <h3 className="text-2xl font-bold mb-2">🎯 Oferta Especial PRO</h3>
              <p className="text-lg mb-4">
                <span className="line-through opacity-75">R$ 97,00</span> 
                <span className="text-3xl font-bold ml-3">R$ 29,90</span>
                <span className="ml-2 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-sm font-bold">
                  VITALÍCIO
                </span>
              </p>
              <p className="opacity-90">
                ✅ Acesso completo a TODAS as ferramentas para sempre<br/>
                ✅ Sem limites de uso • ✅ Funcionalidades premium • ✅ Atualizações gratuitas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 glass-effect">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools-section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 animate-fade-in">
              Ferramentas que Fazem a Diferença
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Cada ferramenta foi pensada para ser útil no seu dia a dia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 glass-effect hover:bg-white/90 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {tool.isNew && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                          🔥 NOVO
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {tool.category}
                      </Badge>
                      {tool.popular && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          Popular
                        </Badge>
                      )}
                      {tool.isCompleteFree ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Grátis
                        </Badge>
                      ) : isPro ? (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          <Crown className="h-3 w-3 mr-1" />
                          PRO
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-300">
                          <Lock className="h-3 w-3 mr-1" />
                          Limitado
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 group-hover:shadow-lg transition-all duration-300"
                  >
                    Usar Ferramenta
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Pronto para Turbinar sua Produtividade?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Junte-se a milhares de pessoas que já descobriram a Ferramenta Certa para o sucesso
          </p>
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={handleExploreTools}
              size="lg" 
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Começar Grátis Agora
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
            {!isPro && (
              <Button 
                onClick={() => setShowProUnlock(true)}
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold animate-pulse-glow"
              >
                <Crown className="mr-2 h-5 w-5" />
                PRO Vitalício R$ 29,90
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg animate-pulse-glow">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Ferramenta Certa</span>
            </div>
            <p className="text-gray-400 mb-6">
              A ferramenta inteligente que você sempre volta a usar
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
