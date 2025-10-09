import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressNav } from "@/components/ProgressNav";
import { Download, Share2, RotateCcw, Play, Pause } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useVideo } from "@/contexts/VideoContext";
import ApiService from "@/services/api";

export default function Videos() {
  const navigate = useNavigate();
  const location = useLocation() as any;
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
  const [duration, setDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number>();

  // Try to obtain a videoId passed to this page via navigation state or query string
  const initialVideoId: string | null = (location?.state && location.state.videoId) || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('videoId') : null);

  // Function to poll video status
  const pollVideoStatus = async (videoId: string) => {
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max (5 second intervals)
    
    const poll = async () => {
      try {
        
        const res = await ApiService.getVideoStatus(videoId);
        
        if (res.success && res.data) {
          const status = res.data.status;
          const videoUrl = res.data.video_url;
          
          console.log("Video status check:", { videoId, status, videoUrl, attempts });
          
          if (status === 'completed' && videoUrl) {
            setIsGenerating(false);
            setVideoUrl(videoUrl);
            toast.success('Video generated successfully!');
            return;
          } else if (status === 'failed' || status === 'error') {
            setIsGenerating(false);
            setVideoError('Video generation failed. Please try again.');
            return;
          } else if (status === 'processing' || status === 'pending') {
            // Update progress based on attempts
            const progress = Math.min(90, (attempts / maxAttempts) * 100);
            setProgress(progress);
            
            // Continue polling
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(poll, 5000); // Poll every 5 seconds
            } else {
              setIsGenerating(false);
              setVideoError('Video generation is taking longer than expected. Please check back later.');
            }
          }
        } else {
          setIsGenerating(false);
          setVideoError('Failed to check video status. Please try again.');
        }
      } catch (error) {
        console.error('Error polling video status:', error);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 5000); // Retry after 5 seconds
        } else {
          setIsGenerating(false);
          setVideoError('Failed to check video status. Please try again.');
        }
      }
    };
    
    poll();
  };

  useEffect(() => {
    if (!selectedMascot || !clientName || !selectedBackground) {
      navigate("/mascots");
      return;
    }

    // If no videoId is available, show error
    if (!initialVideoId) {
      setVideoError('No video ID found. Please go back and generate a video.');
      setIsGenerating(false);
      return;
    }

    // Start polling for video status
    pollVideoStatus(initialVideoId);
  }, [selectedMascot, clientName, selectedBackground, navigate, initialVideoId]);


  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setVideoError('Failed to load video');
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [videoUrl]);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleSeek = useCallback((value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  }, []);

  const handleStartOver = useCallback(() => {
    navigate("/mascots");
  }, [navigate]);

  const handleDownload = useCallback(() => {
    if (videoUrl) {
      // Create a temporary link to download the video
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `heygen-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Video download started!");
    } else {
      toast.error("No video available to download");
    }
  }, [videoUrl]);

  const handleShare = useCallback(async () => {
    if (videoUrl) {
      try {
        await navigator.clipboard.writeText(videoUrl);
        toast.success("Video link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link to clipboard");
      }
    } else {
      toast.error("No video available to share");
    }
  }, [videoUrl]);


  if (!selectedMascot || !clientName || !selectedBackground) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <ProgressNav />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 animate-slide-in-up px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {isGenerating ? "Generating Your Video" : "Your Video is Ready!"}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center pt-4">
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
                    {videoUrl && !videoError ? (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        className="w-full h-full object-cover"
                        controls={false}
                        preload="metadata"
                      />
                    ) : videoError ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
                        <div className="text-center space-y-4">
                          <p className="text-red-500 font-semibold">Video Error</p>
                          <p className="text-muted-foreground text-sm">{videoError}</p>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setVideoError(null);
                              if (initialVideoId) {
                                // Retry polling
                                const pollStatus = async (videoId: string) => {
                                  const ApiService = (await import("@/services/api")).default;
                                  try {
                                    const res = await ApiService.getVideoStatus(videoId);
                                    const status = (res as any)?.data?.status;
                                    const videoUrl = (res as any)?.data?.video_url;
                                    if (status === 'completed' && videoUrl) {
                                      setVideoUrl(videoUrl);
                                    }
                                  } catch (error) {
                                    console.error('Error retrying video status:', error);
                                  }
                                };
                                pollStatus(initialVideoId);
                              }
                            }}
                          >
                            Retry
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8">
                        <div className="text-center space-y-4">
                          <p className="text-muted-foreground">Loading video...</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay with play button */}
                    {videoUrl && !videoError && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Button
                          size="lg"
                          onClick={handlePlayPause}
                          className="gap-2 bg-primary/90 hover:bg-primary shadow-[0_0_30px_hsl(190_100%_55%_/_0.4)] px-8"
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
                    )}
                  </div>
                  
                  {/* Video Controls */}
                  {videoUrl && !videoError && duration > 0 && (
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
                        <span>{Math.floor(duration)}s</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="animate-slide-in-up bg-card/50 backdrop-blur-sm border-border/50" style={{ animationDelay: "200ms" }}>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl">Video Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 px-4 sm:px-0">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleStartOver} 
                  className="gap-2 w-full sm:w-auto min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </Button>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleShare} 
                    className="gap-2 w-full sm:w-auto min-h-[44px]"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={handleDownload} 
                    className="gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(190_100%_55%_/_0.3)] w-full sm:w-auto min-h-[44px]"
                  >
                    <Download className="w-4 h-4" />
                    Download MP4
                  </Button>
                </div>
              </div>

              {!videoUrl && (
                <div className="p-6 bg-accent/10 border border-accent/20 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-accent">Note:</strong> Video generation is in progress. Once complete, you'll be able to play, download, and share your generated video.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}