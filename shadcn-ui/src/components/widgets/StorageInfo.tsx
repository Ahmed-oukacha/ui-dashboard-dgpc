// filepath: shadcn-ui/src/components/widgets/StorageInfo.tsx

import { AnyFileItem } from "@/types";
import { TranslationStrings } from "@/types/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StorageInfoProps {
  files: AnyFileItem[];
  isLoading: boolean;
  t: TranslationStrings;
}

export const StorageInfo = ({ files, isLoading, t }: StorageInfoProps) => {
  // Dummy data for now
  const totalStorage = 5000; // 5 GB in MB

  // الإصلاح: التأكد من أن العنصر هو ملف (له خاصية size) قبل إضافته إلى المجموع
  const usedStorage = files.reduce((acc, item) => {
    if (item.itemType === 'file') {
      return acc + (item.size || 0) / (1024 * 1024); // Convert bytes to MB
    }
    return acc;
  }, 0);

  const percentageUsed = (usedStorage / totalStorage) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.dashboard.storage.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            <Progress value={percentageUsed} />
            <div className="text-center text-sm text-muted-foreground">
              {usedStorage.toFixed(2)} MB of {totalStorage / 1000} GB used
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};