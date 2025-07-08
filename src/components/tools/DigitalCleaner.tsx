
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Trash2, Copy, FileText, Image, Music, Video, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

interface FileInfo {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  isDuplicate?: boolean;
}

interface FileAnalysis {
  totalFiles: number;
  totalSize: number;
  duplicates: FileInfo[];
  byType: Record<string, FileInfo[]>;
  suggestions: string[];
}

const DigitalCleaner = () => {
  const { isPro } = usePro();
  const [analysis, setAnalysis] = useState<FileAnalysis | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (!isPro && files.length > 50) {
      toast.error("Versão gratuita limitada a 50 arquivos");
      return;
    }

    setSelectedFiles(files);
    toast.success(`${files.length} arquivos selecionados`);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(ext)) return 'video';
    if (['mp3', 'wav', 'flac', 'aac', 'm4a'].includes(ext)) return 'audio';
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'document';
    return 'other';
  };

  const analyzeFiles = () => {
    if (selectedFiles.length === 0) {
      toast.error("Selecione arquivos para analisar");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const fileInfos: FileInfo[] = selectedFiles.map(file => ({
        name: file.name,
        type: getFileType(file.name),
        size: file.size,
        lastModified: file.lastModified
      }));

      // Simulação de detecção de duplicatas (baseado no nome e tamanho)
      const duplicates: FileInfo[] = [];
      const seen = new Map<string, FileInfo>();

      fileInfos.forEach(file => {
        const key = `${file.name}-${file.size}`;
        if (seen.has(key)) {
          duplicates.push({ ...file, isDuplicate: true });
          if (!duplicates.find(d => d.name === seen.get(key)!.name)) {
            duplicates.push({ ...seen.get(key)!, isDuplicate: true });
          }
        } else {
          seen.set(key, file);
        }
      });

      // Agrupar por tipo
      const byType: Record<string, FileInfo[]> = {};
      fileInfos.forEach(file => {
        if (!byType[file.type]) byType[file.type] = [];
        byType[file.type].push(file);
      });

      // Gerar sugestões
      const suggestions: string[] = [];
      if (duplicates.length > 0) {
        suggestions.push(`${duplicates.length} arquivos duplicados encontrados`);
      }
      
      const largeFiles = fileInfos.filter(f => f.size > 10 * 1024 * 1024); // > 10MB
      if (largeFiles.length > 0) {
        suggestions.push(`${largeFiles.length} arquivos grandes (>10MB) encontrados`);
      }

      suggestions.push("Organize arquivos por tipo em pastas separadas");

      const analysisResult: FileAnalysis = {
        totalFiles: fileInfos.length,
        totalSize: fileInfos.reduce((sum, file) => sum + file.size, 0),
        duplicates,
        byType,
        suggestions
      };

      setAnalysis(analysisResult);
      setIsAnalyzing(false);
      toast.success("Análise concluída!");
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Music className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'audio': return 'bg-purple-100 text-purple-700';
      case 'document': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const simulateCleanup = () => {
    if (!isPro) {
      toast.error("Funcionalidade disponível apenas na versão PRO");
      return;
    }
    toast.success("Limpeza simulada - arquivos duplicados removidos!");
  };

  const limitations = [
    "Limitado a 50 arquivos por análise",
    "Análise básica de duplicatas",
    "Sem limpeza automática",
    "Sem backup antes da limpeza"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ProBanner 
        toolName="Limpeza Digital Rápida"
        limitations={limitations}
        isCompleteFree={false}
      />

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 728x90
      </div>

      {/* File Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-blue-600" />
            Selecionar Arquivos para Análise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Selecione os arquivos {!isPro && <span className="text-red-500">(máx. 50 arquivos)</span>}
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileSelection}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {selectedFiles.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {selectedFiles.length} arquivos selecionados
              </p>
            )}
          </div>

          <Button 
            onClick={analyzeFiles} 
            disabled={isAnalyzing || selectedFiles.length === 0}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isAnalyzing ? "Analisando..." : "Analisar Arquivos"}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Resumo da Análise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analysis.totalFiles}</div>
                  <div className="text-sm text-gray-600">Total de Arquivos</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatFileSize(analysis.totalSize)}</div>
                  <div className="text-sm text-gray-600">Tamanho Total</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{analysis.duplicates.length}</div>
                  <div className="text-sm text-gray-600">Duplicatas</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{Object.keys(analysis.byType).length}</div>
                  <div className="text-sm text-gray-600">Tipos de Arquivo</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📁 Arquivos por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(analysis.byType).map(([type, files]) => (
                  <div key={type} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getTypeColor(type)}>
                        {getTypeIcon(type)}
                        <span className="ml-1 capitalize">{type}</span>
                      </Badge>
                      <span className="text-sm text-gray-600">{files.length} arquivos</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duplicates */}
          {analysis.duplicates.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Copy className="h-5 w-5 text-orange-600" />
                    Arquivos Duplicados
                  </CardTitle>
                  {isPro && (
                    <Button onClick={simulateCleanup} variant="outline" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Limpar Duplicatas
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {analysis.duplicates.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(file.type)}
                        <div>
                          <div className="font-medium text-sm">{file.name}</div>
                          <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-orange-700 border-orange-300">
                        Duplicata
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Sugestões de Organização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 320x250
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🧹 Como Funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Versão Gratuita</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Até 50 arquivos por análise</li>
                <li>• Detecção básica de duplicatas</li>
                <li>• Organização por tipo</li>
                <li>• Sugestões de limpeza</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Versão PRO 🔒</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Arquivos ilimitados</li>
                <li>• Limpeza automática</li>
                <li>• Backup antes da limpeza</li>
                <li>• Análise avançada de duplicatas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalCleaner;
