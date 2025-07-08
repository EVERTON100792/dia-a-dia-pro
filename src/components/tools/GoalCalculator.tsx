
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Clock, CheckCircle, Download } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";
import { format, addDays, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Goal {
  title: string;
  endDate: string;
  steps: string[];
  timeline?: { step: string; date: string; days: number }[];
}

const GoalCalculator = () => {
  const { isPro } = usePro();
  const [goal, setGoal] = useState<Goal>({ title: "", endDate: "", steps: [] });
  const [stepInput, setStepInput] = useState("");
  const [timeline, setTimeline] = useState<{ step: string; date: string; days: number }[]>([]);

  const addStep = () => {
    if (!stepInput.trim()) return;
    
    if (!isPro && goal.steps.length >= 3) {
      toast.error("Versão gratuita limitada a 3 etapas");
      return;
    }

    setGoal(prev => ({
      ...prev,
      steps: [...prev.steps, stepInput.trim()]
    }));
    setStepInput("");
  };

  const removeStep = (index: number) => {
    setGoal(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const calculateTimeline = () => {
    if (!goal.title.trim() || !goal.endDate || goal.steps.length === 0) {
      toast.error("Preencha todos os campos");
      return;
    }

    const today = new Date();
    const endDate = new Date(goal.endDate);
    const totalDays = differenceInDays(endDate, today);

    if (totalDays <= 0) {
      toast.error("A data de conclusão deve ser futura");
      return;
    }

    const daysPerStep = Math.floor(totalDays / goal.steps.length);
    const newTimeline = goal.steps.map((step, index) => {
      const stepDate = addDays(today, (index + 1) * daysPerStep);
      return {
        step,
        date: format(stepDate, "dd/MM/yyyy", { locale: ptBR }),
        days: (index + 1) * daysPerStep
      };
    });

    setTimeline(newTimeline);
    toast.success("Cronograma calculado com sucesso!");
  };

  const exportTimeline = () => {
    if (!isPro) {
      toast.error("Funcionalidade disponível apenas na versão PRO");
      return;
    }

    const data = {
      objetivo: goal.title,
      dataFinal: goal.endDate,
      cronograma: timeline
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cronograma-${goal.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Cronograma exportado!");
  };

  const clearAll = () => {
    setGoal({ title: "", endDate: "", steps: [] });
    setTimeline([]);
    setStepInput("");
    toast.success("Tudo limpo!");
  };

  const limitations = [
    "Limitado a 3 etapas por meta",
    "Cálculo básico de prazos",
    "Sem exportação de cronograma",
    "Sem lembretes automáticos"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ProBanner 
        toolName="Calculadora de Metas e Prazos"
        limitations={limitations}
        isCompleteFree={false}
      />

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 728x90
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Definir Meta e Prazos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Objetivo Final</label>
            <Input
              placeholder="Ex: Aprender programação"
              value={goal.title}
              onChange={(e) => setGoal(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Data de Conclusão</label>
            <Input
              type="date"
              value={goal.endDate}
              onChange={(e) => setGoal(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Etapas Principais {!isPro && <span className="text-red-500">(máx. 3)</span>}
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Digite uma etapa..."
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addStep()}
              />
              <Button onClick={addStep}>Adicionar</Button>
            </div>
            
            <div className="space-y-2">
              {goal.steps.map((step, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{index + 1}. {step}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStep(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={calculateTimeline} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calcular Cronograma
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Limpar Tudo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Results */}
      {timeline.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Cronograma: {goal.title}
              </CardTitle>
              {isPro && (
                <Button onClick={exportTimeline} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.step}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {item.days} dias
                      </span>
                    </div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-gray-300" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 320x250
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🎯 Como Funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Versão Gratuita</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Até 3 etapas por meta</li>
                <li>• Cálculo básico de prazos</li>
                <li>• Visualização simples</li>
                <li>• Cronograma automático</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Versão PRO 🔒</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Etapas ilimitadas</li>
                <li>• Exportação de cronograma</li>
                <li>• Lembretes automáticos</li>
                <li>• Templates de metas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalCalculator;
