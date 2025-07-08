
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  Brain, 
  Zap,
  Plus,
  Trash2,
  Timer,
  Trophy,
  Fire,
  Star
} from "lucide-react";
import { usePro } from "@/contexts/ProContext";
import ProBanner from "@/components/ProBanner";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

interface Habit {
  id: number;
  name: string;
  streak: number;
  completedToday: boolean;
}

const ProductivityDashboard = () => {
  const { isPro } = usePro();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newHabit, setNewHabit] = useState("");
  const [focusTime, setFocusTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('productivity_tasks');
    const savedHabits = localStorage.getItem('productivity_habits');
    
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('productivity_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('productivity_habits', JSON.stringify(habits));
  }, [habits]);

  // Timer Pomodoro
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(time => {
          if (time <= 1) {
            setIsTimerRunning(false);
            // Notificação quando terminar
            if (Notification.permission === 'granted') {
              new Notification('Tempo de foco concluído! 🎉');
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusTime]);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: 'medium',
      category: 'Geral'
    };
    
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;
    
    const habit: Habit = {
      id: Date.now(),
      name: newHabit,
      streak: 0,
      completedToday: false
    };
    
    setHabits([...habits, habit]);
    setNewHabit("");
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completedToday;
        return {
          ...habit,
          completedToday: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  const startFocusTimer = (minutes: number) => {
    setFocusTime(minutes * 60);
    setIsTimerRunning(true);
    
    // Solicitar permissão para notificações
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activeStreaks = habits.filter(h => h.streak > 0).length;

  const limitations = [
    "Máximo 5 tarefas por dia",
    "Apenas 3 hábitos para acompanhar",
    "Timer limitado a 25 minutos",
    "Sem relatórios avançados"
  ];

  return (
    <div className="space-y-6">
      <ProBanner 
        toolName="Dashboard de Produtividade"
        limitations={limitations}
        isCompleteFree={false}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Estatísticas */}
        <Card className="glass-effect animate-float">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completionRate}%</p>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect animate-float" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
                <p className="text-sm text-muted-foreground">Tarefas Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect animate-float" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full">
                <Fire className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeStreaks}</p>
                <p className="text-sm text-muted-foreground">Sequências Ativas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect animate-float" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.max(...habits.map(h => h.streak), 0)}</p>
                <p className="text-sm text-muted-foreground">Melhor Sequência</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timer Pomodoro */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Timer de Foco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4 animate-pulse-glow">
                {formatTime(focusTime)}
              </div>
              <div className="flex gap-2 justify-center mb-4">
                <Button 
                  size="sm" 
                  onClick={() => startFocusTimer(25)}
                  disabled={isTimerRunning || (!isPro && focusTime > 0)}
                >
                  25min
                </Button>
                {isPro && (
                  <>
                    <Button size="sm" onClick={() => startFocusTimer(45)}>45min</Button>
                    <Button size="sm" onClick={() => startFocusTimer(60)}>60min</Button>
                  </>
                )}
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  variant={isTimerRunning ? "destructive" : "default"}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  disabled={focusTime === 0}
                >
                  {isTimerRunning ? "Pausar" : "Iniciar"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { setFocusTime(0); setIsTimerRunning(false); }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarefas */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Tarefas do Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nova tarefa..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                disabled={!isPro && tasks.length >= 5}
              />
              <Button onClick={addTask} disabled={!isPro && tasks.length >= 5}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <Button
                    size="sm"
                    variant={task.completed ? "default" : "outline"}
                    onClick={() => toggleTask(task.id)}
                    className="h-6 w-6 p-0"
                  >
                    {task.completed && <CheckCircle className="h-3 w-3" />}
                  </Button>
                  <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                    {task.text}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTask(task.id)}
                    className="h-6 w-6 p-0 ml-auto"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            
            {!isPro && tasks.length >= 5 && (
              <p className="text-sm text-muted-foreground text-center">
                Limite de 5 tarefas atingido. Upgrade para PRO para tarefas ilimitadas!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Hábitos */}
        <Card className="glass-effect lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Hábitos Diários
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Novo hábito..."
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                disabled={!isPro && habits.length >= 3}
              />
              <Button onClick={addHabit} disabled={!isPro && habits.length >= 3}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits.map((habit) => (
                <Card key={habit.id} className="p-4 cursor-pointer hover:shadow-lg transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{habit.name}</h4>
                      <Badge variant={habit.completedToday ? "default" : "outline"}>
                        {habit.streak} 🔥
                      </Badge>
                    </div>
                    <Button 
                      size="sm"
                      variant={habit.completedToday ? "default" : "outline"}
                      onClick={() => toggleHabit(habit.id)}
                      className="w-full"
                    >
                      {habit.completedToday ? "✓ Feito hoje!" : "Marcar como feito"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {!isPro && habits.length >= 3 && (
              <p className="text-sm text-muted-foreground text-center">
                Limite de 3 hábitos atingido. Upgrade para PRO para hábitos ilimitados!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductivityDashboard;
