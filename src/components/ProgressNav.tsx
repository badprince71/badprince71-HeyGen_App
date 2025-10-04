import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Check, Palette, Type, Image, Video, User, Film } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const steps = [
  { name: "Character", path: "/mascots", icon: Palette },
  { name: "Script", path: "/text", icon: Type },
  { name: "Stage", path: "/background", icon: Image },
  { name: "Video", path: "/video", icon: Video },
];

export function ProgressNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = steps.findIndex(step => step.path === location.pathname);

  const handleStepClick = (path: string, index: number) => {
    if (index <= currentIndex) {
      navigate(path);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-background border-b border-border/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-secondary animate-glow-pulse" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EstiMascot
              </span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none group">
                  <Avatar className="w-8 h-8 border-2 border-primary/20 transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-[var(--shadow-elegant)] cursor-pointer">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 w-44 mt-2 bg-card border shadow-lg rounded-xl p-2">
                <DropdownMenuItem asChild className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-center gap-2"
                    onClick={() => navigate('/myprofile')}
                    aria-label="Open your profile"
                  >
                    <User className="w-4 h-4" />
                    Your Profile
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-center gap-2"
                    onClick={() => navigate('/myvideo')}
                    aria-label="Open your video"
                  >
                    <Film className="w-4 h-4" />
                    Your Video
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Progress Tabs Section */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/20 overflow-x-auto">
        <div className="container mx-auto px-2 sm:px-6 py-0">
          <div className="flex items-center justify-start sm:justify-center gap-0 min-w-max sm:min-w-0">
            {steps.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const Icon = step.icon;
              
              return (
                <div key={step.path} className="flex items-center">
                  <button
                    onClick={() => handleStepClick(step.path, index)}
                    disabled={index > currentIndex}
                    className={cn(
                      "flex flex-col items-center gap-2 sm:gap-2.5 transition-all p-2 sm:p-[15px]",
                      (isCompleted || isCurrent) && "cursor-pointer",
                      index > currentIndex && "cursor-not-allowed opacity-40"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                        isCompleted && "bg-primary border-primary text-primary-foreground",
                        isCurrent && "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_hsl(190_100%_55%_/_0.4)]",
                        !isCompleted && !isCurrent && "bg-background border-border text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                      ) : (
                        <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
                        (isCompleted || isCurrent) && "text-foreground",
                        !isCompleted && !isCurrent && "text-muted-foreground"
                      )}
                    >
                      {step.name}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-8 sm:w-16 h-0.5 mb-3 sm:mb-5 transition-colors flex-shrink-0",
                        isCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
