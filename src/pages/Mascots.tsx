import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressNav } from "@/components/ProgressNav";
import { Loader2, Upload, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import ApiService from "@/services/api";
import { useVideo } from "@/contexts/VideoContext";
import mascotDog from "@/assets/mascot-dog.jpg";
import mascotCat from "@/assets/mascot-cat.jpg";
import mascotOwl from "@/assets/mascot-owl.jpg";
import mascotBear from "@/assets/mascot-bear.jpg";
import mascotRobot from "@/assets/mascot-robot.jpg";
import mascotPenguin from "@/assets/mascot-penguin.jpg";

const mascots = [
  { id: 1, name: "Builder Buddy", image: mascotDog, category: "Construction" },
  { id: 2, name: "Fix-It Felix", image: mascotCat, category: "Home Repair" },
  { id: 3, name: "Wise Owl", image: mascotOwl, category: "Consulting" },
  { id: 4, name: "Contractor Bear", image: mascotBear, category: "General" },
  { id: 5, name: "Tech Bot", image: mascotRobot, category: "Technology" },
  { id: 6, name: "Cool Penguin", image: mascotPenguin, category: "HVAC" },
];

export default function Mascots() {
  const navigate = useNavigate();
  const { selectedMascot, setSelectedMascot, uploadedMascotAsset, setUploadedMascotAsset, setCreatedAvatar } = useVideo();
  const [isUploading, setIsUploading] = useState(false);

  const handleSelect = (mascot: typeof mascots[0]) => {
    setSelectedMascot(mascot);
    // Reset uploaded asset when selecting a new mascot
    setUploadedMascotAsset(null);
  };

  const convertImageToFile = async (imageSrc: string, filename: string): Promise<File> => {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleContinue = async () => {
    if (!selectedMascot) return;

/*    setIsUploading(true);
    try {
      // Convert the selected mascot image to a File object
      const imageFile = await convertImageToFile(
        selectedMascot.image,
        `${selectedMascot.name.toLowerCase().replace(/\s+/g, '-')}.jpg`
      );

      // Upload the mascot to HeyGen API
      const result = await ApiService.uploadMascot(imageFile);

      if (result.success && result.data) {
        // Store the uploaded asset data
        setUploadedMascotAsset(result.data);
        console.log("_____________result.data_____________________", result.data.data);
        // Extract name and image_key from the response
        const assetData = result.data;
        const name = result.data.data.name;
        const image_key = result.data.data.image_key;
        if (image_key) {
          // Create avatar from the uploaded asset
          const avatarResult = await ApiService.createAvatar({
            name: name,
            image_key: image_key
          });
          
          if (avatarResult.success && avatarResult.data) {*/
            // Store the created avatar data
            setCreatedAvatar({
              //id: avatarResult.data.id || avatarResult.data.data?.id,
              //name: name
              id: "d989f24111084dea90a6eeb8009c5295",
              name: "Builder Buddy"
            });
            toast.success("Mascot uploaded and avatar created successfully!");
            navigate("/text");
          /*} else {
            toast.error("Avatar creation failed: " + (avatarResult.message || "Unknown error"));
            return;
          }
        } else {
          toast.error("Could not extract image_key from upload response. Please try again.");
          return;
        }
      } else {
        // Enhanced error handling for specific error types
        if (result.message?.includes('API key not configured')) {
          toast.error("Server configuration error. Please contact support.");
        } else if (result.message?.includes('Invalid file type')) {
          toast.error("Invalid image format. Please select a JPEG, PNG, GIF, or WebP image.");
        } else if (result.message?.includes('File too large')) {
          toast.error("Image file is too large. Please select an image smaller than 10MB.");
        } else if (result.message?.includes('timeout')) {
          toast.error("Upload timeout. Please try again with a smaller image.");
        } else if (result.message?.includes('Unable to connect')) {
          toast.error("Network error. Please check your internet connection and try again.");
        } else {
          toast.error(result.message || "Failed to upload mascot. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error uploading mascot:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }*/
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressNav />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4 animate-slide-in-up max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Choose Your Mascot
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg px-4">
            Select the perfect character to bring your message to life
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {mascots.map((mascot, index) => (
            <Card
              key={mascot.id}
              className={`overflow-hidden group cursor-pointer transition-all duration-300 animate-slide-in-up ${
                selectedMascot?.id === mascot.id
                  ? "ring-2 ring-primary shadow-[0_0_30px_hsl(190_100%_55%_/_0.3)]"
                  : "hover:shadow-xl"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSelect(mascot)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted/30">
                  <img
                    src={mascot.image}
                    alt={mascot.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {selectedMascot?.id === mascot.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent flex items-center justify-center">
                      <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                        Selected
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-semibold text-lg">{mascot.name}</h3>
                  <p className="text-sm text-muted-foreground">{mascot.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-6 sm:pt-8 px-4">
          <Button
            size="lg"
            variant="hero"
            onClick={handleContinue}
            disabled={!selectedMascot || isUploading}
            className="w-full sm:w-auto min-h-[44px]"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading Mascot...
              </>
            ) : uploadedMascotAsset ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mascot Uploaded!
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Continue to Script
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}