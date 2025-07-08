
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProBanner from "@/components/ProBanner";
import { Crown, ArrowRight, FileText, QrCode, Target, Broom, Calendar, Image, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useProContext } from "@/contexts/ProContext";

const Index = () => {
  const { isPro } = useProContext();

  const tools = [
    {
      title: "Contador de Palavras",
      description: "Conte palavras, caracteres e analise textos rapidamente",
      icon: FileText,
      path: "/word-counter",
      category: "Texto",
      isPremium: false
    },
    {
      title: "Conversor de Texto",
      description: "Converta texto entre diferentes formatos e casos",
      icon: FileText,
      path: "/text-converter", 
      category: "Texto",
      isPremium: false
    },
    {
      title: "Gerador de QR Code",
      description: "Crie QR codes personalizados para URLs, textos e mais",
      icon: QrCode,
      path: "/qr-generator",
      category: "Utilidades",
      isPremium: false
    },
    {
      title: "Calculadora de Metas",
      description: "Planeje e acompanhe o progresso das suas metas",
      icon: Target,
      path: "/goal-calculator",
      category: "Produtividade",
      isPremium: false
    },
    {
      title: "Organizador Digital",
      description: "Organize arquivos e pastas digitais de forma eficiente",
      icon: Broom,
      path: "/digital-cleaner",
      category: "Produtividade",
      isPremium: false
    },
    {
      title: "Rastreador de Hábitos",
      description: "Monitore e desenvolva hábitos saudáveis",
      icon: Calendar,
      path: "/habit-tracker",
      category: "Produtividade",
      isPremium: false
    },
    {
      title: "Extrator de Texto de Imagem (OCR)",
      description: "Extraia texto de imagens e documentos digitalizados",
      icon: Image,
      path: "/image-text-extractor",
      category: "Imagem",
      isPremium: false
    },
    {
      title: "Gerador de Assinatura de E-mail",
      description: "Crie assinaturas profissionais para seus e-mails",
      icon: Mail,
      path: "/email-signature-generator",
      category: "E-mail",
      isPremium: false
    }
  ];

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

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
          {!isPro && <ProBanner />}
        </div>

        {/* Tools Grid */}
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              {category}
              <Badge variant="secondary">{tools.filter(tool => tool.category === category).length}</Badge>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools
                .filter(tool => tool.category === category)
                .map((tool, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
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
