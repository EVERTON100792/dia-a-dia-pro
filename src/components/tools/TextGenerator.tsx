
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Copy, Wand2, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const TextGenerator = () => {
  const { isPro } = usePro();
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [textType, setTextType] = useState("article");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const textTypes = [
    { value: "article", label: "Artigo de Blog", isPro: false },
    { value: "social", label: "Post para Redes Sociais", isPro: false },
    { value: "email", label: "E-mail Marketing", isPro: false },
    { value: "product", label: "Descrição de Produto", isPro: true },
    { value: "ad", label: "Texto Publicitário", isPro: true },
    { value: "story", label: "História Criativa", isPro: true }
  ];

  const sampleTexts = {
    article: "Descubra como a inteligência artificial está revolucionando o mundo dos negócios. Com ferramentas cada vez mais sofisticadas, empresas de todos os tamanhos podem automatizar processos, melhorar a experiência do cliente e tomar decisões mais assertivas baseadas em dados. A IA não é mais um conceito futurístico - ela está aqui, transformando indústrias e criando novas oportunidades de crescimento.",
    social: "🚀 A revolução da IA chegou! ✨ Transforme sua produtividade com ferramentas inteligentes que trabalham 24/7 para você. Não fique para trás nessa era de inovação! 💡 #IA #Tecnologia #Produtividade #Inovação",
    email: "Olá! Descobrimos algo incrível que vai revolucionar sua forma de trabalhar. Nossa nova ferramenta de IA pode automatizar tarefas repetitivas e liberar seu tempo para o que realmente importa. Quer saber mais? Clique aqui e transforme sua produtividade hoje mesmo!",
    product: "Ferramenta de IA Premium - Automatize seus processos e aumente sua produtividade em até 300%. Interface intuitiva, resultados instantâneos e suporte 24/7. Ideal para profissionais, empresas e empreendedores que buscam eficiência máxima.",
    ad: "Pare de perder tempo com tarefas repetitivas! Nossa IA faz o trabalho pesado enquanto você foca no que importa. Resultados garantidos em minutos. Experimente GRÁTIS por 7 dias!",
    story: "Era uma vez um pequeno empreendedor que sonhava em automatizar seu negócio. Descobriu uma ferramenta mágica de IA que transformou completamente sua rotina. Em poucos dias, o que levava horas agora levava minutos. E assim, ele viveu produtivamente para sempre."
  };

  const generateText = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, digite um tópico ou palavra-chave");
      return;
    }

    if (!isPro && generationCount >= 3) {
      toast.error("Limite de 3 gerações por sessão atingido. Faça upgrade para PRO!");
      return;
    }

    const selectedType = textTypes.find(t => t.value === textType);
    if (selectedType?.isPro && !isPro) {
      toast.error("Este tipo de texto é exclusivo da versão PRO");
      return;
    }

    setIsGenerating(true);
    
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const baseText = sampleTexts[textType as keyof typeof sampleTexts];
    let customizedText = `${baseText}\n\nBaseado no seu tópico "${prompt}", aqui está um texto otimizado e personalizado que pode ser usado diretamente em suas campanhas. Este conteúdo foi gerado considerando as melhores práticas de copywriting e SEO.`;
    
    // Limitar texto na versão gratuita
    if (!isPro) {
      customizedText = customizedText.substring(0, 300) + "...";
    }
    
    setGeneratedText(customizedText);
    setIsGenerating(false);
    setGenerationCount(prev => prev + 1);
    toast.success("Texto gerado com sucesso!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast.success("Texto copiado para a área de transferência!");
  };

  const downloadText = () => {
    if (!isPro) {
      toast.error("Download disponível apenas na versão PRO");
      return;
    }
    
    const element = document.createElement("a");
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "texto-gerado.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Download iniciado!");
  };

  const limitations = [
    "Máximo 3 gerações por sessão",
    "Apenas 3 tipos de texto (Artigo, Social, E-mail)",
    "Textos limitados a 300 caracteres",
    "Sem download de arquivos",
    "Sem tipos avançados (Produto, Anúncio, História)"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProBanner 
        toolName="Gerador de Textos"
        limitations={limitations}
        isCompleteFree={false}
      />

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 728x90
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              Configurações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Texto</label>
              <Select value={textType} onValueChange={setTextType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {textTypes.map(type => (
                    <SelectItem 
                      key={type.value} 
                      value={type.value}
                      disabled={type.isPro && !isPro}
                    >
                      {type.label} {type.isPro && !isPro && "🔒"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tópico ou Palavra-chave</label>
              <Textarea
                placeholder="Ex: inteligência artificial, marketing digital, produtividade..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            {!isPro && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Gerações restantes: {3 - generationCount}/3
              </div>
            )}

            <Button 
              onClick={generateText} 
              disabled={isGenerating || (!isPro && generationCount >= 3)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Gerar Texto
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Texto Gerado</CardTitle>
              {generatedText && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadText}
                    disabled={!isPro}
                  >
                    <Download className="h-4 w-4" />
                    {!isPro && "🔒"}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedText ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {generatedText}
                  </p>
                  {!isPro && generatedText.length >= 300 && (
                    <div className="mt-2 text-xs text-red-500">
                      Texto limitado a 300 caracteres na versão gratuita
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Badge variant="secondary">
                    {generatedText.split(' ').length} palavras
                  </Badge>
                  <Badge variant="secondary">
                    {generatedText.length} caracteres
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>Seu texto gerado aparecerá aqui</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 320x250 ou 300x600
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💡 Dicas para Melhores Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Seja Específico</h4>
              <p className="text-gray-600">Use palavras-chave específicas e detalhadas para obter textos mais relevantes.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Escolha o Tipo Certo</h4>
              <p className="text-gray-600">Selecione o tipo de texto adequado para sua necessidade específica.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Refine e Edite</h4>
              <p className="text-gray-600">Use o texto gerado como base e faça ajustes conforme necessário.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Teste Variações {isPro ? "" : "(PRO)"}</h4>
              <p className="text-gray-600">Gere múltiplas versões para encontrar a que melhor se adequa.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextGenerator;
