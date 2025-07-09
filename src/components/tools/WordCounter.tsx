
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Download, Crown } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const WordCounter = () => {
  const { isPro } = usePro();
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;

  // Limitações para usuários gratuitos
  const maxCharsForFree = 1000;
  const isLimitExceeded = !isPro && characters > maxCharsForFree;

  const copyStats = () => {
    if (!isPro) {
      toast.error("Recurso disponível apenas na versão PRO");
      return;
    }
    
    const stats = `Estatísticas do Texto:
Palavras: ${words}
Caracteres: ${characters}
Caracteres (sem espaços): ${charactersNoSpaces}
Parágrafos: ${paragraphs}
Frases: ${sentences}`;
    
    navigator.clipboard.writeText(stats);
    toast.success("Estatísticas copiadas para a área de transferência!");
  };

  const downloadReport = () => {
    if (!isPro) {
      toast.error("Recurso disponível apenas na versão PRO");
      return;
    }
    
    const report = `RELATÓRIO DE ANÁLISE DE TEXTO
============================

Texto analisado: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}

ESTATÍSTICAS:
- Palavras: ${words}
- Caracteres: ${characters}
- Caracteres (sem espaços): ${charactersNoSpaces}
- Parágrafos: ${paragraphs}
- Frases: ${sentences}
- Média de palavras por frase: ${sentences > 0 ? (words / sentences).toFixed(1) : 0}

Gerado em: ${new Date().toLocaleString('pt-BR')}`;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-texto.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Relatório baixado com sucesso!");
  };

  const limitations = [
    "Limitado a 1000 caracteres por análise",
    "Estatísticas básicas apenas",
    "Sem exportação de relatórios",
    "Sem análises avançadas de legibilidade"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProBanner 
        toolName="Contador de Palavras"
        limitations={limitations}
        isCompleteFree={false}
      />

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Contador de Palavras e Caracteres
            {!isPro && <Badge variant="secondary">Grátis</Badge>}
            {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Digite seu texto {!isPro && <span className="text-red-500">(máx. 1000 caracteres)</span>}
            </label>
            <Textarea
              placeholder="Cole ou digite seu texto aqui para análise..."
              value={text}
              onChange={(e) => {
                if (!isPro && e.target.value.length > maxCharsForFree) {
                  toast.error(`Versão gratuita limitada a ${maxCharsForFree} caracteres. Desbloqueie o PRO!`);
                  return;
                }
                setText(e.target.value);
              }}
              className={`min-h-[200px] ${isLimitExceeded ? 'border-red-500' : ''}`}
              maxLength={isPro ? undefined : maxCharsForFree}
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{characters}/{isPro ? '∞' : maxCharsForFree} caracteres</span>
              {isLimitExceeded && (
                <span className="text-red-500 font-medium">
                  Limite excedido! Desbloqueie o PRO
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      {text && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{words}</div>
              <div className="text-sm text-gray-600">Palavras</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{characters}</div>
              <div className="text-sm text-gray-600">Caracteres</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{charactersNoSpaces}</div>
              <div className="text-sm text-gray-600">Sem espaços</div>
            </CardContent>
          </Card>
          
          <Card className={!isPro ? 'opacity-60' : ''}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {isPro ? paragraphs : '🔒'}
              </div>
              <div className="text-sm text-gray-600">
                Parágrafos {!isPro && '(PRO)'}
              </div>
            </CardContent>
          </Card>
          
          <Card className={!isPro ? 'opacity-60' : ''}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {isPro ? sentences : '🔒'}
              </div>
              <div className="text-sm text-gray-600">
                Frases {!isPro && '(PRO)'}
              </div>
            </CardContent>
          </Card>
          
          <Card className={!isPro ? 'opacity-60' : ''}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {isPro ? (sentences > 0 ? (words / sentences).toFixed(1) : '0') : '🔒'}
              </div>
              <div className="text-sm text-gray-600">
                Palavras/Frase {!isPro && '(PRO)'}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      {text && (
        <div className="flex gap-3">
          <Button 
            onClick={copyStats}
            variant="outline"
            className="flex-1"
            disabled={!isPro}
          >
            <Copy className="mr-2 h-4 w-4" />
            {!isPro && <Crown className="mr-1 h-3 w-3" />}
            Copiar Estatísticas
          </Button>
          <Button 
            onClick={downloadReport}
            variant="outline"
            className="flex-1"
            disabled={!isPro}
          >
            <Download className="mr-2 h-4 w-4" />
            {!isPro && <Crown className="mr-1 h-3 w-3" />}
            Baixar Relatório
          </Button>
        </div>
      )}

      {/* Features Info */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">✓ Versão Gratuita</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Contagem de palavras e caracteres</li>
                <li>• Máximo 1000 caracteres</li>
                <li>• Estatísticas básicas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                <Crown className="h-4 w-4" />
                Versão PRO
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Texto ilimitado</li>
                <li>• Análise de parágrafos e frases</li>
                <li>• Exportação de relatórios</li>
                <li>• Estatísticas avançadas</li>
                <li>• Análise de legibilidade</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordCounter;
