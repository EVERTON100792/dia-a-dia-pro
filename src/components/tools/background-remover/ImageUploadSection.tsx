
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Scissors, Crown, Zap } from "lucide-react";

interface ImageUploadSectionProps {
  selectedImage: File | null;
  imagePreview: string;
  isProcessing: boolean;
  isPro: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveBackground: () => void;
}

const ImageUploadSection = ({
  selectedImage,
  imagePreview,
  isProcessing,
  isPro,
  fileInputRef,
  onImageUpload,
  onRemoveBackground
}: ImageUploadSectionProps) => {
  return (
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
          onChange={onImageUpload}
          className="hidden"
        />

        <Button 
          onClick={onRemoveBackground}
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
  );
};

export default ImageUploadSection;
