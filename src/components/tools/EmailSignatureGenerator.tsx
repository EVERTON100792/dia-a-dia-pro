
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Mail, Phone, Globe, MapPin, Crown, Palette } from "lucide-react";
import { toast } from "sonner";
import { useProContext } from "@/contexts/ProContext";
import ProUnlock from "@/components/ProUnlock";

interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedin: string;
  instagram: string;
  twitter: string;
}

const EmailSignatureGenerator = () => {
  const { isPro } = useProContext();
  const [formData, setFormData] = useState<SignatureData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    linkedin: '',
    instagram: '',
    twitter: ''
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('#2563eb');
  const [generatedSignature, setGeneratedSignature] = useState('');

  const templates = [
    { id: 'modern', name: 'Moderno', free: true },
    { id: 'classic', name: 'Clássico', free: true },
    { id: 'minimal', name: 'Minimalista', free: true },
    { id: 'corporate', name: 'Corporativo', free: false },
    { id: 'creative', name: 'Criativo', free: false },
    { id: 'elegant', name: 'Elegante', free: false }
  ];

  const colors = [
    '#2563eb', '#059669', '#dc2626', '#7c3aed', 
    '#ea580c', '#0891b2', '#be123c', '#4338ca'
  ];

  const handleInputChange = (field: keyof SignatureData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSignature = () => {
    if (!formData.name || !formData.email) {
      toast.error("Nome e email são obrigatórios.");
      return;
    }

    const signature = createSignatureHTML();
    setGeneratedSignature(signature);
    toast.success("Assinatura gerada com sucesso!");
  };

  const createSignatureHTML = (): string => {
    const color = isPro ? selectedColor : '#2563eb';
    
    if (selectedTemplate === 'modern') {
      return `
<div style="font-family: Arial, sans-serif; max-width: 500px;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 20px; vertical-align: top;">
        <div style="width: 4px; height: 60px; background-color: ${color}; border-radius: 2px;"></div>
      </td>
      <td style="vertical-align: top;">
        <div style="color: #333; font-size: 18px; font-weight: bold; margin-bottom: 4px;">
          ${formData.name}
        </div>
        ${formData.title ? `<div style="color: ${color}; font-size: 14px; margin-bottom: 8px;">${formData.title}</div>` : ''}
        ${formData.company ? `<div style="color: #666; font-size: 14px; margin-bottom: 12px;">${formData.company}</div>` : ''}
        
        <div style="font-size: 12px; color: #666;">
          ${formData.email ? `<div style="margin-bottom: 4px;"><span style="color: ${color};">✉</span> ${formData.email}</div>` : ''}
          ${formData.phone ? `<div style="margin-bottom: 4px;"><span style="color: ${color};">📞</span> ${formData.phone}</div>` : ''}
          ${formData.website ? `<div style="margin-bottom: 4px;"><span style="color: ${color};">🌐</span> ${formData.website}</div>` : ''}
          ${formData.address ? `<div><span style="color: ${color};">📍</span> ${formData.address}</div>` : ''}
        </div>
      </td>
    </tr>
  </table>
</div>`;
    }

    if (selectedTemplate === 'classic') {
      return `
<div style="font-family: Times New Roman, serif; max-width: 500px;">
  <div style="border-top: 2px solid ${color}; padding-top: 15px;">
    <div style="color: #333; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
      ${formData.name}
    </div>
    ${formData.title ? `<div style="color: #666; font-size: 14px; font-style: italic; margin-bottom: 5px;">${formData.title}</div>` : ''}
    ${formData.company ? `<div style="color: #333; font-size: 14px; margin-bottom: 10px;">${formData.company}</div>` : ''}
    
    <div style="font-size: 12px; color: #666; line-height: 1.4;">
      ${formData.email ? `Email: ${formData.email}<br>` : ''}
      ${formData.phone ? `Telefone: ${formData.phone}<br>` : ''}
      ${formData.website ? `Website: ${formData.website}<br>` : ''}
      ${formData.address ? `Endereço: ${formData.address}` : ''}
    </div>
  </div>
</div>`;
    }

    // Template mínimo
    return `
<div style="font-family: Arial, sans-serif; font-size: 12px; color: #333;">
  <div style="font-weight: bold; margin-bottom: 2px;">${formData.name}</div>
  ${formData.title ? `<div style="margin-bottom: 2px;">${formData.title}</div>` : ''}
  ${formData.company ? `<div style="margin-bottom: 8px;">${formData.company}</div>` : ''}
  <div>
    ${formData.email ? `${formData.email} | ` : ''}
    ${formData.phone ? `${formData.phone}` : ''}
  </div>
</div>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSignature);
    toast.success("Assinatura copiada para a área de transferência!");
  };

  const downloadHTML = () => {
    if (!isPro) {
      toast.error("Recurso disponível apenas para usuários PRO");
      return;
    }
    
    const blob = new Blob([generatedSignature], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assinatura_email.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Arquivo HTML baixado com sucesso!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gerador de Assinatura de E-mail
        </h1>
        <p className="text-xl text-gray-600">
          Crie assinaturas profissionais em minutos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Preencha seus dados para gerar a assinatura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Cargo</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Seu cargo"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="www.seusite.com"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Cidade, Estado"
                  />
                </div>
              </div>

              {isPro && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Redes Sociais (PRO)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="linkedin.com/in/usuario"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="@usuario"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        placeholder="@usuario"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Personalização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem 
                        key={template.id} 
                        value={template.id}
                        disabled={!template.free && !isPro}
                      >
                        {template.name}
                        {!template.free && !isPro && <Crown className="ml-2 h-3 w-3" />}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isPro && (
                <div>
                  <Label className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Cor Principal (PRO)
                  </Label>
                  <div className="flex gap-2 mt-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color ? 'border-gray-400' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={generateSignature} className="w-full">
                Gerar Assinatura
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visualização</CardTitle>
              <CardDescription>
                Preview da sua assinatura de e-mail
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedSignature ? (
                <div className="space-y-4">
                  <div 
                    className="border rounded-lg p-4 bg-white"
                    dangerouslySetInnerHTML={{ __html: generatedSignature }}
                  />
                  
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar HTML
                    </Button>
                    <Button 
                      onClick={downloadHTML} 
                      variant="outline" 
                      className="flex-1"
                      disabled={!isPro}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {!isPro && <Crown className="mr-1 h-3 w-3" />}
                      Baixar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Preencha os dados e clique em "Gerar Assinatura" para ver o preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          {!isPro && (
            <ProUnlock feature="templates premium, personalização de cores, redes sociais e download em HTML" />
          )}
        </div>
      </div>

      {/* Features Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recursos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">✓ Versão Gratuita</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 3 templates básicos</li>
                <li>• Informações essenciais</li>
                <li>• Cópia do código HTML</li>
                <li>• Preview em tempo real</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                <Crown className="h-4 w-4" />
                Versão PRO
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 6 templates profissionais</li>
                <li>• Personalização de cores</li>
                <li>• Links para redes sociais</li>
                <li>• Download em HTML</li>
                <li>• Suporte prioritário</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSignatureGenerator;
