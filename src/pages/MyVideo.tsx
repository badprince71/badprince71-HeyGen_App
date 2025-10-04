import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Play,
  Download,
  Share2,
  Grid3x3,
  List,
  Plus,
  Trash2,
  Clock,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import mascotBear from "@/assets/mascot-bear.jpg";
import mascotCat from "@/assets/mascot-cat.jpg";
import mascotDog from "@/assets/mascot-dog.jpg";
import mascotOwl from "@/assets/mascot-owl.jpg";
import mascotPenguin from "@/assets/mascot-penguin.jpg";
import mascotRobot from "@/assets/mascot-robot.jpg";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  mascot: {
    name: string;
    avatar: string;
  };
  duration: string;
  createdDate: string;
  status: "completed" | "processing" | "draft";
}

// Mock video data
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Estimate – Kitchen Remodel",
    thumbnail: mascotBear,
    mascot: { name: "Bear", avatar: mascotBear },
    duration: "0:42",
    createdDate: "2025-10-01",
    status: "completed",
  },
  {
    id: "2",
    title: "Estimate – Bathroom Renovation",
    thumbnail: mascotCat,
    mascot: { name: "Cat", avatar: mascotCat },
    duration: "1:15",
    createdDate: "2025-09-28",
    status: "completed",
  },
  {
    id: "3",
    title: "Estimate – Deck Construction",
    thumbnail: mascotDog,
    mascot: { name: "Dog", avatar: mascotDog },
    duration: "0:58",
    createdDate: "2025-09-25",
    status: "completed",
  },
  {
    id: "4",
    title: "Estimate – Interior Painting",
    thumbnail: mascotOwl,
    mascot: { name: "Owl", avatar: mascotOwl },
    duration: "0:35",
    createdDate: "2025-09-20",
    status: "completed",
  },
  {
    id: "5",
    title: "Estimate – Roof Repair",
    thumbnail: mascotPenguin,
    mascot: { name: "Penguin", avatar: mascotPenguin },
    duration: "1:02",
    createdDate: "2025-09-15",
    status: "completed",
  },
  {
    id: "6",
    title: "Estimate – Landscaping Project",
    thumbnail: mascotRobot,
    mascot: { name: "Robot", avatar: mascotRobot },
    duration: "0:47",
    createdDate: "2025-09-10",
    status: "completed",
  },
];

export default function MyVideo() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMascot, setSelectedMascot] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isGridView, setIsGridView] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos] = useState<Video[]>(mockVideos);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.mascot.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMascot =
      selectedMascot === "all" || video.mascot.name === selectedMascot;
    const matchesStatus =
      selectedStatus === "all" || video.status === selectedStatus;
    return matchesSearch && matchesMascot && matchesStatus;
  });

  const handlePlay = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleDownload = (video: Video) => {
    toast.success(`Downloading ${video.title}`);
  };

  const handleShare = (video: Video) => {
    toast.success("Share link copied to clipboard!");
  };

  const handleDelete = (video: Video) => {
    toast.success(`${video.title} deleted successfully`);
    setSelectedVideo(null);
  };

  const handleGenerateNew = () => {
    navigate("/mascots");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary/20 text-primary border-primary/30";
      case "processing":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "draft":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="gap-2 border-2 border-primary bg-transparent text-foreground hover:bg-primary/10 rounded-full px-6 py-2 h-11 animate-slide-in-up transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </Button>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-slide-in-up" style={{ animationDelay: "50ms" }}>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              My Videos
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Manage and organize your estimate videos
            </p>
          </div>
          <Button
            variant="hero"
            size="lg"
            onClick={handleGenerateNew}
            className="gap-2 w-full sm:w-auto min-h-[44px]"
          >
            <Plus className="w-5 h-5" />
            Generate New Video
          </Button>
        </div>

        {/* Controls Section */}
        <Card className="animate-slide-in-up bg-card/50 backdrop-blur-sm border-border/50" style={{ animationDelay: "150ms" }}>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by project, mascot, or client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 rounded-xl"
                />
              </div>

              {/* Filters and View Toggle */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full md:w-auto">
                  <Select value={selectedMascot} onValueChange={setSelectedMascot}>
                    <SelectTrigger className="w-full sm:w-[180px] rounded-xl bg-background/50 border-border/50">
                      <SelectValue placeholder="All Mascots" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Mascots</SelectItem>
                      <SelectItem value="Bear">Bear</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Owl">Owl</SelectItem>
                      <SelectItem value="Penguin">Penguin</SelectItem>
                      <SelectItem value="Robot">Robot</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="w-full sm:w-[180px] rounded-xl bg-background/50 border-border/50">
                      <SelectValue placeholder="All Dates" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-[180px] rounded-xl bg-background/50 border-border/50">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3 bg-background/50 p-2 rounded-xl border border-border/50">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isGridView
                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(190_100%_55%_/_0.3)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      !isGridView
                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(190_100%_55%_/_0.3)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Library */}
        {filteredVideos.length === 0 ? (
          /* Empty State */
          <Card className="animate-slide-in-up bg-card/30 backdrop-blur-sm border-border/50" style={{ animationDelay: "250ms" }}>
            <CardContent className="p-16 text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-float">
                  <Play className="w-24 h-24 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    No videos yet
                  </h3>
                  <p className="text-muted-foreground">
                    Generate your first estimate video and make quoting fun!
                  </p>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleGenerateNew}
                  className="gap-2 mt-4"
                >
                  <Plus className="w-5 h-5" />
                  Generate New Video
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : isGridView ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-slide-in-up" style={{ animationDelay: "250ms" }}>
            {filteredVideos.map((video, index) => (
              <Card
                key={video.id}
                className="group overflow-hidden bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_10px_60px_hsl(190_100%_55%_/_0.2)] hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${250 + index * 50}ms` }}
              >
                <CardContent className="p-0">
                  {/* Thumbnail with Hover Overlay */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="default"
                        className="rounded-full shadow-[0_0_20px_hsl(190_100%_55%_/_0.4)]"
                        onClick={() => handlePlay(video)}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(video);
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(video);
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 border border-border/50">
                        <AvatarImage src={video.mascot.avatar} alt={video.mascot.name} />
                        <AvatarFallback>{video.mascot.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {video.mascot.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(video.createdDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={`${getStatusColor(video.status)} text-xs`}
                    >
                      {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <Card className="animate-slide-in-up bg-card/30 backdrop-blur-sm border-border/50" style={{ animationDelay: "250ms" }}>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                    onClick={() => handlePlay(video)}
                  >
                    {/* Thumbnail */}
                    <div className="w-full sm:w-32 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                        {video.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Avatar className="w-5 h-5 border border-border/50">
                            <AvatarImage src={video.mascot.avatar} alt={video.mascot.name} />
                            <AvatarFallback>{video.mascot.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{video.mascot.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(video.createdDate).toLocaleDateString()}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(video.status)} text-xs`}
                        >
                          {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        size="sm"
                        variant="default"
                        className="flex-1 sm:flex-none gap-1"
                        onClick={() => handlePlay(video)}
                      >
                        <Play className="w-3 h-3" />
                        Play
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(video);
                        }}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(video);
                        }}
                      >
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Video Detail Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="space-y-6">
              {/* Video Preview */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/30">
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                  <Button
                    size="lg"
                    variant="default"
                    className="rounded-full shadow-[0_0_30px_hsl(190_100%_55%_/_0.5)]"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Play Video
                  </Button>
                </div>
              </div>

              {/* Video Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 rounded-xl bg-background/50">
                  <p className="text-sm text-muted-foreground">Character</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 border border-border/50">
                      <AvatarImage src={selectedVideo.mascot.avatar} alt={selectedVideo.mascot.name} />
                      <AvatarFallback>{selectedVideo.mascot.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{selectedVideo.mascot.name}</p>
                  </div>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-background/50">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{selectedVideo.duration} sec</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-background/50">
                  <p className="text-sm text-muted-foreground">Created Date</p>
                  <p className="font-semibold">
                    {new Date(selectedVideo.createdDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-background/50">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant="outline"
                    className={getStatusColor(selectedVideo.status)}
                  >
                    {selectedVideo.status.charAt(0).toUpperCase() + selectedVideo.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                <Button
                  variant="default"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={() => handleDownload(selectedVideo)}
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={() => handleShare(selectedVideo)}
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={() => handleDelete(selectedVideo)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
