import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, Calculator, Zap, TrendingUp, Users, Star, ChevronRight, QrCode, Image, Scissors, Shield, Crown, Lock, Target, Timer, Rocket, Sparkles, MessageCircle, Gift } from "lucide-react";
import { useState } from "react";
import { usePro } from "@/contexts/ProContext";
import TextGenerator from "@/components/tools/TextGenerator";
import TextConverter from "@/components/tools/TextConverter";
import WordCounter from "@/components/tools/WordCounter";
import QRCodeGenerator from "@/components/tools/QRCodeGenerator";
import ImageEnhancer from "@/components/tools/ImageEnhancer";
import BackgroundRemover from "@/components/tools/BackgroundRemover";
import PrivacyPolicyGenerator from "@/components/tools/PrivacyPolicyGenerator";
import HiringCalculator from "@/components/tools/HiringCalculator";
import ProductivityDashboard from "@/components/tools/ProductivityDashboard";
import ProUnlock from "@/components/ProUnlock";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showProUnlock, setShowProUnlock] = useState(false);
  const { isPro } = usePro();

  const freeTools = [
    {
      id: "text-converter",
      title: "Conversor de Texto",
      description: "Converta texto para maiúscula, minúscula, título e muito mais",
      enticing: "Transforme qualquer texto em segundos! Descubra como um simples clique pode revolucionar sua produtividade na escrita.",
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
      enticing: "Crie QR codes profissionais em instantes! Veja como conectar o mundo físico ao digital com um design que impressiona.",
      icon: QrCode,
      category: "Utilitários",
      popular: true,
      component: QRCodeGenerator,
      isCompleteFree: true
    },
    {
      id: "image-enhancer",
      title: "Melhorador de Imagem 4K",
      description: "Transforme qualquer imagem em qualidade 4K profissional - 100% GRATUITO",
      enticing: "Revolução na qualidade das suas imagens! Transforme fotos comuns em obras-primas 4K prontas para impressão profissional.",
      icon: Image,
      category: "Imagens",
      popular: true,
      component: ImageEnhancer,
      isCompleteFree: true
    }
  ];

  const paidTools = [
    {
      id: "productivity-dashboard",
      title: "Dashboard de Produtividade",
      description: isPro ? "Seu centro de controle pessoal completo - DESBLOQUEADO" : "Gerencie tarefas, hábitos e foco (versão limitada)",
      enticing: "O segredo dos mais produtivos revelado! Descubra como organizar sua vida e alcançar seus objetivos com uma ferramenta que vai mudar sua rotina.",
      icon: Target,
      category: "Produtividade",
      popular: true,
      component: ProductivityDashboard,
      isCompleteFree: false
    },
    {
      id: "text-generator",
      title: "Gerador de Texto IA",
      description: isPro ? "Gere textos únicos e criativos com IA - DESBLOQUEADO" : "Gere textos únicos e criativos com IA - Versão limitada",
      enticing: "Inteligência artificial ao seu favor! Veja como criar textos incríveis que parecem escritos por um profissional, mesmo sem experiência.",
      icon: Brain,
      category: "IA",
      popular: true,
      component: TextGenerator,
      isCompleteFree: false
    },
    {
      id: "background-remover",
      title: "Removedor de Fundo IA",
      description: isPro ? "Remova fundos em alta resolução sem limites" : "Remova fundos em baixa resolução (versão limitada)",
      enticing: "Magia da IA para suas fotos! Veja como remover fundos com precisão profissional, sem conhecimento técnico. Resultados que vão te surpreender!",
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
      enticing: "Proteja seu negócio legalmente! Descubra como criar políticas profissionais que seguem a LGPD sem gastar fortunas com advogados.",
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
      enticing: "Tome a decisão financeira certa! Veja exatamente quanto você economiza ou gasta com cada tipo de contratação. Números que revelam tudo!",
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
      enticing: "Análise profunda do seu texto! Descubra métricas que escritores profissionais usam para criar conteúdo perfeito e envolvente.",
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

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Tenho uma sugestão de ferramenta para o site Ferramenta Certa:', '_blank');
  };

  if (showProUnlock) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
        <ProUnlock onClose={() => setShowProUnlock(false)} />
      </div>
    );
  }

  if (selectedTool) {
    const tool = [...freeTools, ...paidTools].find(t => t.id === selectedTool);
    const ToolComponent = tool?.component;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedTool(null)}
              className="mb-3 sm:mb-4 hover:bg-white/50 transition-colors animate-fade-in text-sm sm:text-base"
            >
              ← Voltar às Ferramentas
            </Button>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white animate-pulse-glow">
                  {tool && <tool.icon className="h-4 w-4 sm:h-5 sm:w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900">{tool?.title}</h1>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {tool?.isCompleteFree ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                          100% Grátis
                        </Badge>
                      ) : isPro ? (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          PRO Ativo
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <Lock className="h-3 w-3 mr-1" />
                          Versão Limitada
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">{tool?.description}</p>
                </div>
              </div>
              {!tool?.isCompleteFree && !isPro && (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-pulse-glow w-full sm:w-auto text-sm sm:text-base"
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
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white animate-pulse-glow">
                <Sparkles className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ferramenta Certa
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">A ferramenta que você sempre volta</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {isPro ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  PRO Ativo
                </Badge>
              ) : (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-gradient text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Crown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">PRO R$ 29,90</span>
                  <span className="sm:hidden">PRO</span>
                </Button>
              )}
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 animate-float text-xs hidden sm:inline-flex">
                🚀 Trending
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 px-3 sm:px-4 py-1 sm:py-2 animate-float text-xs sm:text-sm">
              ✨ Powered by AI - Sua Produtividade em Primeiro Lugar
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent leading-tight animate-fade-in">
              A Ferramenta Certa para o Seu Sucesso Diário
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed animate-fade-in px-2" style={{ animationDelay: '0.2s' }}>
              Transforme sua rotina com ferramentas inteligentes que você vai usar todos os dias. 
              Produtividade, criatividade e resultados em uma única plataforma.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
              <Button 
                onClick={handleExploreTools}
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow w-full sm:w-auto"
              >
                Explorar Ferramentas
                <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              {!isPro && (
                <Button 
                  onClick={() => setShowProUnlock(true)}
                  variant="outline" 
                  size="lg" 
                  className="px-6 sm:px-8 py-3 text-base sm:text-lg border-2 hover:bg-white/50 border-purple-300 text-purple-700 hover:border-purple-400 animate-float w-full sm:w-auto"
                >
                  <Crown className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  PRO Vitalício R$ 29,90
                </Button>
              )}
            </div>
            
            {/* Destaque do preço PRO */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-4 sm:p-6 text-white max-w-2xl mx-auto animate-pulse-glow">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">🎯 Oferta Especial PRO</h3>
              <p className="text-base sm:text-lg mb-3 sm:mb-4">
                <span className="line-through opacity-75">R$ 97,00</span> 
                <span className="text-2xl sm:text-3xl font-bold ml-2 sm:ml-3">R$ 29,90</span>
                <span className="ml-2 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                  VITALÍCIO
                </span>
              </p>
              <p className="opacity-90 text-sm sm:text-base">
                ✅ Acesso completo a TODAS as ferramentas para sempre<br/>
                ✅ Sem limites de uso • ✅ Funcionalidades premium • ✅ Atualizações gratuitas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 glass-effect">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <stat.icon className="h-5 w-5 sm:h-8 sm:w-8" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Updates Info */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Novidades Toda Semana!</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Receba ferramentas novas e atualizações todas as semanas. Nossa equipe está sempre trabalhando para trazer as melhores soluções para você.
            </p>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-purple-200 mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tem uma ideia de ferramenta?</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Compartilhe sua sugestão conosco! Avaliamos e desenvolvemos as melhores ideias da nossa comunidade.
                  </p>
                </div>
                <Button 
                  onClick={handleWhatsAppContact}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-base sm:text-lg w-full sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Sugerir no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-12 sm:py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 animate-fade-in">
              🎁 Ferramentas Gratuitas
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Comece agora mesmo com nossas ferramentas gratuitas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {freeTools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 glass-effect hover:bg-white/90 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                      <tool.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        {tool.category}
                      </Badge>
                      {tool.popular && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                          Popular
                        </Badge>
                      )}
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                        100% Grátis
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                    {tool.description}
                  </CardDescription>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      💡 {tool.enticing}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 group-hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    Usar Gratuitamente
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Paid Tools Section */}
      <section id="tools-section" className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 animate-fade-in">
              💎 Ferramentas Premium
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Desbloqueie todo o potencial com nossas ferramentas premium
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {paidTools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 glass-effect hover:bg-white/90 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                      <tool.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                        {tool.category}
                      </Badge>
                      {tool.popular && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                          Popular
                        </Badge>
                      )}
                      {isPro ? (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          PRO
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-300 text-xs">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                    {tool.description}
                  </CardDescription>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-800 font-medium">
                      🚀 {tool.enticing}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 group-hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    {isPro ? "Usar Ferramenta" : "Experimentar Grátis"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 animate-fade-in">
            Pronto para Turbinar sua Produtividade?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Junte-se a milhares de pessoas que já descobriram a Ferramenta Certa para o sucesso
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={handleExploreTools}
              size="lg" 
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              Começar Grátis Agora
              <TrendingUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            {!isPro && (
              <Button 
                onClick={() => setShowProUnlock(true)}
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold animate-pulse-glow w-full sm:w-auto"
              >
                <Crown className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                PRO Vitalício R$ 29,90
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg animate-pulse-glow">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="text-lg sm:text-xl font-bold">Ferramenta Certa</span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              A ferramenta inteligente que você sempre volta a usar
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
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
