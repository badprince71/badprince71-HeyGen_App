import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVideo } from "@/contexts/VideoContext";
import { ProgressNav } from "@/components/ProgressNav";
import { Download, Share2, RotateCcw, Play, Pause, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function Videos() {
  const navigate = useNavigate();
  const { 
    selectedMascot, 
    clientName,
    projectDetails,
    schedule,
    price,
    customerInterest,
    selectedBackground, 
    showScriptInVideo 
  } = useVideo();
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(100); // Mock duration
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!selectedMascot || !clientName || !selectedBackground) {
      navigate("/mascots");
      return;
    }

    // Simulate video generation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [selectedMascot, clientName, selectedBackground, navigate]);

  useEffect(() => {
    if (isPlaying && !isGenerating) {
      const animate = () => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 0.5;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isGenerating, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleStartOver = () => {
    navigate("/mascots");
  };

  const handleDownload = () => {
    toast.info("Video download requires AI video generation service. This feature needs backend integration with services like D-ID or HeyGen.");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };

  if (!selectedMascot || !clientName || !selectedBackground) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressNav />
      <div className="container mx-auto p-6 py-12 space-y-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 animate-slide-in-up">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {isGenerating ? "Generating Your Video" : "Your Video is Ready!"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isGenerating
                ? "Our AI is creating your personalized video presentation..."
                : "Watch, download, or share your generated video"}
            </p>
          </div>

          {isGenerating ? (
            <Card className="animate-slide-in-up bg-card/50 backdrop-blur-sm border-border/50" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-12 space-y-8">
                <div className="flex items-center justify-center">
                  <img
                    src={selectedMascot.image}
                    alt={selectedMascot.name}
                    className="w-48 h-48 rounded-3xl object-cover animate-float shadow-2xl"
                  />
                </div>
                <div className="space-y-4">
                  <Progress value={progress} className="h-3" />
                  <p className="text-center text-muted-foreground font-medium">
                    {progress}% complete
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6 text-center pt-4">
                  <div className="space-y-2 p-4 rounded-xl bg-background/50">
                    <p className="text-sm text-muted-foreground">Character</p>
                    <p className="font-semibold text-lg">{selectedMascot.name}</p>
                  </div>
                  <div className="space-y-2 p-4 rounded-xl bg-background/50">
                    <p className="text-sm text-muted-foreground">Stage</p>
                    <p className="font-semibold text-lg">{selectedBackground.name}</p>
                  </div>
                  <div className="space-y-2 p-4 rounded-xl bg-background/50">
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-semibold text-lg">{clientName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="overflow-hidden animate-slide-in-up bg-card/30 backdrop-blur-sm border-border/50 shadow-2xl" style={{ animationDelay: "100ms" }}>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-background to-muted/30">
                    <img
                      src={selectedBackground.image}
                      alt="Video background"
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
                      <img
                        src={selectedMascot.image}
                        alt={selectedMascot.name}
                        className={`w-72 h-72 rounded-3xl object-cover shadow-2xl transition-transform duration-300 ${
                          isPlaying ? 'animate-float' : ''
                        }`}
                      />
                      
                      {showScriptInVideo && clientName && (
                        <div className="absolute bottom-12 left-8 right-8 bg-background/90 backdrop-blur-md p-6 rounded-2xl border border-border/50 shadow-xl space-y-2">
                          <p className="text-sm font-semibold">Client: {clientName}</p>
                          {projectDetails && <p className="text-xs text-muted-foreground line-clamp-2">{projectDetails}</p>}
                          {(schedule || price) && (
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              {schedule && <span>Timeline: {schedule}</span>}
                              {price && <span>Budget: {price}</span>}
                            </div>
                          )}
                        </div>
                      )}

                      <Button
                        size="lg"
                        onClick={handlePlayPause}
                        className="mt-6 gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(190_100%_55%_/_0.4)] px-8"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-5 h-5" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5" />
                            Play Video
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="bg-card/80 backdrop-blur-sm p-6 space-y-3">
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={0.1}
                      onValueChange={handleSeek}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.floor(currentTime)}s</span>
                      <span>{duration}s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-slide-in-up bg-card/50 backdrop-blur-sm border-border/50" style={{ animationDelay: "200ms" }}>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl">Video Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2 p-4 rounded-xl bg-background/50">
                        <p className="text-sm text-muted-foreground">Character</p>
                        <p className="font-medium text-lg">{selectedMascot.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedMascot.category}</p>
                      </div>
                      <div className="space-y-2 p-4 rounded-xl bg-background/50">
                        <p className="text-sm text-muted-foreground">Stage</p>
                        <p className="font-medium text-lg">{selectedBackground.name}</p>
                      </div>
                      <div className="space-y-2 md:col-span-2 p-4 rounded-xl bg-background/50">
                        <p className="text-sm text-muted-foreground">Project Details</p>
                        <p className="text-sm leading-relaxed">{projectDetails}</p>
                        {(schedule || price || customerInterest) && (
                          <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                            {schedule && <p className="text-xs"><span className="font-medium">Timeline:</span> {schedule}</p>}
                            {price && <p className="text-xs"><span className="font-medium">Budget:</span> {price}</p>}
                            {customerInterest && <p className="text-xs"><span className="font-medium">Notes:</span> {customerInterest}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" size="lg" onClick={handleStartOver} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={handleShare} className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={handleDownload} 
                    className="gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(190_100%_55%_/_0.3)]"
                  >
                    <Download className="w-4 h-4" />
                    Download MP4
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-accent/10 border border-accent/20 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-accent">Note:</strong> Full video generation with animated lip-sync mascots requires AI video generation service integration (D-ID, HeyGen, or similar). This demo shows the UI/UX flow. Enable Lovable Cloud to add real video generation capabilities.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
