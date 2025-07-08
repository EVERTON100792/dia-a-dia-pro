
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Eye, Copy, Download } from "lucide-react";
import { toast } from "sonner";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  const [keywordAnalysis, setKeywordAnalysis] = useState<Array<{word: string, count: number}>>([]);

  useEffect(() => {
    analyzeText(text);
  }, [text]);

  const analyzeText = (inputText: string) => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
    const sentences = inputText === '' ? 0 : inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = inputText === '' ? 0 : inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Tempo de leitura (assumindo 200 palavras por minuto)
    const readingTime = Math.ceil(words / 200);
    // Tempo de fala (assumindo 150 palavras por minuto)
    const speakingTime = Math.ceil(words / 150);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    });

    // Análise de palavras-chave
    if (inputText.trim()) {
      const wordsArray = inputText.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/)
        .filter(word => word.length > 3); // Apenas palavras com mais de 3 caracteres

      const wordCount: Record<string, number> = {};
      wordsArray.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      const sortedWords = Object.entries(wordCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }));

      setKeywordAnalysis(sortedWords);
    } else {
      setKeywordAnalysis([]);
    }
  };

  const copyStats = () => {
    const statsText = `
Estatísticas do Texto:
- Palavras: ${stats.words}
- Caracteres: ${stats.characters}
- Caracteres (sem espaços): ${stats.charactersNoSpaces}
- Frases: ${stats.sentences}
- Parágrafos: ${stats.paragraphs}
- Tempo de leitura: ${stats.readingTime} min
- Tempo de fala: ${stats.speakingTime} min
    `.trim();
    
    navigator.clipboard.writeText(statsText);
    toast.success("Estatísticas copiadas!");
  };

  const downloadReport = () => {
    const report = `
RELATÓRIO DE ANÁLISE DE TEXTO
=============================

TEXTO ANALISADO:
${text}

ESTATÍSTICAS:
- Palavras: ${stats.words}
- Caracteres: ${stats.characters}
- Caracteres (sem espaços): ${stats.charactersNoSpaces}
- Frases: ${stats.sentences}
- Parágrafos: ${stats.paragraphs}
- Tempo de leitura estimado: ${stats.readingTime} minuto(s)
- Tempo de fala estimado: ${stats.speakingTime} minuto(s)

PALAVRAS MAIS FREQUENTES:
${keywordAnalysis.map((item, index) => `${index + 1}. ${item.word} (${item.count}x)`).join('\n')}

Relatório gerado em: ${new Date().toLocaleString()}
    `;

    const element = document.createElement("a");
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "relatorio-analise-texto.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Relatório baixado!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 728x90
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Contador de Palavras Profissional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Cole ou digite seu texto aqui para análise completa..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Estatísticas</CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={copyStats}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadReport}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
                  <div className="text-sm text-gray-600">Palavras</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.characters}</div>
                  <div className="text-sm text-gray-600">Caracteres</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.sentences}</div>
                  <div className="text-sm text-gray-600">Frases</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{stats.paragraphs}</div>
                  <div className="text-sm text-gray-600">Parágrafos</div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Caracteres (sem espaços)</span>
                  <Badge variant="secondary">{stats.charactersNoSpaces}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Tempo de leitura
                  </span>
                  <Badge variant="secondary">{stats.readingTime} min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Tempo de fala
                  </span>
                  <Badge variant="secondary">{stats.speakingTime} min</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Analysis */}
          {keywordAnalysis.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Palavras Frequentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {keywordAnalysis.map((item, index) => (
                    <div key={item.word} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">
                        {index + 1}. {item.word}
                      </span>
                      <Badge variant="outline">{item.count}x</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 320x250
      </div>

      {/* Features Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📊 Recursos Avançados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Contagem Precisa</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Palavras e caracteres</li>
                <li>• Frases e parágrafos</li>
                <li>• Com e sem espaços</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Análise de Tempo</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Tempo de leitura</li>
                <li>• Tempo de fala</li>
                <li>• Baseado em velocidades médias</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Palavras-chave</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Frequência de palavras</li>
                <li>• Top 10 mais usadas</li>
                <li>• Relatório exportável</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordCounter;
