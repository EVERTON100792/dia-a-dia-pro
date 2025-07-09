
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, Download, Scissors, Crown } from "lucide-react";

interface ImageResultSectionProps {
  processedImage: string;
  selectedImage: File | null;
  isPro: boolean;
  onDownload: () => void;
}

const ImageResultSection = ({
  processedImage,
  selectedImage,
  isPro,
  onDownload
}: ImageResultSectionProps) => {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Image className="h-4 w-4 sm:h-5 sm:w-5" />
            Resultado
          </CardTitle>
          {processedImage && isPro && (
            <Button onClick={onDownload} size="sm" className="text-xs">
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
  );
};

export default ImageResultSection;
