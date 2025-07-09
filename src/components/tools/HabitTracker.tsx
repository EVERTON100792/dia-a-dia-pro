
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, CheckCircle, XCircle, Crown, Download } from "lucide-react";
import { toast } from "sonner";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";
import { format, subDays, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: string | null;
  completedDates: string[];
}

const HabitTracker = () => {
  const { isPro } = usePro();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState("");

  const maxHabitsForFree = 3;
  const daysToShow = isPro ? 30 : 7;

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  const saveHabits = (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const addHabit = () => {
    if (!newHabitName.trim()) {
      toast.error("Digite o nome do hábito");
      return;
    }

    if (!isPro && habits.length >= maxHabitsForFree) {
      toast.error(`Versão gratuita limitada a ${maxHabitsForFree} hábitos`);
      return;
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      streak: 0,
      lastCompleted: null,
      completedDates: []
    };

    saveHabits([...habits, newHabit]);
    setNewHabitName("");
    toast.success("Hábito adicionado com sucesso!");
  };

  const toggleHabit = (habitId: string, date: string) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const dateIndex = habit.completedDates.indexOf(date);
        let newCompletedDates;
        
        if (dateIndex > -1) {
          // Remove date if already completed
          newCompletedDates = habit.completedDates.filter(d => d !== date);
        } else {
          // Add date if not completed
          newCompletedDates = [...habit.completedDates, date];
        }

        // Calculate streak
        let streak = 0;
        const today = format(new Date(), 'yyyy-MM-dd');
        let currentDate = new Date();
        
        while (newCompletedDates.includes(format(currentDate, 'yyyy-MM-dd'))) {
          streak++;
          currentDate = subDays(currentDate, 1);
        }

        return {
          ...habit,
          completedDates: newCompletedDates,
          streak,
          lastCompleted: newCompletedDates.length > 0 ? Math.max(...newCompletedDates.map(d => new Date(d).getTime())).toString() : null
        };
      }
      return habit;
    });

    saveHabits(updatedHabits);
  };

  const deleteHabit = (habitId: string) => {
    if (!isPro) {
      toast.error("Exclusão de hábitos disponível apenas na versão PRO");
      return;
    }
    
    const updatedHabits = habits.filter(h => h.id !== habitId);
    saveHabits(updatedHabits);
    toast.success("Hábito removido com sucesso!");
  };

  const exportData = () => {
    if (!isPro) {
      toast.error("Exportação disponível apenas na versão PRO");
      return;
    }

    const data = {
      habits,
      exportDate: new Date().toISOString(),
      totalHabits: habits.length
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meus-habitos.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Dados exportados com sucesso!");
  };

  const generateDateRange = () => {
    const dates = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }
    return dates;
  };

  const limitations = [
    "Limitado a 3 hábitos simultâneos",
    "Histórico de apenas 7 dias",
    "Sem exportação de dados",
    "Sem exclusão de hábitos"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ProBanner 
        toolName="Rastreador de Hábitos"
        limitations={limitations}
        isCompleteFree={false}
      />

      {/* Add Habit Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Meus Hábitos
              {!isPro && <Badge variant="secondary">Grátis</Badge>}
              {isPro && <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200"><Crown className="h-3 w-3 mr-1" />PRO</Badge>}
            </CardTitle>
            {isPro && (
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nome do novo hábito..."
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              className="flex-1"
            />
            <Button onClick={addHabit} disabled={!isPro && habits.length >= maxHabitsForFree}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar
            </Button>
          </div>
          
          {!isPro && (
            <p className="text-sm text-gray-600 mb-4">
              Versão gratuita: {habits.length}/{maxHabitsForFree} hábitos utilizados
            </p>
          )}
        </CardContent>
      </Card>

      {/* Habits Grid */}
      {habits.length > 0 ? (
        <div className="space-y-4">
          {habits.map((habit) => (
            <Card key={habit.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{habit.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Sequência atual: {habit.streak} dias</span>
                      <span>Total: {habit.completedDates.length} dias</span>
                    </div>
                  </div>
                  {isPro && (
                    <Button 
                      onClick={() => deleteHabit(habit.id)}
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {generateDateRange().map((date) => {
                    const isCompleted = habit.completedDates.includes(date);
                    const dayNumber = format(new Date(date), 'd', { locale: ptBR });
                    const dayName = format(new Date(date), 'EEE', { locale: ptBR });
                    
                    return (
                      <div key={date} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{dayName}</div>
                        <button
                          onClick={() => toggleHabit(habit.id, date)}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                            isCompleted 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="h-4 w-4" /> : dayNumber}
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                {!isPro && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <Crown className="inline h-4 w-4 mr-1" />
                      Desbloqueie o PRO para ver 30 dias de histórico e mais recursos
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum hábito cadastrado</h3>
            <p className="text-gray-500 mb-4">Comece adicionando seu primeiro hábito</p>
          </CardContent>
        </Card>
      )}

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
                <li>• Até 3 hábitos simultâneos</li>
                <li>• Histórico de 7 dias</li>
                <li>• Contagem de sequência básica</li>
                <li>• Interface simples</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                <Crown className="h-4 w-4" />
                Versão PRO
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hábitos ilimitados</li>
                <li>• Histórico de 30 dias</li>
                <li>• Exclusão de hábitos</li>
                <li>• Exportação de dados</li>
                <li>• Estatísticas avançadas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitTracker;
