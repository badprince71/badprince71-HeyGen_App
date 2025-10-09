import { createContext, useContext, useState, ReactNode } from "react";

interface VideoContextType {
  selectedMascot: { id: number; name: string; image: string; category: string } | null;
  setSelectedMascot: (mascot: { id: number; name: string; image: string; category: string } | null) => void;
  uploadedMascotAsset: { asset_id: string; status: string; url?: string; name?: string; image_key?: string; data?: any } | null;
  setUploadedMascotAsset: (asset: { asset_id: string; status: string; url?: string; name?: string; image_key?: string; data?: any } | null) => void;
  createdAvatar: { id: string; name: string } | null;
  setCreatedAvatar: (avatar: { id: string; name: string } | null) => void;
  generatedScript?: string;
  setGeneratedScript?: (script: string) => void;
  clientName: string;
  setClientName: (name: string) => void;
  projectDetails: string;
  setProjectDetails: (details: string) => void;
  schedule: string;
  setSchedule: (schedule: string) => void;
  price: string;
  setPrice: (price: string) => void;
  customerInterest: string;
  setCustomerInterest: (interest: string) => void;
  selectedBackground: { id: number; name: string; image: string } | null;
  setSelectedBackground: (bg: { id: number; name: string; image: string } | null) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  showScriptInVideo: boolean;
  setShowScriptInVideo: (show: boolean) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [selectedMascot, setSelectedMascot] = useState<{ id: number; name: string; image: string; category: string } | null>(null);
  const [uploadedMascotAsset, setUploadedMascotAsset] = useState<{ asset_id: string; status: string; url?: string; name?: string; image_key?: string; data?: any } | null>(null);
  const [createdAvatar, setCreatedAvatar] = useState<{ id: string; name: string } | null>(null);
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [schedule, setSchedule] = useState("");
  const [price, setPrice] = useState("");
  const [customerInterest, setCustomerInterest] = useState("");
  const [selectedBackground, setSelectedBackground] = useState<{ id: number; name: string; image: string } | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showScriptInVideo, setShowScriptInVideo] = useState(true);

  return (
    <VideoContext.Provider
      value={{
        selectedMascot,
        setSelectedMascot,
        uploadedMascotAsset,
        setUploadedMascotAsset,
        createdAvatar,
        setCreatedAvatar,
        generatedScript,
        setGeneratedScript,
        clientName,
        setClientName,
        projectDetails,
        setProjectDetails,
        schedule,
        setSchedule,
        price,
        setPrice,
        customerInterest,
        setCustomerInterest,
        selectedBackground,
        setSelectedBackground,
        uploadedFile,
        setUploadedFile,
        showScriptInVideo,
        setShowScriptInVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within VideoProvider");
  }
  return context;
}
