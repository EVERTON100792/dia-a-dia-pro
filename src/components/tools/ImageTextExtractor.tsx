
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Copy, Download, FileImage, Loader2, Crown } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const ImageTextExtractor = () => {
  const { isPro } = usePro();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confidence, setConfidence] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("Arquivo muito grande. Máximo 10MB permitido.");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecione um arquivo de imagem válido.");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOCR = (text: string): string => {
    // Simula erros de OCR para usuários não-PRO
    if (!isPro) {
      const errors = ['l', '1', 'o', '0', 'S', '5'];
      let result = text;
      errors.forEach(char => {
        result = result.replace(new RegExp(char, 'g'), Math.random() > 0.8 ? '?' : char);
      });
      return result;
    }
    return text;
  };

  const extractText = async () => {
    if (!selectedImage) {
      toast.error("Por favor, selecione uma imagem primeiro.");
      return;
    }

    setIsProcessing(true);
    
    // Simula processamento OCR
    setTimeout(() => {
      const mockTexts = [
        "Este é um exemplo de texto extraído da imagem.\nO processo de OCR foi concluído com sucesso.\nTexto reconhecido com alta precisão.",
        "Documento importante\nData: 15/01/2024\nEste documento contém informações relevantes para análise.",
        "Relatório Mensal\nVendas: R$ 15.000,00\nMeta: R$ 12.000,00\nResultado: Meta superada em 25%"
      ];
      
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      const processedText = simulateOCR(randomText);
      
      setExtractedText(processedText);
      setConfidence(isPro ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 50);
      setIsProcessing(false);
      
      toast.success("Texto extraído com sucesso!");
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast.success("Texto copiado para a área de transferência!");
  };

  const downloadText = () => {
    if (!isPro) {
      toast.error("Recurso disponível apenas para usuários PRO");
      return;
    }
    
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texto_extraido.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Arquivo baixado com sucesso!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Extrator de Texto de Imagem (OCR)
        </h1>
        <p className="text-xl text-gray-600">
          Extraia texto de imagens de forma rápida e precisa
        </p>
      </div>

      {!isPro && (
        <div className="mb-6">
          <ProBanner 
            toolName="OCR"
            limitations={[
              "Precisão limitada de reconhecimento",
              "Não é possível baixar arquivos",
              "Suporte limitado a formatos de imagem"
            ]}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Upload da Imagem
            </CardTitle>
            <CardDescription>
              Faça upload de uma imagem para extrair o texto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Trocar Imagem
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Clique para fazer upload ou arraste uma imagem aqui
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG até 10MB
                    </p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Selecionar Imagem
                  </Button>
                </div>
              )}
            </div>
            
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <Button 
              onClick={extractText} 
              disabled={!selectedImage || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extraindo Texto...
                </>
              ) : (
                "Extrair Texto"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Texto Extraído</span>
              {confidence > 0 && (
                <span className={`text-sm px-2 py-1 rounded ${
                  confidence >= 80 ? 'bg-green-100 text-green-800' : 
                  confidence >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  Precisão: {confidence}%
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Resultado do processamento OCR
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="extracted-text">Texto Reconhecido</Label>
              <Textarea
                id="extracted-text"
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="O texto extraído aparecerá aqui..."
                rows={10}
                className="mt-2"
              />
            </div>

            {extractedText && (
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
                <Button 
                  onClick={downloadText} 
                  variant="outline" 
                  className="flex-1"
                  disabled={!isPro}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {!isPro && <Crown className="mr-1 h-3 w-3" />}
                  Baixar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recursos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">✓ Versão Gratuita</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Extração básica de texto</li>
                <li>• Imagens até 10MB</li>
                <li>• Cópia para área de transferência</li>
                <li>• Formatos PNG, JPG, JPEG</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                <Crown className="h-4 w-4" />
                Versão PRO
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• OCR de alta precisão</li>
                <li>• Download em múltiplos formatos</li>
                <li>• Suporte a mais tipos de arquivo</li>
                <li>• Processamento em lote</li>
                <li>• Reconhecimento de idiomas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageTextExtractor;
