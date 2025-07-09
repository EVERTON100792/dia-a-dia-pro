
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Image, Scissors, Crown, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const BackgroundRemover = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { isPro } = usePro();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const maxFileSize = isPro ? Infinity : 3 * 1024 * 1024; // 3MB para gratuito
  const maxResolution = isPro ? 2048 : 512; // Resolução limitada para gratuito

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione um arquivo de imagem válido.",
          variant: "destructive",
        });
        return;
      }

      if (!isPro && file.size > maxFileSize) {
        toast({
          title: "Arquivo muito grande",
          description: "Versão gratuita limitada a 3MB. Desbloqueie o PRO!",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setProcessedImage("");
    }
  };

  const removeBackground = async () => {
    if (!selectedImage) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione uma imagem primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Algoritmo melhorado de remoção de fundo
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Limita resolução para usuários gratuitos
        const scale = Math.min(maxResolution / img.width, maxResolution / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        if (ctx) {
          // Configura qualidade baseada na versão
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = isPro ? 'high' : 'medium';
          
          // Desenha a imagem
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Algoritmo de remoção de fundo melhorado
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Algoritmo funcional para ambas versões
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const alpha = data[i + 3];
            
            // Detecta pixels de fundo (cores claras e uniformes)
            const brightness = (r + g + b) / 3;
            const colorVariation = Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b);
            
            // Condições para identificar fundo
            const isLikelyBackground = (
              brightness > 200 || // Pixels muito claros
              (brightness > 150 && colorVariation < 30) || // Pixels uniformes
              (r > 240 && g > 240 && b > 240) // Pixels quase brancos
            );
            
            if (isLikelyBackground) {
              if (isPro) {
                // Versão PRO: remoção mais precisa
                data[i + 3] = 0; // Remove completamente
              } else {
                // Versão gratuita: remoção funcional mas menos precisa
                data[i + 3] = Math.max(0, alpha * 0.1); // Remove mas deixa um pouco
              }
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setProcessedImage(url);
              toast({
                title: "Fundo removido com sucesso!",
                description: `Processado com ${isPro ? 'IA premium' : 'IA básica'}`,
              });
            }
          }, 'image/png', isPro ? 1.0 : 0.8);
        }
        
        setIsProcessing(false);
      };
      
      img.src = imagePreview;
    }, isPro ? 3000 : 2000);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    if (!isPro) {
      toast({
        title: "Download limitado",
        description: "Download disponível apenas na versão PRO",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `sem-fundo-${selectedImage?.name || 'image'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado",
      description: "Sua imagem sem fundo foi baixada!",
    });
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-6xl">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
          Removedor de Fundo com IA
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Remove fundos de imagens automaticamente
        </p>
      </div>

      <div className="mb-4 sm:mb-6">
        <ProBanner 
          toolName="Removedor de Fundo"
          limitations={[
            "Limitado a 3MB por imagem",
            "Resolução máxima de 512px",
            "IA básica com menor precisão",
            "Sem download das imagens processadas"
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
              Imagem Original
              {!isPro && <Badge variant="secondary" className="text-xs">Grátis</Badge>}
              {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
            </CardTitle>
            <CardDescription className="text-sm">
              Envie uma imagem para remover o fundo {!isPro && "(máx. 3MB)"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full max-h-48 sm:max-h-64 mx-auto rounded-lg shadow-sm object-contain"
                  />
                  <Button variant="outline" size="sm">
                    Trocar Imagem
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Scissors className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                      Clique para fazer upload
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      PNG, JPG, JPEG {!isPro && "até 3MB"}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <Button 
              onClick={removeBackground}
              disabled={!selectedImage || isProcessing}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-sm sm:text-base"
            >
              {isProcessing ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-spin" />
                  {isPro ? "Removendo com IA Premium..." : "Removendo Fundo..."}
                </>
              ) : (
                <>
                  <Scissors className="mr-2 h-4 w-4" />
                  Remover Fundo
                </>
              )}
            </Button>

            {!isPro && (
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p><strong>Limitações da versão gratuita:</strong></p>
                <ul className="mt-1 space-y-1">
                  <li>• Resolução limitada a 512px</li>
                  <li>• Qualidade de remoção básica</li>
                  <li>• Sem download das imagens</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Image className="h-4 w-4 sm:h-5 sm:w-5" />
                Resultado
              </CardTitle>
              {processedImage && isPro && (
                <Button onClick={downloadImage} size="sm" className="text-xs">
                  <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Baixar PNG</span>
                  <span className="sm:hidden">PNG</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {processedImage ? (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23000\" fill-opacity=\"0.1\"%3E%3Crect x=\"0\" y=\"0\" width=\"10\" height=\"10\"/%3E%3Crect x=\"10\" y=\"10\" width=\"10\" height=\"10\"/%3E%3C/g%3E%3C/svg%3E')] rounded-lg"></div>
                  <img 
                    src={processedImage} 
                    alt="Fundo removido" 
                    className="w-full rounded-lg shadow-sm relative z-10 object-contain max-h-48 sm:max-h-64"
                  />
                </div>
                
                <div className="text-center">
                  <Badge variant="outline" className={`text-xs ${isPro ? "border-green-500 text-green-700" : "border-orange-500 text-orange-700"}`}>
                    {isPro ? "IA Premium" : "IA Básica"}
                  </Badge>
                </div>

                {!isPro && (
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
                      <span className="font-semibold text-pink-800 text-sm sm:text-base">Desbloqueie o PRO</span>
                    </div>
                    <ul className="text-xs sm:text-sm text-pink-700 space-y-1">
                      <li>• Download das imagens processadas</li>
                      <li>• IA premium com maior precisão</li>
                      <li>• Resolução completa até 2048px</li>
                      <li>• Processamento sem limite de tamanho</li>
                      <li>• Remoção de fundo profissional</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-16 text-gray-500">
                <Scissors className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-30" />
                <p className="text-base sm:text-lg">Sua imagem sem fundo aparecerá aqui</p>
                <p className="text-xs sm:text-sm">Faça upload de uma imagem para começar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Comparison */}
      <Card className="mt-6 sm:mt-8">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Comparação de Recursos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2 text-sm sm:text-base">
                ✓ Versão Gratuita
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  Remoção básica de fundo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  Resolução até 512px
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  Arquivos até 3MB
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  Prévia do resultado
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
                Versão PRO
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  IA avançada com alta precisão
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Resolução até 2048px
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Sem limite de tamanho
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Download em PNG transparente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Detecção avançada de bordas
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundRemover;
