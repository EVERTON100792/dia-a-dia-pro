
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Copy, Crown } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";
import QRCode from "qrcode";

const QRCodeGenerator = () => {
  const { isPro } = usePro();
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [errorLevel, setErrorLevel] = useState("M");
  const [size, setSize] = useState("256");

  const maxCharsForFree = 100;
  const isLimitExceeded = !isPro && text.length > maxCharsForFree;

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast.error("Por favor, digite algum texto ou URL");
      return;
    }

    if (!isPro && text.length > maxCharsForFree) {
      toast.error(`Versão gratuita limitada a ${maxCharsForFree} caracteres`);
      return;
    }

    try {
      const options = {
        errorCorrectionLevel: isPro ? errorLevel : 'L',
        width: isPro ? parseInt(size) : 200,
        margin: isPro ? 2 : 4,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      };

      const url = await QRCode.toDataURL(text, options);
      setQrCodeUrl(url);
      toast.success("QR Code gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar QR Code");
      console.error(error);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    if (!isPro) {
      toast.error("Download disponível apenas na versão PRO");
      return;
    }

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code baixado com sucesso!");
  };

  const copyQRCode = async () => {
    if (!qrCodeUrl) return;
    
    if (!isPro) {
      toast.error("Copiar imagem disponível apenas na versão PRO");
      return;
    }

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success("QR Code copiado para a área de transferência!");
    } catch (error) {
      toast.error("Erro ao copiar QR Code");
    }
  };

  const limitations = [
    "Limitado a 100 caracteres por QR Code",
    "Resolução fixa em 200x200px",
    "Correção de erro básica apenas",
    "Sem download ou cópia da imagem"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProBanner 
        toolName="Gerador de QR Code"
        limitations={limitations}
        isCompleteFree={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-blue-600" />
              Configurações do QR Code
              {!isPro && <Badge variant="secondary">Grátis</Badge>}
              {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Texto ou URL {!isPro && <span className="text-red-500">(máx. 100 caracteres)</span>}
              </label>
              <Textarea
                placeholder="Digite uma URL ou texto para gerar o QR Code..."
                value={text}
                onChange={(e) => {
                  if (!isPro && e.target.value.length > maxCharsForFree) {
                    toast.error(`Versão gratuita limitada a ${maxCharsForFree} caracteres`);
                    return;
                  }
                  setText(e.target.value);
                }}
                className={`${isLimitExceeded ? 'border-red-500' : ''}`}
                maxLength={isPro ? undefined : maxCharsForFree}
              />
              <div className="text-sm text-gray-500 mt-1">
                {text.length}/{isPro ? '∞' : maxCharsForFree} caracteres
              </div>
            </div>

            {isPro && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nível de Correção de Erro</label>
                  <Select value={errorLevel} onValueChange={setErrorLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Baixo (7%)</SelectItem>
                      <SelectItem value="M">Médio (15%)</SelectItem>
                      <SelectItem value="Q">Alto (25%)</SelectItem>
                      <SelectItem value="H">Muito Alto (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tamanho (pixels)</label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128x128</SelectItem>
                      <SelectItem value="256">256x256</SelectItem>
                      <SelectItem value="512">512x512</SelectItem>
                      <SelectItem value="1024">1024x1024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button 
              onClick={generateQRCode}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <QrCode className="mr-2 h-4 w-4" />
              Gerar QR Code
            </Button>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code Gerado</CardTitle>
          </CardHeader>
          <CardContent>
            {qrCodeUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code gerado" 
                    className="border rounded-lg shadow-sm"
                    style={{ width: isPro ? `${size}px` : '200px', height: isPro ? `${size}px` : '200px' }}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={downloadQRCode}
                    variant="outline" 
                    className="flex-1"
                    disabled={!isPro}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {!isPro && <Crown className="mr-1 h-3 w-3" />}
                    Baixar
                  </Button>
                  <Button 
                    onClick={copyQRCode}
                    variant="outline" 
                    className="flex-1"
                    disabled={!isPro}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {!isPro && <Crown className="mr-1 h-3 w-3" />}
                    Copiar
                  </Button>
                </div>

                {!isPro && (
                  <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <Crown className="inline h-4 w-4 mr-1" />
                      Desbloqueie o PRO para download, maior resolução e mais opções
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <QrCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Digite um texto e clique em "Gerar QR Code"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Info */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">✓ Versão Gratuita</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• QR Codes até 100 caracteres</li>
                <li>• Resolução 200x200px</li>
                <li>• Correção de erro básica</li>
                <li>• Visualização do QR Code</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                <Crown className="h-4 w-4" />
                Versão PRO
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Texto ilimitado</li>
                <li>• Resolução até 1024x1024px</li>
                <li>• Controle de correção de erro</li>
                <li>• Download em PNG</li>
                <li>• Copiar para área de transferência</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
