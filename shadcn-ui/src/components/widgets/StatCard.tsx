import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileText, ImageIcon, Music, VideoIcon } from "lucide-react";
import { TranslationStrings } from "@/types/translations";

interface StatCardProps {
  t: TranslationStrings;
  type: 'documents' | 'images' | 'videos' | 'audio';
  value: number;
}

const iconMap = {
  documents: <FileText className="h-4 w-4 text-muted-foreground" />,
  images: <ImageIcon className="h-4 w-4 text-muted-foreground" />,
  videos: <VideoIcon className="h-4 w-4 text-muted-foreground" />,
  audio: <Music className="h-4 w-4 text-muted-foreground" />,
};

export const StatCard = ({ t, type, value }: StatCardProps) => {
  const titleMap = {
    documents: t.dashboard.statCards.documents,
    images: t.dashboard.statCards.images,
    videos: t.dashboard.statCards.videos,
    audio: t.dashboard.statCards.audio,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{titleMap[type]}</CardTitle>
        {iconMap[type]}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
};