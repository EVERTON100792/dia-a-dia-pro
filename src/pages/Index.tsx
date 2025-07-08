
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProBanner from "@/components/ProBanner";
import { Crown, ArrowRight, FileText, QrCode, Target, Sparkles, Calendar, Image, Mail, Search, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Ferramentas Online Gratuitas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubra nossa coleção de ferramentas úteis para aumentar sua produtividade. 
            Use gratuitamente ou desbloqueie recursos premium com nossa versão PRO.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar ferramentas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {!isPro && (
            <ProBanner 
              toolName="Plataforma"
              limitations={[
                "Recursos limitados em algumas ferramentas",
                "Anúncios ocasionais", 
                "Suporte básico"
              ]}
            />
          )}
        </div>

        {/* Featured Tools Section */}
        {!searchTerm && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-yellow-500" />
                  Ferramentas em Destaque
                </h2>
                <p className="text-gray-600">Nossas ferramentas mais populares e recomendadas</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollFeatured('left')}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollFeatured('right')}
                  className="h-10 w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredTools.map((tool, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm min-w-[320px] flex-shrink-0 animate-fade-in">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        {tool.isPremium && !isPro && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse">
                            <Crown className="h-3 w-3 mr-1" />
                            PRO
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Destaque
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                      {tool.description}
                    </CardDescription>
                    <Button asChild className="w-full group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Link to={tool.path}>
                        Usar Ferramenta
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tools Grid */}
        {(searchTerm ? ["Resultados da Busca"] : categories).map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              {category}
              <Badge variant="secondary">
                {searchTerm 
                  ? filteredTools.length
                  : tools.filter(tool => tool.category === category).length
                }
              </Badge>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchTerm ? filteredTools : tools.filter(tool => tool.category === category))
                .map((tool, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm animate-fade-in">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <tool.icon className="h-5 w-5" />
                          </div>
                          {tool.isPremium && !isPro && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                              <Crown className="h-3 w-3 mr-1" />
                              PRO
                            </Badge>
                          )}
                        </div>
                        {tool.featured && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                            <Sparkles className="h-3 w-3 mr-1" />
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                        {tool.description}
                      </CardDescription>
                      <Button asChild className="w-full group/btn">
                        <Link to={tool.path}>
                          Usar Ferramenta
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma ferramenta encontrada
            </h3>
            <p className="text-gray-500 mb-4">
              Tente buscar com outros termos ou explore nossas categorias
            </p>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Ver Todas as Ferramentas
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para desbloquear todo o potencial?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Upgrade para PRO e tenha acesso a recursos avançados, templates premium e suporte prioritário.
              </p>
              {!isPro && (
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Crown className="mr-2 h-5 w-5" />
                  Fazer Upgrade para PRO
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
