
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Target, TrendingUp, Award, Bell, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Habit {
  id: string;
  name: string;
  description: string;
  daysOfWeek: number[]; // 0-6 (domingo-sábado)
  color: string;
  streak: number;
  completedDates: string[];
  createdAt: string;
}

const HabitTracker = () => {
  const { isPro } = usePro();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    daysOfWeek: [] as number[],
    color: "#3B82F6"
  });

  const weekDays = [
    { name: "Dom", value: 0 },
    { name: "Seg", value: 1 },
    { name: "Ter", value: 2 },
    { name: "Qua", value: 3 },
    { name: "Qui", value: 4 },
    { name: "Sex", value: 5 },
    { name: "Sáb", value: 6 }
  ];

  const colors = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", 
    "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16"
  ];

  useEffect(() => {
    const savedHabits = localStorage.getItem('habit-tracker-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habit-tracker-habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabit.name.trim()) {
      toast.error("Digite o nome do hábito");
      return;
    }

    if (newHabit.daysOfWeek.length === 0) {
      toast.error("Selecione pelo menos um dia da semana");
      return;
    }

    if (!isPro && habits.length >= 3) {
      toast.error("Versão gratuita limitada a 3 hábitos");
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      daysOfWeek: newHabit.daysOfWeek,
      color: newHabit.color,
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString()
    };

    setHabits(prev => [...prev, habit]);
    setNewHabit({ name: "", description: "", daysOfWeek: [], color: "#3B82F6" });
    setShowAddForm(false);
    toast.success("Hábito adicionado com sucesso!");
  };

  const toggleDay = (day: number) => {
    setNewHabit(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day]
    }));
  };

  const markHabitComplete = (habitId: string, date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(dateStr);
        
        if (isCompleted) {
          // Remover conclusão
          return {
            ...habit,
            completedDates: habit.completedDates.filter(d => d !== dateStr),
            streak: Math.max(0, habit.streak - 1)
          };
        } else {
          // Adicionar conclusão
          const newCompletedDates = [...habit.completedDates, dateStr];
          return {
            ...habit,
            completedDates: newCompletedDates,
            streak: habit.streak + 1
          };
        }
      }
      return habit;
    }));

    toast.success("Progresso atualizado!");
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    toast.success("Hábito removido!");
  };

  const getCurrentWeekDays = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  };

  const getHabitCompletionRate = (habit: Habit) => {
    const totalDays = habit.daysOfWeek.length * 4; // 4 semanas
    const completedDays = habit.completedDates.length;
    return Math.round((completedDays / totalDays) * 100);
  };

  const setReminder = (habitId: string) => {
    if (!isPro) {
      toast.error("Lembretes disponíveis apenas na versão PRO");
      return;
    }
    toast.success("Lembrete configurado!");
  };

  const currentWeekDays = getCurrentWeekDays();

  const limitations = [
    "Limitado a 3 hábitos",
    "Sem lembretes automáticos",
    "Sem relatórios detalhados",
    "Sem exportação de dados"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ProBanner 
        toolName="Gerador de Hábitos"
        limitations={limitations}
        isCompleteFree={false}
      />

      {/* Ad Space Placeholder */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-300">
        📢 Espaço para Anúncio AdSense - 728x90
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Meus Hábitos {!isPro && <span className="text-sm text-red-500">(máx. 3)</span>}
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Novo Hábito
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Add Habit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Criar Novo Hábito</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nome do Hábito</label>
              <Input
                placeholder="Ex: Fazer exercícios"
                value={newHabit.name}
                onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Descrição (opcional)</label>
              <Textarea
                placeholder="Detalhes sobre o hábito..."
                value={newHabit.description}
                onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Dias da Semana</label>
              <div className="flex gap-2 flex-wrap">
                {weekDays.map(day => (
                  <Button
                    key={day.value}
                    variant={newHabit.daysOfWeek.includes(day.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDay(day.value)}
                  >
                    {day.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Cor</label>
              <div className="flex gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      newHabit.color === color ? "border-gray-800" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewHabit(prev => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={addHabit}>Criar Hábito</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Habits List */}
      {habits.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Nenhum hábito criado ainda</p>
            <Button onClick={() => setShowAddForm(true)}>
              Criar Primeiro Hábito
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {habits.map(habit => (
            <Card key={habit.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: habit.color }}
                    />
                    <div>
                      <h3 className="font-semibold">{habit.name}</h3>
                      {habit.description && (
                        <p className="text-sm text-gray-600">{habit.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {habit.streak} dias
                    </Badge>
                    {isPro && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReminder(habit.id)}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Weekly Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Esta Semana</span>
                    <span className="text-sm text-gray-600">
                      {getHabitCompletionRate(habit)}% concluído
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {currentWeekDays.map((date, index) => {
                      const dayOfWeek = date.getDay();
                      const isHabitDay = habit.daysOfWeek.includes(dayOfWeek);
                      const dateStr = format(date, "yyyy-MM-dd");
                      const isCompleted = habit.completedDates.includes(dateStr);
                      const isToday = isSameDay(date, new Date());
                      
                      return (
                        <div key={index} className="text-center">
                          <div className="text-xs text-gray-500 mb-1">
                            {format(date, "EEE", { locale: ptBR })}
                          </div>
                          <button
                            onClick={() => isHabitDay && markHabitComplete(habit.id, date)}
                            disabled={!isHabitDay}
                            className={`w-8 h-8 rounded border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                              !isHabitDay
                                ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                                : isCompleted
                                ? "border-green-500 bg-green-500 text-white"
                                : isToday
                                ? "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100"
                                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                          >
                            {isCompleted && "✓"}
                            {!isCompleted && isToday && isHabitDay && "!"}
                          </button>
                          <div className="text-xs text-gray-400 mt-1">
                            {format(date, "dd")}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 border border-gray-300 rounded"></div>
                      <span>Pendente</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Concluído</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 rounded"></div>
                      <span>Não aplicável</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
                <li>• Até 3 hábitos</li>
                <li>• Acompanhamento semanal</li>
                <li>• Contador de sequência</li>
                <li>• Cores personalizadas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Versão PRO 🔒</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Hábitos ilimitados</li>
                <li>• Lembretes automáticos</li>
                <li>• Relatórios detalhados</li>
                <li>• Exportação de dados</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitTracker;
