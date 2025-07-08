
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Mail, Phone, Globe, MapPin, Crown, Palette } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

const EmailSignatureGenerator = () => {
  const { isPro } = usePro();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    linkedIn: '',
    twitter: '',
    instagram: ''
  });

  const [design, setDesign] = useState({
    template: 'modern',
    color: '#2563eb',
    fontSize: 'medium',
    includePhoto: false,
    photoUrl: ''
  });

  const [generatedSignature, setGeneratedSignature] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDesignChange = (field: string, value: string | boolean) => {
    if (!isPro && field !== 'template') {
      toast.error("Personalização de design disponível apenas na versão PRO");
      return;
    }
    
    setDesign(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const templates = {
    modern: {
      name: 'Moderno',
      preview: 'Design limpo e profissional'
    },
    classic: {
      name: 'Clássico',
      preview: 'Estilo tradicional e elegante'
    },
    minimal: {
      name: 'Minimalista',
      preview: 'Design simples e focado'
    },
    creative: {
      name: 'Criativo',
      preview: 'Visual diferenciado e moderno'
    }
  };

  const generateSignature = () => {
    if (!formData.name || !formData.email) {
      toast.error("Nome e email são obrigatórios");
      return;
    }

    const colorStyle = isPro ? design.color : '#2563eb';
    const fontSize = isPro ? design.fontSize : 'medium';
    
    let signature = '';
    
    if (design.template === 'modern') {
      signature = `
<div style="font-family: Arial, sans-serif; font-size: ${fontSize === 'small' ? '12px' : fontSize === 'large' ? '16px' : '14px'}; color: #333;">
  <div style="border-left: 3px solid ${colorStyle}; padding-left: 15px;">
    <div style="font-weight: bold; font-size: ${fontSize === 'small' ? '16px' : fontSize === 'large' ? '20px' : '18px'}; color: ${colorStyle};">
      ${formData.name}
    </div>
    ${formData.title ? `<div style="color: #666; margin: 2px 0;">${formData.title}</div>` : ''}
    ${formData.company ? `<div style="font-weight: 600; color: ${colorStyle};">${formData.company}</div>` : ''}
    <div style="margin-top: 8px;">
      ${formData.email ? `<div style="margin: 2px 0;"><span style="color: ${colorStyle};">✉</span> ${formData.email}</div>` : ''}
      ${formData.phone ? `<div style="margin: 2px 0;"><span style="color: ${colorStyle};">📞</span> ${formData.phone}</div>` : ''}
      ${formData.website ? `<div style="margin: 2px 0;"><span style="color: ${colorStyle};">🌐</span> ${formData.website}</div>` : ''}
      ${formData.address ? `<div style="margin: 2px 0;"><span style="color: ${colorStyle};">📍</span> ${formData.address}</div>` : ''}
    </div>
  </div>
</div>
      `.trim();
    } else {
      // Template básico para usuários não-PRO
      signature = `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <div style="font-weight: bold; font-size: 18px; color: #2563eb;">
    ${formData.name}
  </div>
  ${formData.title ? `<div style="color: #666;">${formData.title}</div>` : ''}
  ${formData.company ? `<div style="font-weight: 600;">${formData.company}</div>` : ''}
  <div style="margin-top: 5px;">
    ${formData.email ? `<div>Email: ${formData.email}</div>` : ''}
    ${formData.phone ? `<div>Telefone: ${formData.phone}</div>` : ''}
    ${formData.website ? `<div>Website: ${formData.website}</div>` : ''}
  </div>
</div>
      `.trim();
    }

    setGeneratedSignature(signature);
    toast.success("Assinatura gerada com sucesso!");
  };

  const copySignature = () => {
    if (!generatedSignature) {
      toast.error("Gere uma assinatura primeiro");
      return;
    }
    
    navigator.clipboard.writeText(generatedSignature);
    toast.success("Assinatura copiada para área de transferência!");
  };

  const downloadSignature = () => {
    if (!isPro) {
      toast.error("Download disponível apenas na versão PRO");
      return;
    }

    const blob = new Blob([generatedSignature], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assinatura_email.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Assinatura baixada com sucesso!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gerador de Assinatura de E-mail
        </h1>
        <p className="text-xl text-gray-600">
          Crie assinaturas profissionais para seus e-mails
        </p>
      </div>

      {!isPro && (
        <div className="mb-6">
          <ProBanner 
            toolName="Gerador de Assinatura"
            limitations={[
              "Apenas template básico disponível",
              "Não é possível personalizar cores",
              "Não é possível baixar em HTML"
            ]}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Cargo</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Desenvolvedor Frontend"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Tech Solutions Ltda"
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
                    placeholder="joao@empresa.com"
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

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.empresa.com"
                />
              </div>

              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="São Paulo, SP - Brasil"
                />
              </div>
            </CardContent>
          </Card>

          {/* Design Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Personalização
                {!isPro && <Crown className="h-4 w-4 text-amber-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Template</Label>
                <Select 
                  value={design.template} 
                  onValueChange={(value) => handleDesignChange('template', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(templates).map(([key, template]) => (
                      <SelectItem key={key} value={key}>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.preview}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cor Principal</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={design.color}
                      onChange={(e) => handleDesignChange('color', e.target.value)}
                      disabled={!isPro}
                      className="w-16 h-10"
                    />
                    {!isPro && <Crown className="h-4 w-4 text-amber-500" />}
                  </div>
                </div>
                <div>
                  <Label>Tamanho da Fonte</Label>
                  <Select 
                    value={design.fontSize} 
                    onValueChange={(value) => handleDesignChange('fontSize', value)}
                    disabled={!isPro}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequena</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

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
              <CardTitle>Preview da Assinatura</CardTitle>
              <CardDescription>
                Visualize como sua assinatura ficará no e-mail
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
                    <Button onClick={copySignature} variant="outline" className="flex-1">
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar HTML
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
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Preencha os campos e clique em "Gerar Assinatura" para ver o preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Como Usar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs">1</Badge>
                <p>Preencha suas informações pessoais e profissionais</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs">2</Badge>
                <p>Escolha o template e personalize o design {!isPro && "(PRO)"}</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs">3</Badge>
                <p>Clique em "Gerar Assinatura" para criar o código HTML</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs">4</Badge>
                <p>Copie o código e cole nas configurações do seu cliente de e-mail</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailSignatureGenerator;
