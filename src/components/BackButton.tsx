
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
    <div className="fixed top-2 sm:top-4 left-2 sm:left-4 z-50 flex gap-1 sm:gap-2">
      <Button
        onClick={() => navigate(-1)}
        variant="outline"
        size="sm"
        className="glass-effect border-purple-300 hover:border-purple-500 text-purple-600 hover:text-purple-700 animate-pulse-glow px-2 sm:px-4 text-xs sm:text-sm"
      >
        <ArrowLeft className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
        <span className="hidden xs:inline">Voltar</span>
      </Button>
      
      <Button
        onClick={() => navigate('/')}
        variant="outline"
        size="sm"
        className="glass-effect border-purple-300 hover:border-purple-500 text-purple-600 hover:text-purple-700 animate-pulse-glow px-2 sm:px-4 text-xs sm:text-sm"
      >
        <Home className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
        <span className="hidden xs:inline">Início</span>
      </Button>
    </div>
  );
};

export default BackButton;
