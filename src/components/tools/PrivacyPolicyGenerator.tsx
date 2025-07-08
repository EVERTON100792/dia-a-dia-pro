
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, Crown, Shield, AlertCircle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyData {
  companyName: string;
  cnpj: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  dpoName: string;
  dpoEmail: string;
}

interface DataProcessing {
  collectsPersonalData: boolean;
  collectsSensitiveData: boolean;
  sharesWithThirdParties: boolean;
  usesAnalytics: boolean;
  usesCookies: boolean;
  hasNewsletters: boolean;
  hasEcommerce: boolean;
  hasUserAccounts: boolean;
}

const PrivacyPolicyGenerator = () => {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: "",
    cnpj: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    dpoName: "",
    dpoEmail: ""
  });
  
  const [dataProcessing, setDataProcessing] = useState<DataProcessing>({
    collectsPersonalData: false,
    collectsSensitiveData: false,
    sharesWithThirdParties: false,
    usesAnalytics: false,
    usesCookies: false,
    hasNewsletters: false,
    hasEcommerce: false,
    hasUserAccounts: false
  });

  const [generatedPolicy, setGeneratedPolicy] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isPro] = useState(false); // Simulated PRO status
  const { toast } = useToast();

  const handleCompanyDataChange = (field: keyof CompanyData, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleDataProcessingChange = (field: keyof DataProcessing, checked: boolean) => {
    setDataProcessing(prev => ({ ...prev, [field]: checked }));
  };

  const generateBasicPolicy = () => {
    const sections = [
      `# POLÍTICA DE PRIVACIDADE - ${companyData.companyName.toUpperCase()}`,
      "",
      "**Última atualização:** " + new Date().toLocaleDateString('pt-BR'),
      "",
      "## 1. IDENTIFICAÇÃO DA EMPRESA",
      "",
      `**Razão Social:** ${companyData.companyName}`,
      `**CNPJ:** ${companyData.cnpj}`,
      `**Endereço:** ${companyData.address}`,
      `**E-mail:** ${companyData.email}`,
      `**Telefone:** ${companyData.phone}`,
      `**Website:** ${companyData.website}`,
      "",
      "## 2. DEFINIÇÕES",
      "",
      "- **Dados Pessoais:** informação relacionada a pessoa natural identificada ou identificável;",
      "- **Titular:** pessoa natural a quem se referem os dados pessoais que são objeto de tratamento;",
      "- **Tratamento:** toda operação realizada com dados pessoais;",
      "- **Controlador:** pessoa natural ou jurídica a quem competem as decisões referentes ao tratamento de dados pessoais.",
      "",
      "## 3. DADOS COLETADOS",
      "",
      dataProcessing.collectsPersonalData 
        ? "Coletamos dados pessoais necessários para a prestação de nossos serviços, incluindo nome, e-mail, telefone e outras informações fornecidas voluntariamente."
        : "Nossa empresa não coleta dados pessoais através de nossos canais digitais.",
      "",
      dataProcessing.collectsSensitiveData && isPro
        ? "**DADOS SENSÍVEIS:** Em algumas situações específicas, podemos coletar dados sensíveis com seu consentimento expresso, sempre respeitando as finalidades legítimas."
        : "",
      "",
      "## 4. FINALIDADE DO TRATAMENTO",
      "",
      "Os dados pessoais são tratados para as seguintes finalidades:",
      "- Prestação de serviços solicitados;",
      "- Comunicação com clientes;",
      "- Cumprimento de obrigações legais;",
      dataProcessing.hasNewsletters ? "- Envio de newsletters e comunicações promocionais;" : "",
      dataProcessing.hasEcommerce ? "- Processamento de pedidos e transações;" : "",
      dataProcessing.usesAnalytics ? "- Análise e melhoria de nossos serviços;" : "",
      "",
      "## 5. BASE LEGAL",
      "",
      "O tratamento de dados pessoais observa as seguintes bases legais:",
      "- Consentimento do titular;",
      "- Cumprimento de obrigação legal;",
      "- Execução de contrato;",
      "- Legítimo interesse.",
      "",
      "## 6. COMPARTILHAMENTO DE DADOS",
      "",
      dataProcessing.sharesWithThirdParties
        ? "Seus dados podem ser compartilhados com terceiros parceiros estritamente para as finalidades descritas nesta política, sempre com as devidas proteções contratuais."
        : "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para cumprimento de obrigação legal.",
      "",
      "## 7. DIREITOS DO TITULAR",
      "",
      "Conforme a LGPD, você possui os seguintes direitos:",
      "- Confirmação da existência de tratamento;",
      "- Acesso aos dados;", 
      "- Correção de dados incompletos ou inexatos;",
      "- Anonimização, bloqueio ou eliminação;",
      "- Portabilidade dos dados;",
      "- Eliminação dos dados tratados com consentimento;",
      "- Informação sobre compartilhamento;",
      "- Revogação do consentimento.",
      "",
      isPro ? "## 8. MEDIDAS DE SEGURANÇA" : "",
      isPro ? "" : "",
      isPro ? "Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição não autorizada." : "",
      isPro ? "" : "",
      "## 9. CONTATO",
      "",
      "Para exercer seus direitos ou esclarecer dúvidas sobre esta política:",
      "",
      companyData.dpoName 
        ? `**Encarregado de Dados:** ${companyData.dpoName}`
        : "**Responsável:** " + companyData.companyName,
      `**E-mail:** ${companyData.dpoEmail || companyData.email}`,
      `**Telefone:** ${companyData.phone}`,
      "",
      "---",
      "",
      `Esta Política de Privacidade foi gerada em ${new Date().toLocaleDateString('pt-BR')} e está em conformidade com a Lei Geral de Proteção de Dados (LGPD).`
    ];

    return sections.filter(section => section !== "").join("\n");
  };

  const handleGenerate = () => {
    if (!companyData.companyName || !companyData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos o nome da empresa e e-mail.",
        variant: "destructive",
      });
      return;
    }

    const policy = generateBasicPolicy();
    setGeneratedPolicy(policy);
    setStep(4);

    toast({
      title: "Política gerada com sucesso!",
      description: "Sua política de privacidade está pronta.",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPolicy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Copiado!",
        description: "Política copiada para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
      variant: "destructive",
      });
    }
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedPolicy], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `politica_privacidade_${companyData.companyName.toLowerCase().replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                Gerador de Política de Privacidade (LGPD)
                {!isPro && <Badge variant="secondary">Grátis</Badge>}
                {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
              </CardTitle>
              <CardDescription>
                Crie uma política de privacidade compliant com a LGPD em minutos
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
                  • Cláusulas avançadas • Dados sensíveis • Cookies específicos • Download em PDF • Consultoria legal
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

      {/* Step Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {num}
                </div>
                {num < 4 && <div className={`w-16 h-1 mx-2 ${step > num ? 'bg-blue-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            {step === 1 && "Dados da Empresa"}
            {step === 2 && "Tratamento de Dados"}
            {step === 3 && "Revisão"}
            {step === 4 && "Política Gerada"}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Company Data */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
            <CardDescription>Preencha as informações básicas da sua empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Nome da Empresa *</Label>
                <Input
                  id="companyName"
                  value={companyData.companyName}
                  onChange={(e) => handleCompanyDataChange('companyName', e.target.value)}
                  placeholder="Minha Empresa Ltda"
                />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={companyData.cnpj}
                  onChange={(e) => handleCompanyDataChange('cnpj', e.target.value)}
                  placeholder="00.000.000/0001-00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Endereço Completo</Label>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => handleCompanyDataChange('address', e.target.value)}
                placeholder="Rua, Número, Bairro, Cidade - UF, CEP"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => handleCompanyDataChange('email', e.target.value)}
                  placeholder="contato@empresa.com.br"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => handleCompanyDataChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyData.website}
                onChange={(e) => handleCompanyDataChange('website', e.target.value)}
                placeholder="https://www.empresa.com.br"
              />
            </div>

            {isPro && (
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <Label htmlFor="dpoName">Nome do Encarregado (DPO)</Label>
                  <Input
                    id="dpoName"
                    value={companyData.dpoName}
                    onChange={(e) => handleCompanyDataChange('dpoName', e.target.value)}
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <Label htmlFor="dpoEmail">E-mail do Encarregado</Label>
                  <Input
                    id="dpoEmail"
                    type="email"
                    value={companyData.dpoEmail}
                    onChange={(e) => handleCompanyDataChange('dpoEmail', e.target.value)}
                    placeholder="dpo@empresa.com.br"
                  />
                </div>
              </div>
            )}

            <Button onClick={() => setStep(2)} className="w-full">
              Próximo: Tratamento de Dados
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Data Processing */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Tratamento de Dados</CardTitle>
            <CardDescription>Selecione as atividades que sua empresa realiza</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="collectsPersonalData"
                  checked={dataProcessing.collectsPersonalData}
                  onCheckedChange={(checked) => handleDataProcessingChange('collectsPersonalData', checked as boolean)}
                />
                <Label htmlFor="collectsPersonalData">Coleta dados pessoais (nome, e-mail, telefone, etc.)</Label>
              </div>

              {isPro && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collectsSensitiveData"
                    checked={dataProcessing.collectsSensitiveData}
                    onCheckedChange={(checked) => handleDataProcessingChange('collectsSensitiveData', checked as boolean)}
                  />
                  <Label htmlFor="collectsSensitiveData">Coleta dados sensíveis (CPF, dados de saúde, etc.) - PRO</Label>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sharesWithThirdParties"
                  checked={dataProcessing.sharesWithThirdParties}
                  onCheckedChange={(checked) => handleDataProcessingChange('sharesWithThirdParties', checked as boolean)}
                />
                <Label htmlFor="sharesWithThirdParties">Compartilha dados com terceiros</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usesAnalytics"
                  checked={dataProcessing.usesAnalytics}
                  onCheckedChange={(checked) => handleDataProcessingChange('usesAnalytics', checked as boolean)}
                />
                <Label htmlFor="usesAnalytics">Usa ferramentas de análise (Google Analytics, etc.)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usesCookies"
                  checked={dataProcessing.usesCookies}
                  onCheckedChange={(checked) => handleDataProcessingChange('usesCookies', checked as boolean)}
                />
                <Label htmlFor="usesCookies">Utiliza cookies</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasNewsletters"
                  checked={dataProcessing.hasNewsletters}
                  onCheckedChange={(checked) => handleDataProcessingChange('hasNewsletters', checked as boolean)}
                />
                <Label htmlFor="hasNewsletters">Envia newsletters/e-mail marketing</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasEcommerce"
                  checked={dataProcessing.hasEcommerce}
                  onCheckedChange={(checked) => handleDataProcessingChange('hasEcommerce', checked as boolean)}
                />
                <Label htmlFor="hasEcommerce">Possui e-commerce/vendas online</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasUserAccounts"
                  checked={dataProcessing.hasUserAccounts}
                  onCheckedChange={(checked) => handleDataProcessingChange('hasUserAccounts', checked as boolean)}
                />
                <Label htmlFor="hasUserAccounts">Possui cadastro de usuários</Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Voltar
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                Próximo: Revisão
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Revisão dos Dados</CardTitle>
            <CardDescription>Confira as informações antes de gerar a política</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <strong>Empresa:</strong> {companyData.companyName}
              </div>
              <div>
                <strong>E-mail:</strong> {companyData.email}
              </div>
              {companyData.cnpj && (
                <div>
                  <strong>CNPJ:</strong> {companyData.cnpj}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <strong>Atividades selecionadas:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                {dataProcessing.collectsPersonalData && <li>Coleta dados pessoais</li>}
                {dataProcessing.collectsSensitiveData && <li>Coleta dados sensíveis</li>}
                {dataProcessing.sharesWithThirdParties && <li>Compartilha com terceiros</li>}
                {dataProcessing.usesAnalytics && <li>Usa analytics</li>}
                {dataProcessing.usesCookies && <li>Utiliza cookies</li>}
                {dataProcessing.hasNewsletters && <li>Envia newsletters</li>}
                {dataProcessing.hasEcommerce && <li>E-commerce</li>}
                {dataProcessing.hasUserAccounts && <li>Cadastro de usuários</li>}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Voltar
              </Button>
              <Button onClick={handleGenerate} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                <Shield className="h-4 w-4 mr-2" />
                Gerar Política
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Generated Policy */}
      {step === 4 && generatedPolicy && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Política de Privacidade Gerada
                </CardTitle>
                <CardDescription>
                  Sua política está pronta! Revise e personalize conforme necessário.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button onClick={downloadAsText} variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedPolicy}
              onChange={(e) => setGeneratedPolicy(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Política gerada aparecerá aqui..."
            />

            <div className="mt-4 flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Nova Política
              </Button>
              <Button onClick={downloadAsText} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Baixar Arquivo
              </Button>
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
                  <li>Política básica sem cláusulas avançadas</li>
                  <li>Não inclui tratamento de dados sensíveis</li>
                  <li>Download apenas em formato texto</li>
                  <li>Sem consultoria jurídica personalizada</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legal Disclaimer */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="text-sm text-orange-700">
              <p className="font-medium mb-1">Aviso Legal Importante:</p>
              <p>Esta ferramenta gera um modelo básico de política de privacidade. Recomendamos sempre a revisão por um advogado especializado em proteção de dados para adequação específica ao seu negócio e conformidade total com a LGPD.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyGenerator;
