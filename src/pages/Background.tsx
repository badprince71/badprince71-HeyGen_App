import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVideo } from "@/contexts/VideoContext";
import { ProgressNav } from "@/components/ProgressNav";
import { ArrowLeft } from "lucide-react";

const backgrounds = [
  { id: 1, name: "Animated Office", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop" },
  { id: 2, name: "Fun Workspace", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop" },
  { id: 3, name: "Creative Studio", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop" },
  { id: 4, name: "Tech Space", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop" },
  { id: 5, name: "Colorful Room", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop" },
  { id: 6, name: "Vibrant Gradient", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop" },
];

export default function Background() {
  const navigate = useNavigate();
  const { selectedMascot, clientName, projectDetails, selectedBackground, setSelectedBackground } = useVideo();

  if (!selectedMascot || !clientName) {
    navigate("/mascots");
    return null;
  }

  const handleSelect = (background: typeof backgrounds[0]) => {
    setSelectedBackground(background);
  };

  const handleContinue = () => {
    if (selectedBackground) {
      navigate("/video");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressNav />
      <div className="container mx-auto p-6 py-12 space-y-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2 animate-slide-in-up text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Choose Your Stage
            </h1>
            <p className="text-muted-foreground text-lg">
              Select the perfect setting for your video presentation
            </p>
          </div>

          {/* Preview section */}
          <Card className="animate-slide-in-up bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedMascot.image}
                    alt={selectedMascot.name}
                    className="w-32 h-32 rounded-3xl object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{selectedMascot.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedMascot.category}</p>
                  </div>
                  <div className="p-4 bg-background/80 rounded-xl border border-border/50 space-y-2">
                    <p className="text-sm font-semibold">Client: {clientName}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{projectDetails}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {backgrounds.map((background, index) => (
              <Card
                key={background.id}
                className={`overflow-hidden group cursor-pointer transition-all duration-300 animate-slide-in-up hover:scale-105 ${
                  selectedBackground?.id === background.id
                    ? "ring-2 ring-primary shadow-[0_0_30px_hsl(190_100%_55%_/_0.4)]"
                    : "hover:shadow-xl"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleSelect(background)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={background.image}
                      alt={background.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {selectedBackground?.id === background.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-center justify-center">
                        <div className="bg-background/95 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          Selected
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold">{background.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" size="default" onClick={() => navigate("/text")}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              size="lg"
              variant="hero"
              onClick={handleContinue}
              disabled={!selectedBackground}
            >
              Generate Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
