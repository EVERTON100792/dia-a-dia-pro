
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, Download, Crown, Users, DollarSign, FileText, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalculationResults {
  clt: {
    grossSalary: number;
    inss: number;
    irrf: number;
    fgts: number;
    totalEmployerCosts: number;
    netSalary: number;
    annualCost: number;
  };
  pj: {
    grossValue: number;
    iss: number;
    irpj: number;
    csll: number;
    cofins: number;
    pis: number;
    totalTaxes: number;
    netValue: number;
    annualCost: number;
  };
  comparison: {
    savings: number;
    savingsPercentage: number;
    recommendation: string;
  };
}

const HiringCalculator = () => {
  const [salary, setSalary] = useState("");
  const [benefits, setBenefits] = useState("");
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isPro] = useState(false); // Simulated PRO status
  const { toast } = useToast();

  const calculateCLT = (grossSalary: number, benefitsValue: number) => {
    // INSS calculation (2024 rates)
    let inss = 0;
    if (grossSalary <= 1412.00) {
      inss = grossSalary * 0.075;
    } else if (grossSalary <= 2666.68) {
      inss = 105.90 + (grossSalary - 1412.00) * 0.09;
    } else if (grossSalary <= 4000.03) {
      inss = 105.90 + 112.94 + (grossSalary - 2666.68) * 0.12;
    } else if (grossSalary <= 7786.02) {
      inss = 105.90 + 112.94 + 160.00 + (grossSalary - 4000.03) * 0.14;
    } else {
      inss = 908.85; // Maximum INSS
    }

    // IRRF calculation (simplified)
    const inssDeducted = grossSalary - inss;
    let irrf = 0;
    if (inssDeducted > 2259.20 && inssDeducted <= 2826.65) {
      irrf = inssDeducted * 0.075 - 169.44;
    } else if (inssDeducted > 2826.65 && inssDeducted <= 3751.05) {
      irrf = inssDeducted * 0.15 - 381.44;
    } else if (inssDeducted > 3751.05 && inssDeducted <= 4664.68) {
      irrf = inssDeducted * 0.225 - 662.77;
    } else if (inssDeducted > 4664.68) {
      irrf = inssDeducted * 0.275 - 896.00;
    }

    // FGTS (employer cost)
    const fgts = grossSalary * 0.08;

    // Additional employer costs (approximate)
    const additionalCosts = grossSalary * 0.2675; // INSS patronal, FGTS, férias, 13º, etc.

    const totalEmployerCosts = grossSalary + additionalCosts + benefitsValue + fgts;
    const netSalary = grossSalary - inss - irrf;
    const annualCost = totalEmployerCosts * 13.33; // 12 months + vacations + 13th salary proportional

    return {
      grossSalary,
      inss,
      irrf,
      fgts,
      totalEmployerCosts,
      netSalary,
      annualCost
    };
  };

  const calculatePJ = (grossValue: number) => {
    // Simples Nacional rates (approximate average)
    const iss = grossValue * 0.02; // ISS (varies by city)
    const irpj = grossValue * 0.048; // IRPJ + CSLL simplified
    const csll = grossValue * 0.0288;
    const cofins = grossValue * 0.0076;
    const pis = grossValue * 0.0165;

    const totalTaxes = iss + irpj + csll + cofins + pis;
    const netValue = grossValue - totalTaxes;
    const annualCost = grossValue * 12;

    return {
      grossValue,
      iss,
      irpj,
      csll,
      cofins,
      pis,
      totalTaxes,
      netValue,
      annualCost
    };
  };

  const handleCalculate = () => {
    const salaryValue = parseFloat(salary.replace(/[^\d,]/g, '').replace(',', '.'));
    const benefitsValue = parseFloat(benefits.replace(/[^\d,]/g, '').replace(',', '.')) || 0;

    if (!salaryValue || salaryValue <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um salário/valor válido.",
        variant: "destructive",
      });
      return;
    }

    const clt = calculateCLT(salaryValue, benefitsValue);
    const pj = calculatePJ(salaryValue * 1.3); // Assuming 30% higher for PJ to compensate benefits

    const savings = clt.annualCost - pj.annualCost;
    const savingsPercentage = (savings / clt.annualCost) * 100;

    let recommendation = "";
    if (savingsPercentage > 15) {
      recommendation = "PJ apresenta economia significativa. Considere esta modalidade.";
    } else if (savingsPercentage > 5) {
      recommendation = "PJ apresenta economia moderada. Avalie outros fatores como estabilidade.";
    } else if (savingsPercentage > -5) {
      recommendation = "Custos similares. CLT oferece mais segurança e benefícios.";
    } else {
      recommendation = "CLT é mais vantajoso financeiramente neste caso.";
    }

    const calculationResults: CalculationResults = {
      clt,
      pj,
      comparison: {
        savings,
        savingsPercentage,
        recommendation
      }
    };

    setResults(calculationResults);

    toast({
      title: "Cálculo realizado!",
      description: "Confira os resultados abaixo.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const generateReport = () => {
    if (!results) return;

    const reportContent = `
RELATÓRIO DE ANÁLISE: CLT vs PJ
Gerado em: ${new Date().toLocaleDateString('pt-BR')}

DADOS DE ENTRADA:
- Salário/Valor Base: ${formatCurrency(parseFloat(salary.replace(/[^\d,]/g, '').replace(',', '.')))}
- Benefícios: ${formatCurrency(parseFloat(benefits.replace(/[^\d,]/g, '').replace(',', '.')) || 0)}

MODALIDADE CLT:
- Salário Bruto: ${formatCurrency(results.clt.grossSalary)}
- INSS: ${formatCurrency(results.clt.inss)}
- IRRF: ${formatCurrency(results.clt.irrf)}
- Salário Líquido: ${formatCurrency(results.clt.netSalary)}
- Custo Total Empresa: ${formatCurrency(results.clt.totalEmployerCosts)}
- Custo Anual: ${formatCurrency(results.clt.annualCost)}

MODALIDADE PJ:
- Valor Bruto: ${formatCurrency(results.pj.grossValue)}
- Impostos Totais: ${formatCurrency(results.pj.totalTaxes)}
- Valor Líquido: ${formatCurrency(results.pj.netValue)}
- Custo Anual: ${formatCurrency(results.pj.annualCost)}

COMPARAÇÃO:
- Diferença Anual: ${formatCurrency(Math.abs(results.comparison.savings))}
- Economia/Perda: ${results.comparison.savingsPercentage.toFixed(1)}%
- Recomendação: ${results.comparison.recommendation}

IMPORTANTE: Este cálculo é uma estimativa. Consulte sempre um contador para análise precisa.
    `;

    const element = document.createElement("a");
    const file = new Blob([reportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `relatorio_clt_vs_pj_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Relatório baixado!",
      description: "O arquivo foi salvo em sua pasta de downloads.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white">
              <Calculator className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                Calculadora CLT vs PJ
                {!isPro && <Badge variant="secondary">Grátis</Badge>}
                {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
              </CardTitle>
              <CardDescription>
                Compare os custos de contratação CLT vs Pessoa Jurídica
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
                  • Relatório em PDF profissional • Gráficos comparativos • Análise de cenários • Cálculos avançados
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

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Dados Para Cálculo
          </CardTitle>
          <CardDescription>
            Informe o salário/valor desejado e benefícios para comparar as modalidades
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary">Salário/Valor Mensal (R$) *</Label>
              <Input
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="5.000,00"
              />
              <p className="text-xs text-gray-500 mt-1">Valor base para comparação</p>
            </div>
            <div>
              <Label htmlFor="benefits">Benefícios Mensais (R$)</Label>
              <Input
                id="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="500,00"
              />
              <p className="text-xs text-gray-500 mt-1">VR, VT, plano de saúde, etc.</p>
            </div>
          </div>

          <Button 
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calcular Comparação
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Comparison Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Resumo da Comparação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.clt.annualCost)}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">Custo Anual CLT</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.pj.annualCost)}
                  </div>
                  <div className="text-sm text-green-600 font-medium">Custo Anual PJ</div>
                </div>
                <div className={`p-4 rounded-lg ${results.comparison.savings > 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <div className={`text-2xl font-bold ${results.comparison.savings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {results.comparison.savingsPercentage > 0 ? '+' : ''}{results.comparison.savingsPercentage.toFixed(1)}%
                  </div>
                  <div className={`text-sm font-medium ${results.comparison.savings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {results.comparison.savings > 0 ? 'Economia PJ' : 'Economia CLT'}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Recomendação:</h4>
                <p className="text-gray-700">{results.comparison.recommendation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* CLT Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Detalhamento CLT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Salário Bruto:</span>
                  <span className="font-medium">{formatCurrency(results.clt.grossSalary)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>(-) INSS:</span>
                  <span>-{formatCurrency(results.clt.inss)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>(-) IRRF:</span>
                  <span>-{formatCurrency(results.clt.irrf)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Salário Líquido:</span>
                  <span className="text-green-600">{formatCurrency(results.clt.netSalary)}</span>
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>FGTS (empresa):</span>
                    <span>{formatCurrency(results.clt.fgts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Encargos totais:</span>
                    <span>{formatCurrency(results.clt.totalEmployerCosts - results.clt.grossSalary)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Custo Total Mensal:</span>
                  <span className="text-blue-600">{formatCurrency(results.clt.totalEmployerCosts)}</span>
                </div>
              </CardContent>
            </Card>

            {/* PJ Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Detalhamento PJ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Valor Bruto:</span>
                  <span className="font-medium">{formatCurrency(results.pj.grossValue)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>(-) ISS:</span>
                  <span>-{formatCurrency(results.pj.iss)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>(-) IRPJ/CSLL:</span>
                  <span>-{formatCurrency(results.pj.irpj + results.pj.csll)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>(-) PIS/COFINS:</span>
                  <span>-{formatCurrency(results.pj.pis + results.pj.cofins)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Valor Líquido:</span>
                  <span className="text-green-600">{formatCurrency(results.pj.netValue)}</span>
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total de impostos:</span>
                    <span>{formatCurrency(results.pj.totalTaxes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa efetiva:</span>
                    <span>{((results.pj.totalTaxes / results.pj.grossValue) * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Custo Total Mensal:</span>
                  <span className="text-green-600">{formatCurrency(results.pj.grossValue)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Button onClick={generateReport} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Relatório
                </Button>
                {isPro && (
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar PDF Profissional
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Important Notes */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm text-orange-700">
            <h4 className="font-medium text-orange-800">Observações Importantes:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Os cálculos são estimativas baseadas em alíquotas médias</li>
              <li>Para PJ, consideramos Simples Nacional com tributação aproximada</li>
              <li>CLT inclui encargos patronais, férias, 13º salário e FGTS</li>
              <li>Consulte sempre um contador para análise precisa</li>
              <li>Considere outros fatores: estabilidade, benefícios, aposentadoria</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HiringCalculator;
