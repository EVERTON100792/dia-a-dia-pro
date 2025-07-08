
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Copy, RotateCcw, Palette, Settings } from "lucide-react";
import { toast } from "sonner";
import QRCodeLib from "qrcode";

const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [size, setSize] = useState(300);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!inputText.trim()) {
      toast.error("Por favor, digite algum texto ou URL");
      return;
    }

    try {
      const options = {
        width: size,
        errorCorrectionLevel,
        color: {
          dark: color,
          light: backgroundColor,
        },
      };

      const dataURL = await QRCodeLib.toDataURL(inputText, options);
      setQrCodeDataURL(dataURL);
      
      toast.success("QR Code gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
      toast.error("Erro ao gerar QR Code");
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL) {
      toast.error("Primeiro gere um QR Code");
      return;
    }

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeDataURL;
    link.click();
    
    toast.success("QR Code baixado!");
  };

  const copyToClipboard = async () => {
    if (!qrCodeDataURL) {
      toast.error("Primeiro gere um QR Code");
      return;
    }

    try {
      const response = await fetch(qrCodeDataURL);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      toast.success("QR Code copiado para a área de transferência!");
    } catch (error) {
      // Fallback: copiar o texto
      navigator.clipboard.writeText(inputText);
      toast.success("Texto copiado para a área de transferência!");
    }
  };

  const clearAll = () => {
    setInputText("");
    setQrCodeDataURL("");
    toast.success("Tudo limpo!");
  };

  const errorLevels = [
    { value: "L", label: "Baixo (7%)", description: "Até 7% de recuperação" },
    { value: "M", label: "Médio (15%)", description: "Até 15% de recuperação" },
    { value: "Q", label: "Alto (25%)", description: "Até 25% de recuperação" },
    { value: "H", label: "Muito Alto (30%)", description: "Até 30% de recuperação" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 728x90
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-blue-600" />
              Gerador de QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Texto ou URL</Label>
              <Textarea
                placeholder="Digite seu texto, URL, ou qualquer informação..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Tamanho (px)</Label>
                <Input
                  type="number"
                  min="100"
                  max="800"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Correção de Erro</Label>
                <select 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  value={errorCorrectionLevel}
                  onChange={(e) => setErrorCorrectionLevel(e.target.value as "L" | "M" | "Q" | "H")}
                >
                  {errorLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Cor do QR Code</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Cor de Fundo</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={generateQRCode} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex-1"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Gerar QR Code
              </Button>
              <Button variant="outline" onClick={clearAll}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-green-600" />
              Resultado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrCodeDataURL ? (
              <div className="text-center space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg inline-block">
                  <img 
                    src={qrCodeDataURL} 
                    alt="QR Code gerado" 
                    className="mx-auto"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                
                <div className="flex gap-2 justify-center">
                  <Button onClick={downloadQRCode} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar PNG
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar
                  </Button>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Tamanho:</strong> {size}x{size}px</p>
                  <p><strong>Correção:</strong> {errorLevels.find(l => l.value === errorCorrectionLevel)?.label}</p>
                  <p><strong>Caracteres:</strong> {inputText.length}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Digite um texto e clique em "Gerar QR Code" para visualizar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 320x250
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📱 Sobre QR Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Usos Comuns</Badge>
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• URLs de websites</li>
                <li>• Informações de contato</li>
                <li>• Textos e mensagens</li>
                <li>• Dados WiFi</li>
                <li>• Localização GPS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">Níveis de Correção</Badge>
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>L:</strong> 7% - Uso básico</li>
                <li>• <strong>M:</strong> 15% - Uso padrão</li>
                <li>• <strong>Q:</strong> 25% - Ambientes com ruído</li>
                <li>• <strong>H:</strong> 30% - Máxima confiabilidade</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Dicas</Badge>
              </h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Use contraste alto</li>
                <li>• Teste antes de imprimir</li>
                <li>• Considere o tamanho final</li>
                <li>• Mantenha texto curto</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
