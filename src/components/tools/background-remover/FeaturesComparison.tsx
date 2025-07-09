
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";

const FeaturesComparison = () => {
  return (
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
  );
};

export default FeaturesComparison;
