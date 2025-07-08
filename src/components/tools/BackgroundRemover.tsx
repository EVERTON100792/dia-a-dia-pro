
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Scissors, Crown, AlertCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BackgroundRemover = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [processedUrl, setProcessedUrl] = useState<string>("");
  const [isPro] = useState(false); // Simulated PRO status
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
        description: "Limite de 5MB para versão gratuita. Upgrade para PRO!",
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
        const maxDimension = isPro ? Math.max(img.width, img.height) : 512;
        let { width, height } = img;
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          // Draw original image
          ctx.drawImage(img, 0, 0, width, height);
          
          // Simulate background removal by creating a simple mask effect
          // In a real implementation, this would use AI models like REMBG or similar
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;
          
          // Simple edge detection for demo purposes
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Very basic background detection (this is just for demo)
            const brightness = (r + g + b) / 3;
            if (brightness > 200 || brightness < 50) {
              data[i + 3] = 0; // Make transparent
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/png');
        }
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleRemoveBackground = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const processed = await simulateBackgroundRemoval(selectedImage);
      setProcessedImage(processed);
      
      const url = URL.createObjectURL(processed);
      setProcessedUrl(url);

      toast({
        title: "Fundo removido com sucesso!",
        description: "Sua imagem está pronta para download.",
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

      {/* Upgrade Banner */}
      {!isPro && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-yellow-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800">Upgrade para PRO</h3>
                <p className="text-sm text-yellow-700">
                  • Alta resolução • Sem limite de tamanho • Processamento mais preciso • Formatos adicionais
                </p>
              </div>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Agora
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Limitations Notice */}
      {!isPro && (
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Limitações da versão gratuita:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Resolução limitada a 512px</li>
                  <li>Máximo 5MB por imagem</li>
                  <li>Processamento básico</li>
                  <li>Marca d'água na imagem</li>
                </ul>
              </div>
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
              <p>Nossa IA identifica automaticamente o objeto principal da imagem e remove o fundo, mantendo apenas o que importa. Ideal para produtos, pessoas e objetos bem definidos.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundRemover;
