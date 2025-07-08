
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, Calculator, Zap, TrendingUp, Users, Star, ChevronRight, QrCode, Image, Scissors, Shield, Crown, Lock } from "lucide-react";
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
import ProUnlock from "@/components/ProUnlock";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showProUnlock, setShowProUnlock] = useState(false);
  const { isPro } = usePro();

  const tools = [
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
    { label: "Ferramentas Ativas", value: "25+", icon: Zap },
    { label: "Usuários Ativos", value: "50K+", icon: Users },
    { label: "Textos Processados", value: "1M+", icon: FileText },
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <ProUnlock onClose={() => setShowProUnlock(false)} />
      </div>
    );
  }

  if (selectedTool) {
    const tool = tools.find(t => t.id === selectedTool);
    const ToolComponent = tool?.component;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedTool(null)}
              className="mb-4 hover:bg-white/50 transition-colors"
            >
              ← Voltar às Ferramentas
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                {tool && <tool.icon className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{tool?.title}</h1>
                  {tool?.isCompleteFree ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      100% Grátis
                    </Badge>
                  ) : isPro ? (
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
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
                  className="bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Desbloquear PRO
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ToolsIA Pro
                </h1>
                <p className="text-sm text-gray-600">Ferramentas Inteligentes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isPro ? (
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                  <Crown className="h-3 w-3 mr-1" />
                  PRO Ativo
                </Badge>
              ) : (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  size="sm"
                  className="bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800"
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Desbloquear PRO
                </Button>
              )}
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                🔥 Trending
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              ✨ Powered by AI
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Ferramentas IA que Simplificam seu Dia a Dia
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Descubra nossa coleção de ferramentas alimentadas por inteligência artificial. 
              Otimize sua produtividade, economize tempo e obtenha resultados profissionais em segundos.
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button 
                onClick={handleExploreTools}
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explorar Ferramentas
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              {!isPro && (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-3 text-lg border-2 hover:bg-white/50 border-yellow-300 text-yellow-700 hover:border-yellow-400"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Desbloquear PRO
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300">
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
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Ferramentas em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selecionamos as melhores ferramentas para aumentar sua produtividade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:-translate-y-2"
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
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
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
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
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group-hover:shadow-lg transition-all duration-300"
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Revolucionar sua Produtividade?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já descobriram o poder das nossas ferramentas IA
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={handleExploreTools}
              size="lg" 
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Começar Agora - Grátis
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
            {!isPro && (
              <Button 
                onClick={() => setShowProUnlock(true)}
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
              >
                <Crown className="mr-2 h-5 w-5" />
                Desbloquear PRO
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
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">ToolsIA Pro</span>
            </div>
            <p className="text-gray-400 mb-6">
              Ferramentas inteligentes para profissionais modernos
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
