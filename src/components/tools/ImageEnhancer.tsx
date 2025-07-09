
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, Image, Sparkles, Crown, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const ImageEnhancer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [enhancedImage, setEnhancedImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState("1080p");
  const { isPro } = usePro();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const maxFileSize = isPro ? Infinity : 5 * 1024 * 1024; // 5MB para gratuito
  const allowedQualities = isPro ? ["720p", "1080p", "2K", "4K"] : ["720p"];

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
          description: "Versão gratuita limitada a 5MB. Desbloqueie o PRO!",
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
      setEnhancedImage("");
    }
  };

  const enhanceImage = async () => {
    if (!selectedImage) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione uma imagem primeiro.",
        variant: "destructive",
      });
      return;
    }

    if (!isPro && quality !== "720p") {
      toast({
        title: "Qualidade limitada",
        description: "Versão gratuita limitada a 720p. Desbloqueie o PRO para 4K!",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simula processamento de melhoria de imagem
    setTimeout(() => {
      // Para simular, vamos criar uma versão "melhorada" da imagem original
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Define resolução baseada na qualidade
        const qualityMultipliers = {
          "720p": 1,
          "1080p": isPro ? 1.5 : 1,
          "2K": isPro ? 2 : 1,
          "4K": isPro ? 3 : 1
        };
        
        const multiplier = qualityMultipliers[quality as keyof typeof qualityMultipliers];
        canvas.width = img.width * multiplier;
        canvas.height = img.height * multiplier;
        
        if (ctx) {
          // Aplica filtros de melhoria simulados
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = isPro ? 'high' : 'medium';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Aplica filtros de brilho e contraste (simulado)
          if (isPro) {
            ctx.filter = 'brightness(1.1) contrast(1.05) saturate(1.1)';
            ctx.drawImage(canvas, 0, 0);
          }
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setEnhancedImage(url);
              toast({
                title: "Imagem melhorada com sucesso!",
                description: `Processada em ${quality} ${isPro ? 'com IA premium' : 'com qualidade básica'}`,
              });
            }
          }, 'image/jpeg', isPro ? 0.95 : 0.8);
        }
        
        setIsProcessing(false);
      };
      
      img.src = imagePreview;
    }, isPro ? 3000 : 1500); // PRO demora mais para simular processamento mais complexo
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    
    if (!isPro) {
      toast({
        title: "Download limitado",
        description: "Download disponível apenas na versão PRO",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = `enhanced-${selectedImage?.name || 'image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado",
      description: "Sua imagem melhorada foi baixada com sucesso!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Melhorador de Imagem com IA
        </h1>
        <p className="text-xl text-gray-600">
          Melhore suas imagens com inteligência artificial
        </p>
      </div>

      <div className="mb-6">
        <ProBanner 
          toolName="Melhorador de Imagem"
          limitations={[
            "Limitado a 5MB por imagem",
            "Qualidade máxima de 720p",
            "IA básica de processamento",
            "Sem download das imagens melhoradas"
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload da Imagem
              {!isPro && <Badge variant="secondary">Grátis</Badge>}
              {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
            </CardTitle>
            <CardDescription>
              Envie uma imagem para melhorar {!isPro && "(máx. 5MB)"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
                  />
                  <Button variant="outline">
                    Trocar Imagem
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Image className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Clique para fazer upload
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, JPEG {!isPro && "até 5MB"}
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

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Qualidade de Saída
                </label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allowedQualities.map((q) => (
                      <SelectItem key={q} value={q}>
                        {q} {q !== "720p" && !isPro && "(PRO)"}
                      </SelectItem>
                    ))}
                    {isPro && (
                      <>
                        <SelectItem value="1080p">1080p Full HD</SelectItem>
                        <SelectItem value="2K">2K (2048x1080)</SelectItem>
                        <SelectItem value="4K">4K Ultra HD</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {!isPro && (
                  <p className="text-xs text-gray-500 mt-1">
                    Versão gratuita limitada a 720p
                  </p>
                )}
              </div>

              <Button 
                onClick={enhanceImage}
                disabled={!selectedImage || isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                {isProcessing ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-spin" />
                    {isPro ? "Processando com IA Premium..." : "Melhorando Imagem..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Melhorar Imagem
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Resultado
              </CardTitle>
              {enhancedImage && isPro && (
                <Button onClick={downloadImage} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {enhancedImage ? (
              <div className="space-y-4">
                <img 
                  src={enhancedImage} 
                  alt="Imagem melhorada" 
                  className="w-full rounded-lg shadow-sm border"
                />
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Qualidade: {quality}</span>
                  <span>{isPro ? "IA Premium" : "IA Básica"}</span>
                </div>

                {!isPro && (
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Desbloqueie o PRO</span>
                    </div>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Download das imagens melhoradas</li>
                      <li>• Qualidade até 4K Ultra HD</li>
                      <li>• IA premium com resultados superiores</li>
                      <li>• Processamento sem limites de tamanho</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Sua imagem melhorada aparecerá aqui</p>
                <p className="text-sm">Faça upload de uma imagem para começar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Comparison */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Comparação de Recursos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                ✓ Versão Gratuita
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Melhoria básica de imagens
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Qualidade até 720p
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Arquivos até 5MB
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  IA básica de processamento
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Versão PRO
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Melhoria premium com IA avançada
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Qualidade até 4K Ultra HD
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Sem limite de tamanho de arquivo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Download das imagens processadas
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Filtros e ajustes avançados
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageEnhancer;
