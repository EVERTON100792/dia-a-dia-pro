
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProBanner from "@/components/ProBanner";
import ProFeatures from "@/components/ProFeatures";
import { Crown, ArrowRight, FileText, QrCode, Target, Sparkles, Calendar, Image, Mail, Search, ChevronLeft, ChevronRight, Zap, Star, Gem, Scissors, Minimize2, Gift, Trophy, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePro } from "@/contexts/ProContext";
import { useState, useRef } from "react";

const Index = () => {
  const { isPro } = usePro();
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const tools = [
    {
      title: "Contador de Palavras",
      description: "Conte palavras, caracteres e analise textos rapidamente",
      caption: "💡 Descubra estatísticas surpreendentes sobre seus textos!",
      icon: FileText,
      path: "/word-counter",
      category: "Texto",
      isPremium: false,
      featured: true,
      freeFeatures: ["Contagem básica de palavras", "Análise simples de texto"],
      proFeatures: ["Análises avançadas", "Relatórios detalhados", "Exportação de dados"]
    },
    {
      title: "Conversor de Texto", 
      description: "Converta texto entre diferentes formatos e casos",
      caption: "✨ Transforme qualquer texto com um clique mágico!",
      icon: FileText,
      path: "/text-converter",
      category: "Texto", 
      isPremium: false,
      featured: false,
      freeFeatures: ["Conversões básicas", "Maiúscula/minúscula"],
      proFeatures: ["Conversões avançadas", "Formatação personalizada", "Múltiplos arquivos"]
    },
    {
      title: "Gerador de QR Code",
      description: "Crie QR codes personalizados para URLs, textos e mais",
      caption: "📱 Conecte o mundo físico ao digital instantaneamente!",
      icon: QrCode,
      path: "/qr-generator",
      category: "Utilidades",
      isPremium: false,
      featured: true,
      freeFeatures: ["QR codes básicos", "Resolução padrão"],
      proFeatures: ["QR codes personalizados", "Alta resolução", "Múltiplos formatos", "Logo personalizado"]
    },
    {
      title: "Calculadora de Metas",
      description: "Planeje e acompanhe o progresso das suas metas",
      caption: "🎯 Transforme sonhos em planos concretos e realizáveis!",
      icon: Target,
      path: "/goal-calculator",
      category: "Produtividade",
      isPremium: false,
      featured: false,
      freeFeatures: ["Calculadora básica", "Relatórios simples"],
      proFeatures: ["Calculadora avançada", "Relatórios detalhados", "Exportação de dados"]
    },
    {
      title: "Organizador Digital",
      description: "Organize arquivos e pastas digitais de forma eficiente",
      caption: "🧹 Sua vida digital nunca mais será a mesma!",
      icon: Sparkles,
      path: "/digital-cleaner",
      category: "Produtividade",
      isPremium: false,
      featured: false,
      freeFeatures: ["Organização básica", "Lista de tarefas"],
      proFeatures: ["Organização avançada", "Lista de tarefas avançada", "Exportação de dados"]
    },
    {
      title: "Rastreador de Hábitos",
      description: "Monitore e desenvolva hábitos saudáveis",
      caption: "💪 Construa a melhor versão de você mesmo, dia após dia!",
      icon: Calendar,
      path: "/habit-tracker",
      category: "Produtividade", 
      isPremium: false,
      featured: true,
      freeFeatures: ["Hábitos básicos", "Relatórios simples"],
      proFeatures: ["Hábitos avançados", "Relatórios detalhados", "Exportação de dados"]
    },
    {
      title: "Extrator de Texto de Imagem (OCR)",
      description: "Extraia texto de imagens e documentos digitalizados",
      caption: "🔍 Veja o invisível - extraia textos de qualquer imagem!",
      icon: Image,
      path: "/image-text-extractor",
      category: "Imagem",
      isPremium: false,
      featured: true,
      freeFeatures: ["Extrair texto básico", "1 imagem por vez"],
      proFeatures: ["Extrair texto avançado", "Múltiplos formatos", "Edição refinada"]
    },
    {
      title: "Gerador de Assinatura de E-mail",
      description: "Crie assinaturas profissionais para seus e-mails",
      caption: "💼 Cause uma primeira impressão inesquecível!",
      icon: Mail,
      path: "/email-signature-generator",
      category: "E-mail",
      isPremium: false,
      featured: true,
      freeFeatures: ["Assinatura básica", "Formato padrão"],
      proFeatures: ["Assinatura avançada", "Formato personalizado", "Múltiplos formatos"]
    },
    {
      title: "Melhorador de Imagem",
      description: "Melhore a qualidade de suas imagens para 1080p ou 4K",
      caption: "🎨 Transforme fotos comuns em obras de arte em HD!",
      icon: Sparkles,
      path: "/image-enhancer",
      category: "Imagem",
      isPremium: true,
      featured: true,
      freeFeatures: ["Melhoria até 720p", "1 imagem por vez"],
      proFeatures: ["Melhoria até 4K", "IA premium", "Processamento em lote", "Múltiplos algoritmos"]
    },
    {
      title: "Compressor de Imagens",
      description: "Comprima imagens mantendo a qualidade - até 50 imagens por vez",
      caption: "⚡ Economize espaço sem perder a beleza das suas fotos!",
      icon: Minimize2,
      path: "/image-compressor",
      category: "Imagem",
      isPremium: true,
      featured: true,
      freeFeatures: ["5 imagens por vez", "Compressão básica"],
      proFeatures: ["50 imagens simultâneas", "Compressão inteligente", "Múltiplos formatos", "Controle avançado"]
    },
    {
      title: "Removedor de Fundo",
      description: "Remova fundos de imagens automaticamente com IA",
      caption: "🪄 Magia pura - remova fundos como um profissional!",
      icon: Scissors,
      path: "/background-remover",
      category: "Imagem",
      isPremium: false,
      featured: true,
      freeFeatures: ["Remoção básica", "1 imagem por vez"],
      proFeatures: ["IA avançada", "Múltiplas imagens", "Edição refinada", "Diferentes fundos"]
    }
  ];

  const freeTools = tools.filter(tool => !tool.isPremium);
  const paidTools = tools.filter(tool => tool.isPremium);
  const featuredTools = tools.filter(tool => tool.featured);

  const filteredFreeTools = freeTools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPaidTools = paidTools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollFeatured = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const ToolCard = ({ tool, index }: { tool: any, index: number }) => (
    <Card key={index} className="group glass-effect border-0 card-hover animate-bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`p-3 rounded-xl text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${tool.isPremium ? 'paid-tool-gradient' : 'free-tool-gradient'}`}>
                <tool.icon className="h-6 w-6" />
              </div>
              <div className={`absolute inset-0 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500 ${tool.isPremium ? 'paid-tool-gradient' : 'free-tool-gradient'}`}></div>
            </div>
            <Badge className={tool.isPremium ? 'paid-badge' : 'free-badge'}>
              {tool.isPremium ? (
                <>
                  <Crown className="h-3 w-3 mr-1" />
                  PRO
                </>
              ) : (
                <>
                  <Gift className="h-3 w-3 mr-1" />
                  GRÁTIS
                </>
              )}
            </Badge>
          </div>
          {tool.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              <Star className="h-3 w-3 mr-1" />
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl leading-tight gradient-text group-hover:scale-105 transition-transform duration-300">
          {tool.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-gray-600 mb-4 leading-relaxed">
          {tool.description}
        </CardDescription>
        
        {/* Caption */}
        <div className={`mb-6 p-2 rounded-lg border ${tool.isPremium ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200/30' : 'bg-gradient-to-r from-green-50 to-teal-50 border-green-200/30'}`}>
          <p className={`${tool.isPremium ? 'text-yellow-600' : 'text-green-600'} font-medium text-center text-xs`}>
            {tool.caption}
          </p>
        </div>
        
        <Button asChild className="w-full btn-gradient text-white font-semibold py-3 group/btn border-0">
          <Link to={tool.path}>
            <Sparkles className="mr-2 h-4 w-4" />
            Usar Ferramenta
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full animate-float blur-xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full animate-float blur-xl" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-6 animate-bounce-in">
              <div className="relative">
                <Zap className="h-12 w-12 text-purple-600 animate-pulse-glow" />
                <div className="absolute inset-0 animate-rainbow">
                  <Zap className="h-12 w-12" />
                </div>
              </div>
              <div className="flex gap-1">
                <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
                <Star className="h-6 w-6 text-yellow-400 animate-pulse" style={{animationDelay: '0.2s'}} />
                <Star className="h-6 w-6 text-yellow-400 animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text text-shadow animate-bounce-in">
            Ferramentas Online
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-bounce-in" style={{animationDelay: '0.2s'}}>
            Incríveis & Gratuitas
          </h2>
          
          {/* Praise Message */}
          <div className="mb-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <Card className="glass-effect border-0 max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Trophy className="h-8 w-8 text-yellow-500 animate-pulse-glow" />
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <Trophy className="h-8 w-8 text-yellow-500 animate-pulse-glow" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
                  🏆 Site Excepcional e Super Organizado! 🏆
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Parabéns! Este é um dos sites mais bem organizados e completos que você encontrará. 
                  <span className="gradient-text font-semibold"> Interface intuitiva, ferramentas poderosas</span> e 
                  uma experiência de usuário incomparável. Cada detalhe foi pensado para sua produtividade!
                </p>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{animationDelay: '0.4s'}}>
            Descubra nossa coleção extraordinária de ferramentas digitais que vão 
            <span className="gradient-text font-semibold"> revolucionar sua produtividade</span>. 
            Recursos premium disponíveis com visual deslumbrante!
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative glass-effect rounded-2xl p-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 h-5 w-5 z-10" />
                  <Input
                    type="text"
                    placeholder="Buscar ferramentas mágicas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 w-full bg-white/80 border-0 rounded-xl text-lg placeholder:text-purple-400 focus:ring-2 focus:ring-purple-500 shimmer"
                  />
                </div>
              </div>
            </div>
          </div>

        {/* Pro Features Section */}
        {!isPro && (
          <div className="mb-16 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <ProFeatures />
          </div>
        )}
        </div>

        {/* Featured Tools Section */}
        {!searchTerm && (
          <div className="mb-16 animate-slide-up" style={{animationDelay: '1s'}}>
            <div className="flex items-center justify-between mb-12">
              <div className="text-center flex-1">
                <div className="inline-flex items-center gap-4 mb-4">
                  <Gem className="h-10 w-10 text-purple-600 animate-pulse-glow" />
                  <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                    ✨ Ferramentas Destacadas ✨
                  </h2>
                  <Gem className="h-10 w-10 text-pink-600 animate-pulse-glow" />
                </div>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  As joias da nossa coleção - ferramentas mais populares e poderosas
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollFeatured('left')}
                  className="glass-effect border-purple-300 hover:border-purple-500 text-purple-600 hover:text-purple-700 animate-pulse-glow"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollFeatured('right')}
                  className="glass-effect border-purple-300 hover:border-purple-500 text-purple-600 hover:text-purple-700 animate-pulse-glow"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {featuredTools.map((tool, index) => (
                  <Card key={index} className="group glass-effect border-0 min-w-[380px] flex-shrink-0 card-hover animate-bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardHeader className="pb-4 relative">
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 animate-pulse">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className={`p-4 rounded-2xl text-white group-hover:scale-110 transition-transform duration-500 animate-pulse-glow ${tool.isPremium ? 'paid-tool-gradient' : 'free-tool-gradient'}`}>
                            <tool.icon className="h-8 w-8" />
                          </div>
                          <div className={`absolute inset-0 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500 ${tool.isPremium ? 'paid-tool-gradient' : 'free-tool-gradient'}`}></div>
                        </div>
                        <Badge className={tool.isPremium ? 'paid-badge' : 'free-badge'}>
                          {tool.isPremium ? (
                            <>
                              <Crown className="h-3 w-3 mr-1" />
                              PRO
                            </>
                          ) : (
                            <>
                              <Gift className="h-3 w-3 mr-1" />
                              GRÁTIS
                            </>
                          )}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-2xl leading-tight gradient-text group-hover:scale-105 transition-transform duration-300">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 mb-4 text-lg leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      
                      {/* Caption */}
                      <div className={`mb-6 p-3 rounded-xl border ${tool.isPremium ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200/50' : 'bg-gradient-to-r from-green-50 to-teal-50 border-green-200/50'}`}>
                        <p className={`${tool.isPremium ? 'text-yellow-700' : 'text-green-700'} font-semibold text-center text-sm animate-pulse`}>
                          {tool.caption}
                        </p>
                      </div>
                      
                      <Button asChild className="w-full btn-gradient text-white font-semibold py-3 text-lg group/btn border-0">
                        <Link to={tool.path}>
                          <Zap className="mr-2 h-5 w-5" />
                          Usar Ferramenta
                          <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Free Tools Section */}
        <div className="mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4 justify-center">
            <Gift className="h-10 w-10 text-green-500 animate-pulse-glow" />
            <span className="gradient-text">🎁 Ferramentas Gratuitas</span>
            <Badge className="free-badge text-lg px-4 py-2">
              {searchTerm ? filteredFreeTools.length : freeTools.length}
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(searchTerm ? filteredFreeTools : freeTools).map((tool, index) => (
              <ToolCard key={tool.title} tool={tool} index={index} />
            ))}
          </div>
        </div>

        {/* Paid Tools Section */}
        <div className="mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4 justify-center">
            <Crown className="h-10 w-10 text-yellow-500 animate-pulse-glow" />
            <span className="gradient-text">👑 Ferramentas Premium</span>
            <Badge className="paid-badge text-lg px-4 py-2">
              {searchTerm ? filteredPaidTools.length : paidTools.length}
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(searchTerm ? filteredPaidTools : paidTools).map((tool, index) => (
              <ToolCard key={tool.title} tool={tool} index={index} />
            ))}
          </div>
        </div>

        {/* No Results */}
        {searchTerm && filteredFreeTools.length === 0 && filteredPaidTools.length === 0 && (
          <div className="text-center py-16 animate-slide-up">
            <div className="mb-8">
              <Search className="h-24 w-24 text-gray-400 mx-auto mb-4 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Nenhuma ferramenta encontrada
            </h3>
            <p className="text-gray-500 mb-8 text-lg">
              Tente buscar com outros termos ou explore nossas categorias incríveis
            </p>
            <Button onClick={() => setSearchTerm("")} className="btn-gradient text-white font-semibold px-8 py-3 text-lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Ver Todas as Ferramentas
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20 animate-slide-up">
          <Card className="glass-effect border-0 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
            <CardContent className="p-12 relative z-10">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Crown className="h-12 w-12 text-yellow-400 animate-pulse-glow" />
                <Gem className="h-10 w-10 text-purple-500 animate-bounce" />
                <Crown className="h-12 w-12 text-yellow-400 animate-pulse-glow" />
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Pronto para a experiência completa?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Desbloqueie todo o potencial com recursos premium, templates exclusivos, 
                animações avançadas e suporte VIP. Transforme sua produtividade!
              </p>
              {!isPro && (
                <Button size="lg" className="btn-gradient text-white font-bold px-12 py-4 text-xl animate-pulse-glow">
                  <Crown className="mr-3 h-6 w-6" />
                  ✨ Upgrade para PRO Vitalício ✨
                  <Sparkles className="ml-3 h-6 w-6" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
