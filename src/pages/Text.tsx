import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useVideo } from "@/contexts/VideoContext";
import { ProgressNav } from "@/components/ProgressNav";
import { ArrowLeft, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Text() {
  const navigate = useNavigate();
  const { 
    selectedMascot,
    clientName, setClientName,
    projectDetails, setProjectDetails,
    schedule, setSchedule,
    price, setPrice,
    customerInterest, setCustomerInterest,
    uploadedFile, setUploadedFile, 
    showScriptInVideo, setShowScriptInVideo 
  } = useVideo();

  if (!selectedMascot) {
    navigate("/mascots");
    return null;
  }

  const handleContinue = () => {
    if (!clientName.trim() || !projectDetails.trim()) {
      toast.error("Please fill in at least client name and project details");
      return;
    }
    navigate("/background");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid file (PDF, DOC, DOCX, PNG, JPG)");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressNav />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 animate-slide-in-up px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Client Information
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Enter details to personalize your video presentation
            </p>
          </div>

          <Card className="animate-slide-in-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <img
                  src={selectedMascot.image}
                  alt={selectedMascot.name}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedMascot.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMascot.category}</p>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-3 pb-4 border-b border-border">
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Upload Supporting Document (Optional)
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    <Upload className="w-4 h-4" />
                    Choose File
                  </Button>
                  {uploadedFile && (
                    <span className="text-sm text-muted-foreground truncate max-w-full sm:max-w-[250px]">
                      {uploadedFile.name}
                    </span>
                  )}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, DOCX, PNG, JPG (Max 10MB)
                </p>
              </div>

              {/* Client Information Fields */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="client-name" className="text-sm font-medium">
                    Client Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="client-name"
                    placeholder="Enter client's name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="text-base min-h-[44px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-details" className="text-sm font-medium">
                    Project Details <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="project-details"
                    placeholder="Describe the project scope, goals, and key features..."
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="min-h-[120px] resize-none text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule" className="text-sm font-medium">
                      Timeline/Schedule
                    </Label>
                    <Input
                      id="schedule"
                      placeholder="e.g., 3 months, Q2 2025"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      className="text-base min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price/Budget
                    </Label>
                    <Input
                      id="price"
                      placeholder="e.g., $50,000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="text-base min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-interest" className="text-sm font-medium">
                    Customer Interest/Notes
                  </Label>
                  <Textarea
                    id="customer-interest"
                    placeholder="What are the client's main interests, concerns, or special requirements?"
                    value={customerInterest}
                    onChange={(e) => setCustomerInterest(e.target.value)}
                    className="min-h-[100px] resize-none text-base"
                  />
                </div>
              </div>

              {/* Show Script Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border-t border-border pt-5">
                <div className="space-y-1">
                  <Label htmlFor="show-script" className="text-sm font-medium">
                    Display Information in Video
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Show client details during video playback
                  </p>
                </div>
                <Switch
                  id="show-script"
                  checked={showScriptInVideo}
                  onCheckedChange={setShowScriptInVideo}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-4 px-4 sm:px-0">
            <Button 
              variant="outline" 
              size="default" 
              onClick={() => navigate("/mascots")}
              className="w-full sm:w-auto min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              size="lg"
              variant="hero"
              onClick={handleContinue}
              disabled={!clientName.trim() || !projectDetails.trim()}
              className="w-full sm:w-auto min-h-[44px]"
            >
              Continue to Background
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
