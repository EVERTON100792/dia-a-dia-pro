import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Image, Zap, Crown, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImageCompressor = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<Array<{ original: File; compressed: Blob; reduction: number }>>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState([80]);
  const [isPro] = useState(false); // Simulated PRO status
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const maxFiles = isPro ? 50 : 5;
  const maxFileSize = isPro ? Infinity : 10 * 1024 * 1024; // 10MB limit for free

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length > maxFiles) {
      toast({
        title: "Limite de arquivos excedido",
        description: `Versão gratuita permite apenas ${maxFiles} imagens por vez. Upgrade para PRO!`,
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Arquivo inválido",
          description: `${file.name} não é uma imagem válida.`,
          variant: "destructive",
        });
        return false;
      }

      if (!isPro && file.size > maxFileSize) {
        toast({
          title: "Arquivo muito grande",
          description: `${file.name} excede o limite de 10MB. Upgrade para PRO!`,
          variant: "destructive",
        });
        return false;
      }

      return true;
    });

    setSelectedFiles(validFiles);
    setCompressedImages([]);
  };

  const compressImage = (file: File): Promise<{ compressed: Blob; reduction: number }> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img') as HTMLImageElement;

      img.onload = () => {
        // Calculate new dimensions based on quality and PRO status
        const qualityFactor = quality[0] / 100;
        const maxDimension = isPro ? 2048 : 1024;
        
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
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const reduction = Math.round(((file.size - blob.size) / file.size) * 100);
                resolve({ compressed: blob, reduction });
              }
            },
            'image/jpeg',
            qualityFactor
          );
        }
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleCompress = async () => {
    if (selectedFiles.length === 0) return;

    setIsCompressing(true);
    const results = [];

    for (const file of selectedFiles) {
      try {
        const result = await compressImage(file);
        results.push({
          original: file,
          compressed: result.compressed,
          reduction: result.reduction
        });
      } catch (error) {
        console.error('Error compressing image:', error);
        toast({
          title: "Erro na compressão",
          description: `Erro ao comprimir ${file.name}`,
          variant: "destructive",
        });
      }
    }

    setCompressedImages(results);
    setIsCompressing(false);

    toast({
      title: "Compressão concluída!",
      description: `${results.length} imagens comprimidas com sucesso.`,
    });
  };

  const downloadImage = (compressed: Blob, originalName: string) => {
    const url = URL.createObjectURL(compressed);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${originalName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    compressedImages.forEach(({ compressed, original }) => {
      downloadImage(compressed, original.name);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white">
              <Image className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                Compressor de Imagens Online
                {!isPro && <Badge variant="secondary">Grátis</Badge>}
                {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
              </CardTitle>
              <CardDescription>
                Comprima suas imagens mantendo a qualidade. {isPro ? '50 imagens por vez' : '5 imagens por vez'}
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
                  • 50 imagens por vez • Sem limite de tamanho • Máxima qualidade • Processamento mais rápido
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
            Selecionar Imagens
          </CardTitle>
          <CardDescription>
            Formatos suportados: JPG, PNG, WebP. {!isPro && 'Máximo 10MB por imagem.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Clique para selecionar imagens
            </p>
            <p className="text-sm text-gray-500">
              ou arraste e solte aqui (máximo {maxFiles} {maxFiles > 1 ? 'imagens' : 'imagem'})
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Configurações de Compressão</h3>
                <Badge variant="outline">{selectedFiles.length} {selectedFiles.length === 1 ? 'imagem' : 'imagens'}</Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Qualidade: {quality[0]}%</label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Menor tamanho</span>
                  <span>Melhor qualidade</span>
                </div>
              </div>

              <Button 
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                {isCompressing ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Comprimindo...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Comprimir Imagens
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {compressedImages.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Resultados da Compressão
              </CardTitle>
              <Button onClick={downloadAll} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Baixar Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compressedImages.map(({ original, compressed, reduction }, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{original.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{formatFileSize(original.size)} → {formatFileSize(compressed.size)}</span>
                      <Badge variant={reduction > 50 ? "default" : "secondary"}>
                        -{reduction}%
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => downloadImage(compressed, original.name)}
                    size="sm"
                    variant="outline"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
                  <li>Máximo 5 imagens por vez</li>
                  <li>Limite de 10MB por imagem</li>
                  <li>Resolução máxima de 1024px</li>
                  <li>Qualidade limitada</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageCompressor;
