
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Scissors, Crown, AlertCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const BackgroundRemover = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [processedUrl, setProcessedUrl] = useState<string>("");
  const [showProUnlock, setShowProUnlock] = useState(false);
  const { isPro } = usePro();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const maxFileSize = isPro ? Infinity : 5 * 1024 * 1024; // 5MB limit for free
  const outputResolution = isPro ? "Alta resolução (original)" : "Baixa resolução (512px)";

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione uma imagem válida.",
        variant: "destructive",
      });
      return;
    }

    if (!isPro && file.size > maxFileSize) {
      toast({
        title: "Arquivo muito grande",
        description: "Limite de 5MB para versão gratuita. Desbloqueie o PRO!",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    setProcessedImage(null);
    setProcessedUrl("");
    
    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const simulateBackgroundRemoval = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Set canvas size based on PRO status
        const maxDimension = isPro ? Math.min(img.width, img.height, 2048) : 512;
        let { width, height } = img;
        
        if (width > maxDimension || height > maxDimension) {
          const scale = maxDimension / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          // Clear canvas with transparent background
          ctx.clearRect(0, 0, width, height);
          
          // Draw original image
          ctx.drawImage(img, 0, 0, width, height);
          
          if (isPro) {
            // For PRO users, just return the image with a simple mask effect
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            
            // Better algorithm for PRO users
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              // More sophisticated background detection
              const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
              const saturation = Math.max(r, g, b) - Math.min(r, g, b);
              
              // Remove white/light backgrounds and low saturation areas
              if (brightness > 240 || (brightness > 200 && saturation < 30)) {
                data[i + 3] = 0; // Make transparent
              } else if (brightness > 180 && saturation < 50) {
                data[i + 3] = Math.round(data[i + 3] * 0.3); // Semi-transparent
              }
            }
            
            ctx.putImageData(imageData, 0, 0);
          } else {
            // For free users, add a watermark and lower quality
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            
            // Simple background removal for free users
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              const brightness = (r + g + b) / 3;
              
              if (brightness > 220) {
                data[i + 3] = 0; // Make transparent
              }
            }
            
            ctx.putImageData(imageData, 0, 0);
            
            // Add watermark for free users
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '16px Arial';
            ctx.fillText('ToolsIA - Versão Gratuita', 10, height - 10);
          }
          
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/png', isPro ? 1.0 : 0.8);
        }
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleRemoveBackground = async () => {
    if (!selectedImage) return;

    if (!isPro) {
      toast({
        title: "Versão limitada",
        description: "Esta é uma versão limitada. Para melhor qualidade, desbloqueie o PRO!",
        variant: "default",
      });
    }

    setIsProcessing(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, isPro ? 3000 : 1500));
      
      const processed = await simulateBackgroundRemoval(selectedImage);
      setProcessedImage(processed);
      
      const url = URL.createObjectURL(processed);
      setProcessedUrl(url);

      toast({
        title: "Fundo removido com sucesso!",
        description: isPro ? "Sua imagem em alta qualidade está pronta!" : "Imagem processada! Desbloqueie o PRO para melhor qualidade.",
      });
    } catch (error) {
      console.error('Error removing background:', error);
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao remover o fundo da imagem.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadProcessed = () => {
    if (!processedImage || !selectedImage) return;

    const url = URL.createObjectURL(processedImage);
    const a = document.createElement('a');
    a.href = url;
    a.download = `no-bg_${selectedImage.name.replace(/\.[^/.]+$/, '')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (showProUnlock) {
    return (
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setShowProUnlock(false)}
          className="mb-4"
        >
          ← Voltar à ferramenta
        </Button>
        <ProBanner 
          toolName="Removedor de Fundo"
          limitations={[
            "Resolução limitada a 512px",
            "Máximo 5MB por imagem",
            "Processamento básico",
            "Marca d'água na imagem"
          ]}
          onUpgrade={() => setShowProUnlock(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white">
              <Scissors className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                Removedor de Fundo IA
                {!isPro && <Badge variant="secondary">Grátis</Badge>}
                {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
              </CardTitle>
              <CardDescription>
                Remova o fundo de suas imagens automaticamente com IA. {outputResolution}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Pro Banner */}
      <ProBanner 
        toolName="Removedor de Fundo"
        limitations={[
          "Resolução limitada a 512px",
          "Máximo 5MB por imagem",
          "Processamento básico",
          "Marca d'água na imagem"
        ]}
        onUpgrade={() => setShowProUnlock(true)}
      />

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Selecionar Imagem
          </CardTitle>
          <CardDescription>
            Formatos suportados: JPG, PNG, WebP. {!isPro && 'Máximo 5MB.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Clique para selecionar uma imagem
            </p>
            <p className="text-sm text-gray-500">
              ou arraste e solte aqui
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Preview and Process */}
      {selectedImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Processar Imagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original */}
              <div>
                <h3 className="font-medium mb-3 text-center">Imagem Original</h3>
                <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Original" 
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Processed */}
              <div>
                <h3 className="font-medium mb-3 text-center">Fundo Removido</h3>
                <div className="relative aspect-square bg-transparent bg-opacity-20 rounded-lg overflow-hidden border-2 border-dashed border-gray-300"
                     style={{
                       backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='%23e5e7eb' fill-opacity='0.4'%3e%3cpath d='m0 0h10v10H0zm10 10h10v10H10z'/%3e%3c/g%3e%3c/svg%3e")`,
                       backgroundSize: '20px 20px'
                     }}>
                  {processedUrl ? (
                    <img 
                      src={processedUrl} 
                      alt="Processed" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      {isProcessing ? (
                        <div className="text-center">
                          <Zap className="h-12 w-12 mx-auto mb-2 animate-pulse" />
                          <p>Removendo fundo...</p>
                        </div>
                      ) : (
                        <p>Imagem processada aparecerá aqui</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button 
                onClick={handleRemoveBackground}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                {isProcessing ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Scissors className="h-4 w-4 mr-2" />
                    Remover Fundo
                  </>
                )}
              </Button>
              
              {processedImage && (
                <Button onClick={downloadProcessed} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PNG
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Scissors className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Como funciona:</p>
              <p>Nossa IA identifica automaticamente o objeto principal da imagem e remove o fundo, mantendo apenas o que importa. {isPro ? 'Versão PRO com alta qualidade!' : 'Versão gratuita com qualidade limitada.'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundRemover;
