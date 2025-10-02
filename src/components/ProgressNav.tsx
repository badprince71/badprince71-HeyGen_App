import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Check, Palette, Type, Image, Video } from "lucide-react";

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
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary animate-glow-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EstiMascot
            </span>
          </div>
        </div>
      </header>

      {/* Progress Tabs Section */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-6 py-0">
          <div className="flex items-center justify-center gap-0">
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
                      "flex flex-col items-center gap-2.5 transition-all p-[15px]",
                      (isCompleted || isCurrent) && "cursor-pointer",
                      index > currentIndex && "cursor-not-allowed opacity-40"
                    )}
                  >
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                        isCompleted && "bg-primary border-primary text-primary-foreground",
                        isCurrent && "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_hsl(190_100%_55%_/_0.4)]",
                        !isCompleted && !isCurrent && "bg-background border-border text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-[18px] h-[18px]" />
                      ) : (
                        <Icon className="w-[18px] h-[18px]" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors whitespace-nowrap",
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
                        "w-16 h-0.5 mb-5 transition-colors",
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
