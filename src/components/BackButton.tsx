
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Se estiver na página inicial, não mostrar o botão
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 flex gap-2">
      <Button
        onClick={() => navigate(-1)}
        variant="outline"
        size="lg"
        className="glass-effect border-purple-300 hover:border-purple-500 text-purple-600 hover:text-purple-700 animate-pulse-glow"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Voltar
      </Button>
      
      <Button
        onClick={() => navigate('/')}
        variant="outline"
        size="lg"
        className="glass-effect border-purple-300 hover:border-purple-500 text-purple-600 hover:text-purple-700 animate-pulse-glow"
      >
        <Home className="h-5 w-5 mr-2" />
        Início
      </Button>
    </div>
  );
};

export default BackButton;
