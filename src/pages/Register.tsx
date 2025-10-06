import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-950/20 to-blue-950/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      {/* Glowing particles */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-secondary rounded-full animate-glow-pulse" />
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary rounded-full animate-glow-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Registration form */}
        <div className="w-full max-w-md mx-auto lg:order-2 animate-slide-in-up">
          {/* Glassmorphism card */}
          <div className="relative backdrop-blur-xl bg-card/40 border border-border/50 rounded-3xl p-8 shadow-[0_0_60px_rgba(138,43,226,0.1)]">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 rounded-3xl" />
            
            <div className="relative space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-[0_0_30px_rgba(138,43,226,0.4)]">
                    <Sparkles className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-foreground">Create Your Account</h1>
                <p className="text-muted-foreground">Join QuoteToon Magic and start generating mascot videos effortlessly</p>
              </div>

              {/* Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/90">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-11 h-12 bg-background/50 border-border/50 rounded-xl focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>
                </div>

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
                      className="pl-11 h-12 bg-background/50 border-border/50 rounded-xl focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all"
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
                      className="pl-11 h-12 bg-background/50 border-border/50 rounded-xl focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground/90">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-11 h-12 bg-background/50 border-border/50 rounded-xl focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full h-12 text-base font-semibold rounded-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

              {/* Login link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-secondary hover:text-accent font-medium transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile mascot preview */}
          <div className="lg:hidden mt-8 flex justify-center">
            <img
              src="/mascot-cat.jpg"
              alt="QuoteToon Magic Mascot"
              className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(138,43,226,0.3)] animate-float"
            />
          </div>
        </div>

        {/* Right side - Mascot illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6 lg:order-1 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent to-primary opacity-20 blur-3xl rounded-full" />
            <img
              src="/mascot-cat.jpg"
              alt="QuoteToon Magic Mascot"
              className="relative w-80 h-80 object-contain drop-shadow-[0_0_40px_rgba(138,43,226,0.3)] animate-float"
            />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-muted-foreground">Start creating amazing mascot videos today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
