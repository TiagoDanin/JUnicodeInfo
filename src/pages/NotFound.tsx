
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-xl p-8 md:p-12 max-w-lg mx-auto text-center animate-float">
        <h1 className="text-6xl font-bold text-white mb-6">404</h1>
        <p className="text-xl text-white/80 mb-8">
          Oops! The page you're looking for doesn't exist in this Unicode galaxy.
        </p>
        <Button 
          asChild
          className="bg-unicode-blue hover:bg-unicode-darkblue text-white text-lg px-8 py-6 animate-pulse-slow"
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
