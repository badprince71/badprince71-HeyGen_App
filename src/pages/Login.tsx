import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      {/* Glowing particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-secondary rounded-full animate-glow-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Mascot illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6 animate-slide-in-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-3xl rounded-full" />
            <img
              src="/mascot-robot.jpg"
              alt="QuoteToon Magic Mascot"
              className="relative w-80 h-80 object-contain drop-shadow-[0_0_40px_rgba(0,255,255,0.3)] animate-float"
            />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              QuoteToon Magic
            </h2>
            <p className="text-muted-foreground">Create stunning mascot videos with AI</p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-md mx-auto animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
          {/* Glassmorphism card */}
          <div className="relative backdrop-blur-xl bg-card/40 border border-border/50 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,255,255,0.1)]">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />
            
            <div className="relative space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                    <Sparkles className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to continue creating magic</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/90">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground/90">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 h-12 bg-background/50 border-border/50 rounded-xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-foreground/70 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full h-12 text-base font-semibold rounded-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card/40 px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Register link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:text-secondary font-medium transition-colors"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile mascot preview */}
          <div className="lg:hidden mt-8 flex justify-center">
            <img
              src="/mascot-robot.jpg"
              alt="QuoteToon Magic Mascot"
              className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.3)] animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
