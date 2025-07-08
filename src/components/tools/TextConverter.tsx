
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Type, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const TextConverter = () => {
  const { isPro } = usePro();
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});

  const conversions = [
    { key: "uppercase", label: "MAIÚSCULA", func: (text: string) => text.toUpperCase(), isPro: false },
    { key: "lowercase", label: "minúscula", func: (text: string) => text.toLowerCase(), isPro: false },
    { key: "title", label: "Título", func: (text: string) => text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()), isPro: false },
    { key: "sentence", label: "Primeira letra", func: (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(), isPro: false },
    { key: "alternate", label: "AlTeRnAdO", func: (text: string) => text.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join(''), isPro: false },
    { key: "reverse", label: "osrevnI", func: (text: string) => text.split('').reverse().join(''), isPro: false },
    { key: "camel", label: "camelCase", func: (text: string) => text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''), isPro: true },
    { key: "snake", label: "snake_case", func: (text: string) => text.toLowerCase().replace(/\s+/g, '_'), isPro: true },
    { key: "kebab", label: "kebab-case", func: (text: string) => text.toLowerCase().replace(/\s+/g, '-'), isPro: true },
    { key: "binary", label: "Binário", func: (text: string) => text.split('').map(char => char.charCodeAt(0).toString(2)).join(' '), isPro: true },
    { key: "base64", label: "Base64", func: (text: string) => btoa(text), isPro: true },
    { key: "url", label: "URL Encode", func: (text: string) => encodeURIComponent(text), isPro: true }
  ];

  const convertText = () => {
    if (!inputText.trim()) {
      toast.error("Por favor, digite algum texto");
      return;
    }

    if (!isPro && inputText.length > 500) {
      toast.error("Versão gratuita limitada a 500 caracteres");
      return;
    }

    const newResults: Record<string, string> = {};
    conversions.forEach(conversion => {
      if (conversion.isPro && !isPro) {
        newResults[conversion.key] = "🔒 Recurso PRO";
      } else {
        try {
          newResults[conversion.key] = conversion.func(inputText);
        } catch (error) {
          newResults[conversion.key] = "Erro na conversão";
        }
      }
    });
    
    setResults(newResults);
    toast.success("Texto convertido com sucesso!");
  };

  const copyToClipboard = (text: string, label: string) => {
    if (text === "🔒 Recurso PRO") {
      toast.error("Esta funcionalidade está disponível apenas na versão PRO");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência!`);
  };

  const clearAll = () => {
    setInputText("");
    setResults({});
    toast.success("Tudo limpo!");
  };

  const limitations = [
    "Limitado a 500 caracteres por conversão",
    "Apenas 6 tipos de conversão básicos",
    "Sem conversões de programação (camelCase, snake_case, etc)",
    "Sem codificação avançada (Base64, URL, Binário)"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ProBanner 
        toolName="Conversor de Texto"
        limitations={limitations}
        isCompleteFree={false}
      />

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 728x90
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5 text-blue-600" />
            Conversor de Texto Universal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Digite seu texto {!isPro && <span className="text-red-500">(máx. 500 caracteres)</span>}
            </label>
            <Textarea
              placeholder="Digite o texto que você quer converter..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
              maxLength={isPro ? undefined : 500}
            />
            {!isPro && (
              <div className="text-sm text-gray-500 mt-1">
                {inputText.length}/500 caracteres
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={convertText} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Type className="mr-2 h-4 w-4" />
              Converter Texto
            </Button>
            <Button variant="outline" onClick={clearAll}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      {Object.keys(results).length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conversions.map(conversion => (
            <Card key={conversion.key} className={`hover:shadow-md transition-shadow ${conversion.isPro && !isPro ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={conversion.isPro && !isPro ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}>
                      {conversion.label}
                    </Badge>
                    {conversion.isPro && !isPro && <Badge variant="outline" className="text-xs">PRO</Badge>}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(results[conversion.key], conversion.label)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-3 rounded border min-h-[80px] max-h-[120px] overflow-auto">
                  <p className={`text-sm font-mono break-all ${results[conversion.key] === "🔒 Recurso PRO" ? 'text-center text-red-500 font-bold' : ''}`}>
                    {results[conversion.key]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 320x250
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔧 Tipos de Conversão Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Formatação Básica (Grátis)</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• MAIÚSCULA</li>
                <li>• minúscula</li>
                <li>• Título</li>
                <li>• Primeira letra</li>
                <li>• AlTeRnAdO</li>
                <li>• osrevnI</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Estilo de Código (PRO)</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• camelCase 🔒</li>
                <li>• snake_case 🔒</li>
                <li>• kebab-case 🔒</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Codificação (PRO)</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Base64 🔒</li>
                <li>• URL Encode 🔒</li>
                <li>• Binário 🔒</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextConverter;
