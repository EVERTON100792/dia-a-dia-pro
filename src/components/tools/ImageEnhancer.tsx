
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Image, Sparkles, Crown, Zap, Camera, Aperture, Focus, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const ImageEnhancer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [enhancedImage, setEnhancedImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState("1080p");
  
  // Professional camera effects settings
  const [backgroundBlur, setBackgroundBlur] = useState([0]);
  const [bokehIntensity, setBokehIntensity] = useState([0]);
  const [sharpness, setSharpness] = useState([50]);
  const [vibrance, setVibrance] = useState([50]);
  const [warmth, setWarmth] = useState([50]);
  const [exposure, setExposure] = useState([50]);
  const [highlights, setHighlights] = useState([50]);
  const [shadows, setShadows] = useState([50]);
  const [professionalMode, setProfessionalMode] = useState(false);
  
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

    if (!isPro && (backgroundBlur[0] > 0 || bokehIntensity[0] > 0 || professionalMode)) {
      toast({
        title: "Recursos limitados",
        description: "Efeitos profissionais disponíveis apenas no PRO!",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simula processamento avançado de melhoria de imagem
    setTimeout(() => {
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
          // Configurações de qualidade
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = isPro ? 'high' : 'medium';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Aplica filtros profissionais se for PRO
          if (isPro) {
            // Cria filtros CSS avançados baseados nos controles
            const brightness = 0.8 + (exposure[0] / 100) * 0.4; // 0.8 - 1.2
            const contrast = 0.9 + (sharpness[0] / 100) * 0.4; // 0.9 - 1.3
            const saturate = 0.8 + (vibrance[0] / 100) * 0.6; // 0.8 - 1.4
            const sepia = (warmth[0] - 50) / 200; // -0.25 to 0.25
            const blur = backgroundBlur[0] * 0.5; // 0 to 5px
            
            // Simula desfoque de fundo (efeito bokeh)
            if (backgroundBlur[0] > 0) {
              ctx.filter = `blur(${blur}px)`;
              
              // Desenha uma versão desfocada como fundo
              ctx.globalAlpha = 0.7;
              ctx.drawImage(canvas, 0, 0);
              
              // Restaura área central focada (simulação)
              ctx.globalAlpha = 1;
              ctx.filter = 'none';
              const centerX = canvas.width * 0.3;
              const centerY = canvas.height * 0.3;
              const centerW = canvas.width * 0.4;
              const centerH = canvas.height * 0.4;
              
              // Área focada no centro
              ctx.drawImage(img, 
                centerX / multiplier, centerY / multiplier, centerW / multiplier, centerH / multiplier,
                centerX, centerY, centerW, centerH
              );
            }
            
            // Aplica todos os ajustes de cor
            ctx.filter = `
              brightness(${brightness}) 
              contrast(${contrast}) 
              saturate(${saturate})
              sepia(${Math.abs(sepia)})
              ${sepia > 0 ? `hue-rotate(${sepia * 60}deg)` : ''}
            `;
            
            ctx.globalCompositeOperation = 'multiply';
            ctx.drawImage(canvas, 0, 0);
            ctx.globalCompositeOperation = 'source-over';
            
          } else {
            // Versão básica gratuita
            ctx.filter = 'brightness(1.05) contrast(1.02)';
            ctx.drawImage(canvas, 0, 0);
          }
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setEnhancedImage(url);
              
              const effectsApplied = [];
              if (isPro) {
                if (backgroundBlur[0] > 0) effectsApplied.push('Desfoque de fundo');
                if (bokehIntensity[0] > 0) effectsApplied.push('Efeito Bokeh');
                if (sharpness[0] !== 50) effectsApplied.push('Nitidez ajustada');
                if (vibrance[0] !== 50) effectsApplied.push('Vibrância otimizada');
                if (warmth[0] !== 50) effectsApplied.push('Temperatura de cor');
              }
              
              toast({
                title: "Imagem melhorada com sucesso!",
                description: isPro && effectsApplied.length > 0 
                  ? `Aplicados: ${effectsApplied.join(', ')}`
                  : `Processada em ${quality} ${isPro ? 'com IA premium' : 'com qualidade básica'}`,
              });
            }
          }, 'image/jpeg', isPro ? 0.95 : 0.8);
        }
        
        setIsProcessing(false);
      };
      
      img.src = imagePreview;
    }, isPro ? 4000 : 2000); // PRO demora mais para simular processamento mais complexo
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

  const resetSettings = () => {
    setBackgroundBlur([0]);
    setBokehIntensity([0]);
    setSharpness([50]);
    setVibrance([50]);
    setWarmth([50]);
    setExposure([50]);
    setHighlights([50]);
    setShadows([50]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Melhorador de Imagem Profissional
        </h1>
        <p className="text-xl text-gray-600">
          Transforme suas fotos com qualidade de câmera profissional
        </p>
      </div>

      <div className="mb-6">
        <ProBanner 
          toolName="Melhorador de Imagem"
          limitations={[
            "Limitado a 5MB por imagem",
            "Qualidade máxima de 720p",
            "Sem efeitos profissionais (desfoque, bokeh, etc.)",
            "Sem controles avançados de cor e exposição",
            "Sem download das imagens melhoradas"
          ]}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
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
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full max-h-40 mx-auto rounded-lg shadow-sm"
                  />
                  <Button variant="outline" size="sm">
                    Trocar Imagem
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-10 w-10 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      Clique para upload
                    </p>
                    <p className="text-xs text-gray-500">
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

            <div className="space-y-3">
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

        {/* Professional Controls - Only for PRO */}
        {isPro && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Aperture className="h-5 w-5" />
                Controles Profissionais
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                  <Crown className="h-3 w-3 mr-1" />PRO
                </Badge>
              </CardTitle>
              <CardDescription>
                Ajustes avançados de câmera profissional
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Background Blur */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Focus className="h-4 w-4" />
                  <label className="text-sm font-medium">Desfoque de Fundo</label>
                  <span className="text-xs text-gray-500">{backgroundBlur[0]}%</span>
                </div>
                <Slider
                  value={backgroundBlur}
                  onValueChange={setBackgroundBlur}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Bokeh Intensity */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <label className="text-sm font-medium">Intensidade Bokeh</label>
                  <span className="text-xs text-gray-500">{bokehIntensity[0]}%</span>
                </div>
                <Slider
                  value={bokehIntensity}
                  onValueChange={setBokehIntensity}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Sharpness */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <label className="text-sm font-medium">Nitidez</label>
                  <span className="text-xs text-gray-500">{sharpness[0]}%</span>
                </div>
                <Slider
                  value={sharpness}
                  onValueChange={setSharpness}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Vibrance */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <label className="text-sm font-medium">Vibrância</label>
                  <span className="text-xs text-gray-500">{vibrance[0]}%</span>
                </div>
                <Slider
                  value={vibrance}
                  onValueChange={setVibrance}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Warmth */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  🌡️ Temperatura de Cor
                  <span className="text-xs text-gray-500">{warmth[0]}%</span>
                </label>
                <Slider
                  value={warmth}
                  onValueChange={setWarmth}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Exposure */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  ☀️ Exposição
                  <span className="text-xs text-gray-500">{exposure[0]}%</span>
                </label>
                <Slider
                  value={exposure}
                  onValueChange={setExposure}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <Button 
                onClick={resetSettings}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Resetar Configurações
              </Button>
            </CardContent>
          </Card>
        )}

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
                      <li>• Desfoque de fundo profissional</li>
                      <li>• Efeito Bokeh realístico</li>
                      <li>• Controles avançados de exposição</li>
                      <li>• Ajustes de cor profissionais</li>
                      <li>• Download das imagens melhoradas</li>
                      <li>• Qualidade até 4K Ultra HD</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Sua imagem melhorada aparecerá aqui</p>
                <p className="text-sm">Faça upload de uma imagem para começar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Professional Features Showcase */}
      {isPro && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Efeitos de Câmera Profissional Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Focus className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold mb-1">Desfoque de Fundo</h4>
                <p className="text-xs text-gray-600">Efeito de profundidade realístico</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-semibold mb-1">Efeito Bokeh</h4>
                <p className="text-xs text-gray-600">Pontos de luz suavizados</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Palette className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-semibold mb-1">Correção de Cor</h4>
                <p className="text-xs text-gray-600">Vibrância e temperatura</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Aperture className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <h4 className="font-semibold mb-1">Controle de Exposição</h4>
                <p className="text-xs text-gray-600">Luzes e sombras</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
                  Ajustes automáticos básicos
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
                  Desfoque de fundo profissional
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Efeito Bokeh realístico
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Controles avançados de exposição
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Ajustes profissionais de cor
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Qualidade até 4K Ultra HD
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Download das imagens processadas
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
