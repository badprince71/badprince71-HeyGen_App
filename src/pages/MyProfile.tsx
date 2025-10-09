import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, User, Building2, Shield, Palette, Camera, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import mascotRobot from "@/assets/mascot-robot.jpg";
import mascotOwl from "@/assets/mascot-owl.jpg";
import mascotPenguin from "@/assets/mascot-penguin.jpg";
import mascotBear from "@/assets/mascot-bear.jpg";
import mascotCat from "@/assets/mascot-cat.jpg";
import mascotDog from "@/assets/mascot-dog.jpg";

const profileSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const mascotOptions = [
  { id: "robot", name: "Tech Bot", image: mascotRobot, category: "Professional & Modern" },
  { id: "owl", name: "Wise Owl", image: mascotOwl, category: "Consulting & Advisory" },
  { id: "penguin", name: "Cool Penguin", image: mascotPenguin, category: "Fun & Approachable" },
  { id: "bear", name: "Friendly Bear", image: mascotBear, category: "Warm & Trustworthy" },
  { id: "cat", name: "Smart Cat", image: mascotCat, category: "Creative & Agile" },
  { id: "dog", name: "Loyal Dog", image: mascotDog, category: "Reliable & Friendly" },
];

export default function MyProfile() {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedMascot, setSelectedMascot] = useState<string>("robot");
  const [videosCreated] = useState(47);
  const [accountAge] = useState("6 months");

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      companyName: "Acme Construction Inc.",
      email: "john@acmeconstruction.com",
      contactName: "John Smith",
      phone: "+1 (555) 123-4567",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Logo uploaded successfully!");
    }
  };

  const onProfileSubmit = (data: ProfileFormData) => {
    toast.success("Profile updated successfully!");
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    toast.success("Password changed successfully!");
    resetPassword();
  };

  const handleMascotChange = (mascotId: string) => {
    setSelectedMascot(mascotId);
    toast.success("Mascot preference updated!");
  };

  const currentMascot = mascotOptions.find(m => m.id === selectedMascot);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2 hover:gap-3 transition-all duration-300 rounded-full px-6 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* Left Side - Profile Card */}
          <div className="space-y-6">
            <Card className="backdrop-blur-sm bg-card/80 border-border/50">
              <div className="relative h-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
              </div>
              <CardContent className="relative -mt-12 space-y-6 pb-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-background border-4 border-background shadow-lg">
                      <img
                        src={currentMascot?.image}
                        alt="Current Mascot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      className="absolute bottom-0 right-0 w-9 h-9 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
                      aria-label="Change mascot"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold">Acme Construction</h2>
                    <p className="text-sm text-muted-foreground">
                      {currentMascot?.name} • {currentMascot?.category}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/30">
                  <div className="text-center space-y-1">
                    <p className="text-3xl font-bold text-primary">{videosCreated}</p>
                    <p className="text-xs text-muted-foreground">Videos Created</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-3xl font-bold text-secondary">{accountAge}</p>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="backdrop-blur-sm bg-card/80 border-border/50">
              <CardContent className="pt-6 space-y-3">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <Button variant="outline" className="w-full justify-start h-12 min-h-[44px] text-base">
                  <Building2 className="w-5 h-5 mr-3" />
                  View My Videos
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 min-h-[44px] text-base">
                  <Palette className="w-5 h-5 mr-3" />
                  Customize Branding
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Settings Tabs */}
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 h-full">
            <Tabs defaultValue="profile" className="w-full h-full flex flex-col">
              <CardHeader className="pb-4">
                <TabsList className="grid w-full grid-cols-3 bg-background/50 h-auto">
                  <TabsTrigger value="profile" className="gap-1 sm:gap-2 data-[state=active]:bg-background text-xs sm:text-sm py-2 sm:py-2.5">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Profile</span>
                    <span className="sm:hidden">Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="branding" className="gap-1 sm:gap-2 data-[state=active]:bg-background text-xs sm:text-sm py-2 sm:py-2.5">
                    <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Branding</span>
                    <span className="sm:hidden">Brand</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="gap-1 sm:gap-2 data-[state=active]:bg-background text-xs sm:text-sm py-2 sm:py-2.5">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Security</span>
                    <span className="sm:hidden">Secure</span>
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="flex-1">
                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6 animate-fade-in mt-0 h-full">
                  <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-5">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
                        <Input
                          id="companyName"
                          {...registerProfile("companyName")}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                        />
                        {profileErrors.companyName && (
                          <p className="text-sm text-destructive">{profileErrors.companyName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactName" className="text-sm font-medium">Contact Name</Label>
                        <Input
                          id="contactName"
                          {...registerProfile("contactName")}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                        />
                        {profileErrors.contactName && (
                          <p className="text-sm text-destructive">{profileErrors.contactName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Business Email</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            {...registerProfile("email")}
                            className="h-12 bg-background/50 border-border/50 focus:border-primary/50 pr-12"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
                            onClick={() => {
                              const emailInput = document.getElementById('email') as HTMLInputElement;
                              navigator.clipboard.writeText(emailInput?.value || '');
                              toast.success('Email copied to clipboard');
                            }}
                          >
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        {profileErrors.email && (
                          <p className="text-sm text-destructive">{profileErrors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...registerProfile("phone")}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="hero" className="w-full h-12 min-h-[44px] text-base font-medium">
                      Save Changes
                    </Button>
                  </form>
                </TabsContent>

                {/* Branding Tab */}
                <TabsContent value="branding" className="space-y-6 animate-fade-in mt-0 h-full">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Company Logo</Label>
                      <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 cursor-pointer group bg-background/30">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload-profile"
                        />
                        <label htmlFor="logo-upload-profile" className="cursor-pointer">
                          {logoPreview ? (
                            <div className="space-y-2">
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="w-24 h-24 object-contain mx-auto rounded-lg"
                              />
                              <p className="text-xs text-muted-foreground">Click to change</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="w-10 h-10 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                              <div>
                                <p className="text-sm font-medium">Drag & drop or click to upload</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Mascot Preference</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {mascotOptions.map((mascot) => (
                          <div
                            key={mascot.id}
                            onClick={() => handleMascotChange(mascot.id)}
                            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group border ${
                              selectedMascot === mascot.id
                                ? "border-primary bg-primary/5"
                                : "border-border/50 bg-background/30 hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-center gap-3 p-3">
                              <img
                                src={mascot.image}
                                alt={mascot.name}
                                className="w-14 h-14 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm truncate">{mascot.name}</h3>
                                <p className="text-xs text-muted-foreground truncate">{mascot.category}</p>
                              </div>
                              {selectedMascot === mascot.id && (
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6 animate-fade-in mt-0 h-full">
                  <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-5">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...registerPassword("currentPassword")}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-destructive">{passwordErrors.currentPassword.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Min. 8 characters"
                          {...registerPassword("newPassword")}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-destructive">{passwordErrors.newPassword.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPasswordSec" className="text-sm font-medium">Confirm New Password</Label>
                        <Input
                          id="confirmPasswordSec"
                          type="password"
                          placeholder="Re-enter new password"
                          {...registerPassword("confirmPassword")}
                          className="h-12 bg-background/50 border-border/50 focus:border-primary/50"
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-destructive">{passwordErrors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" variant="hero" className="w-full h-12 text-base font-medium">
                      Change Password
                    </Button>
                  </form>

                  <div className="pt-6 mt-6 border-t border-border/30">
                    <div className="flex justify-center">
                      <div className="grid grid-cols-2 gap-3 max-w-md w-full">
                        <Button variant="outline" className="h-12 border-primary/30 hover:bg-primary/10">
                          Download My Data
                        </Button>
                        <Button variant="destructive" className="h-12">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
