
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProBanner from "@/components/ProBanner";
import { Crown, ArrowRight, FileText, QrCode, Target, Sparkles, Calendar, Image, Mail, Search, ChevronLeft, ChevronRight, Zap, Star, Gem } from "lucide-react";
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
      icon: FileText,
      path: "/word-counter",
      category: "Texto",
      isPremium: false,
      featured: true
    },
    {
      title: "Conversor de Texto", 
      description: "Converta texto entre diferentes formatos e casos",
      icon: FileText,
      path: "/text-converter",
      category: "Texto", 
      isPremium: false,
      featured: false
    },
    {
      title: "Gerador de QR Code",
      description: "Crie QR codes personalizados para URLs, textos e mais",
      icon: QrCode,
      path: "/qr-generator",
      category: "Utilidades",
      isPremium: false,
      featured: true
    },
    {
      title: "Calculadora de Metas",
      description: "Planeje e acompanhe o progresso das suas metas",
      icon: Target,
      path: "/goal-calculator",
      category: "Produtividade",
      isPremium: false,
      featured: false
    },
    {
      title: "Organizador Digital",
      description: "Organize arquivos e pastas digitais de forma eficiente",
      icon: Sparkles,
      path: "/digital-cleaner",
      category: "Produtividade",
      isPremium: false,
      featured: false
    },
    {
      title: "Rastreador de Hábitos",
      description: "Monitore e desenvolva hábitos saudáveis",
      icon: Calendar,
      path: "/habit-tracker",
      category: "Produtividade", 
      isPremium: false,
      featured: true
    },
    {
      title: "Extrator de Texto de Imagem (OCR)",
      description: "Extraia texto de imagens e documentos digitalizados",
      icon: Image,
      path: "/image-text-extractor",
      category: "Imagem",
      isPremium: false,
      featured: true
    },
    {
      title: "Gerador de Assinatura de E-mail",
      description: "Crie assinaturas profissionais para seus e-mails",
      icon: Mail,
      path: "/email-signature-generator",
      category: "E-mail",
      isPremium: false,
      featured: true
    }
  ];

  const featuredTools = tools.filter(tool => tool.featured);
  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  const filteredTools = tools.filter(tool =>
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

          {!isPro && (
            <div className="mb-12 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <ProBanner 
                toolName="Plataforma"
                limitations={[
                  "Recursos limitados em algumas ferramentas",
                  "Anúncios ocasionais", 
                  "Suporte básico"
                ]}
              />
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
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white group-hover:scale-110 transition-transform duration-500 animate-pulse-glow">
                            <tool.icon className="h-8 w-8" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                        </div>
                        {tool.isPremium && !isPro && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 animate-pulse">
                            <Crown className="h-3 w-3 mr-1" />
                            PRO
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-2xl leading-tight gradient-text group-hover:scale-105 transition-transform duration-300">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {tool.description}
                      </CardDescription>
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

        {/* Tools Grid */}
        {(searchTerm ? ["🔍 Resultados da Busca"] : categories).map((category, categoryIndex) => (
          <div key={category} className="mb-16 animate-slide-up" style={{animationDelay: `${categoryIndex * 0.2}s`}}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4 justify-center">
              <span className="gradient-text">{category}</span>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-2">
                {searchTerm 
                  ? filteredTools.length
                  : tools.filter(tool => tool.category === category).length
                }
              </Badge>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm ? filteredTools : tools.filter(tool => tool.category === category))
                .map((tool, index) => (
                  <Card key={index} className="group glass-effect border-0 card-hover animate-bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                              <tool.icon className="h-6 w-6" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                          </div>
                          {tool.isPremium && !isPro && (
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                              <Crown className="h-3 w-3 mr-1" />
                              PRO
                            </Badge>
                          )}
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
                      <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                        {tool.description}
                      </CardDescription>
                      <Button asChild className="w-full btn-gradient text-white font-semibold py-3 group/btn border-0">
                        <Link to={tool.path}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Usar Ferramenta
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        {/* No Results */}
        {searchTerm && filteredTools.length === 0 && (
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
