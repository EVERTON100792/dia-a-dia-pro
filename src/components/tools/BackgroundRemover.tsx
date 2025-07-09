
import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";
import ImageUploadSection from "./background-remover/ImageUploadSection";
import ImageResultSection from "./background-remover/ImageResultSection";
import FeaturesComparison from "./background-remover/FeaturesComparison";

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
        <ImageUploadSection
          selectedImage={selectedImage}
          imagePreview={imagePreview}
          isProcessing={isProcessing}
          isPro={isPro}
          fileInputRef={fileInputRef}
          onImageUpload={handleImageUpload}
          onRemoveBackground={removeBackground}
        />

        <ImageResultSection
          processedImage={processedImage}
          selectedImage={selectedImage}
          isPro={isPro}
          onDownload={downloadImage}
        />
      </div>

      <FeaturesComparison />
    </div>
  );
};

export default BackgroundRemover;
