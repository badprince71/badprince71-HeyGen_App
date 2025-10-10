import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVideo } from "@/contexts/VideoContext";
import { ProgressNav } from "@/components/ProgressNav";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import ApiService from "@/services/api";
import { toast } from "sonner";

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
  const { selectedMascot, clientName, projectDetails, selectedBackground, setSelectedBackground, createdAvatar, generatedScript } = useVideo();
  const [isUploading, setIsUploading] = useState(false as any);
  
  if (!selectedMascot || !clientName) {
    navigate("/mascots");
    return null;
  }

  const handleSelect = (background: typeof backgrounds[0]) => {
    setSelectedBackground(background);
  };

  const handleContinue = async () => {
    if (!selectedBackground) return;
    if (!createdAvatar?.id) {
      toast.error('Avatar not created. Please go back and select a mascot.');
      return;
    }
    
    setIsUploading(true);
    try {
      // Fetch remote image and convert to File for upload
      const resp = await fetch(selectedBackground.image);
      const blob = await resp.blob();
      const file = new File([blob], `${selectedBackground.name.replace(/\s+/g,'-').toLowerCase()}.jpg`, { type: blob.type || 'image/jpeg' });
      const result = await ApiService.uploadBackground(file);
      if (!result.success || !result.data) {
        toast.error(result.message || 'Failed to upload background');
        setIsUploading(false);
        return;
      }

      // Extract asset id from various possible response shapes (mock or real)
      const anyResult: any = result as any;
      const assetId = (result.data && result.data.asset_id) || (anyResult.data && anyResult.data.data && anyResult.data.data.id);
      if (!assetId) {
        toast.error('Could not read background asset id');
        setIsUploading(false);
        return;
      }
      console.log("_____________assetId_____________________", assetId);
      console.log("_____________createdAvatar.id_____________________", createdAvatar.id);
      // Build HeyGen video payload
      const payload = {
        video_inputs: [
          {
            character: {
              type: "talking_photo",
              talking_photo_id: createdAvatar.id,
              avatar_style: "normal"
            },
            voice: {
              type: "text",
              input_text: generatedScript || "With HeyGen, it is very easy to create avatar videos with custom backgrounds.",
              voice_id: "d7bbcdd6964c47bdaae26decade4a933"
            },
            background: {
              type: "image",
              image_asset_id: assetId
            }
          }
        ]
      };

      const gen = await ApiService.generateVideo(payload);
      if (gen.success) {
        const videoId = (gen as any)?.data?.video_id || (gen as any)?.data?.data?.video_id;
        toast.success('Video generation started');
        if (videoId) {
          navigate('/video', { state: { videoId } });
        } else {
          navigate('/video');
        }
      } else {
        toast.error(gen.message || 'Failed to start video generation');
      }
    } catch (e) {
      toast.error('Failed to upload background');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressNav />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-2 animate-slide-in-up text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Choose Your Stage
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Select the perfect setting for your video presentation
            </p>
          </div>

          {/* Preview section */}
          <Card className="animate-slide-in-up bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedMascot.image}
                    alt={selectedMascot.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 space-y-3 text-center sm:text-left w-full">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-4 px-4 sm:px-0">
            <Button 
              variant="outline" 
              size="default" 
              onClick={() => navigate("/text")}
              className="w-full sm:w-auto min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              size="lg"
              variant="hero"
              onClick={handleContinue}
              disabled={!selectedBackground || isUploading}
              className="w-full sm:w-auto min-h-[44px]"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Background...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Generate Video
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}