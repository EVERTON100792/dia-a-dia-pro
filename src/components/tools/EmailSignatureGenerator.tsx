
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Copy, Download, Crown, User } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const EmailSignatureGenerator = () => {
  const { isPro } = usePro();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: ""
  });
  const [template, setTemplate] = useState("modern");
  const [signature, setSignature] = useState("");

  // Limitações para versão gratuita
  const canUseAdvancedTemplates = isPro;
  const canCustomizeColors = isPro;
  const canAddSocialLinks = isPro;

  const templates = {
    basic: {
      name: "Básico",
      isPro: false,
      html: (data: typeof formData) => `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <strong>${data.name}</strong><br/>
          ${data.title}<br/>
          ${data.company}<br/>
          Email: ${data.email}<br/>
          ${data.phone ? `Tel: ${data.phone}<br/>` : ''}
        </div>
      `
    },
    modern: {
      name: "Moderno",
      isPro: true,
      html: (data: typeof formData) => `
        <table style="font-family: Arial, sans-serif; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px; border-left: 4px solid #4F46E5;">
              <div style="font-size: 18px; font-weight: bold; color: #1F2937; margin-bottom: 8px;">${data.name}</div>
              <div style="font-size: 14px; color: #6B7280; margin-bottom: 4px;">${data.title}</div>
              <div style="font-size: 14px; color: #6B7280; margin-bottom: 12px;">${data.company}</div>
              <div style="font-size: 13px; color: #4B5563;">
                📧 ${data.email}<br/>
                ${data.phone ? `📱 ${data.phone}<br/>` : ''}
                ${data.website ? `🌐 ${data.website}<br/>` : ''}
              </div>
            </td>
          </tr>
        </table>
      `
    },
    professional: {
      name: "Profissional",
      isPro: true,
      html: (data: typeof formData) => `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 0 20px 0 0; vertical-align: top;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
                  ${data.name.charAt(0).toUpperCase()}
                </div>
              </td>
              <td style="vertical-align: top;">
                <div style="font-size: 16px; font-weight: 600; color: #2D3748; margin-bottom: 4px;">${data.name}</div>
                <div style="font-size: 13px; color: #718096; margin-bottom: 2px;">${data.title}</div>
                <div style="font-size: 13px; color: #718096; margin-bottom: 8px;">${data.company}</div>
                <div style="font-size: 12px; color: #4A5568; line-height: 1.4;">
                  ${data.email}<br/>
                  ${data.phone}<br/>
                  ${data.website}
                </div>
              </td>
            </tr>
          </table>
        </div>
      `
    }
  };

  const generateSignature = () => {
    const requiredFields = ['name', 'title', 'company', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (!isPro && template !== 'basic') {
      toast.error("Templates avançados disponíveis apenas na versão PRO");
      return;
    }

    const selectedTemplate = templates[template as keyof typeof templates];
    const generatedSignature = selectedTemplate.html(formData);
    setSignature(generatedSignature);
    toast.success("Assinatura gerada com sucesso!");
  };

  const copySignature = () => {
    if (!signature) return;
    
    // Para versão gratuita, copia apenas texto simples
    if (!isPro) {
      const textSignature = `${formData.name}\n${formData.title}\n${formData.company}\n${formData.email}\n${formData.phone}`;
      navigator.clipboard.writeText(textSignature);
      toast.success("Assinatura em texto copiada!");
      return;
    }

    // Para PRO, copia HTML
    navigator.clipboard.writeText(signature);
    toast.success("Assinatura HTML copiada para a área de transferência!");
  };

  const downloadSignature = () => {
    if (!signature || !isPro) {
      toast.error("Download disponível apenas na versão PRO");
      return;
    }

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Minha Assinatura de Email</title>
      </head>
      <body>
        ${signature}
      </body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assinatura-email.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Assinatura baixada com sucesso!");
  };

  const limitations = [
    "Apenas template básico disponível",
    "Sem personalização de cores",
    "Sem links para redes sociais",
    "Cópia apenas em texto simples"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ProBanner 
        toolName="Gerador de Assinatura de E-mail"
        limitations={limitations}
        isCompleteFree={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Informações Pessoais
              {!isPro && <Badge variant="secondary">Grátis</Badge>}
              {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nome Completo *</label>
              <Input
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Cargo *</label>
              <Input
                placeholder="Seu cargo na empresa"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Empresa *</label>
              <Input
                placeholder="Nome da sua empresa"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">E-mail *</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Telefone</label>
              <Input
                placeholder="(11) 9999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Website {!isPro && <span className="text-gray-500">(PRO)</span>}
              </label>
              <Input
                placeholder="https://www.exemplo.com"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                disabled={!isPro}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Template</label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(templates).map(([key, tmpl]) => (
                    <SelectItem 
                      key={key} 
                      value={key}
                      disabled={tmpl.isPro && !isPro}
                    >
                      {tmpl.name} {tmpl.isPro && !isPro && '(PRO)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateSignature}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Mail className="mr-2 h-4 w-4" />
              Gerar Assinatura
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Prévia da Assinatura</CardTitle>
          </CardHeader>
          <CardContent>
            {signature ? (
              <div className="space-y-4">
                <div 
                  className="border rounded-lg p-4 bg-white min-h-[200px]"
                  dangerouslySetInnerHTML={{ __html: signature }}
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={copySignature}
                    variant="outline" 
                    className="flex-1"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar
                  </Button>
                  <Button 
                    onClick={downloadSignature}
                    variant="outline" 
                    className="flex-1"
                    disabled={!isPro}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {!isPro && <Crown className="mr-1 h-3 w-3" />}
                    Baixar
                  </Button>
                </div>

                {!isPro && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <Crown className="inline h-4 w-4 mr-1" />
                      Versão gratuita copia apenas texto simples. Desbloqueie o PRO para HTML completo!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Preencha os dados e clique em "Gerar Assinatura"</p>
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
                <li>• Template básico</li>
                <li>• Informações essenciais</li>
                <li>• Prévia da assinatura</li>
                <li>• Cópia em texto simples</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                <Crown className="h-4 w-4" />
                Versão PRO
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Templates premium</li>
                <li>• Personalização de cores</li>
                <li>• Links para redes sociais</li>
                <li>• Download em HTML</li>
                <li>• Cópia com formatação completa</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSignatureGenerator;
