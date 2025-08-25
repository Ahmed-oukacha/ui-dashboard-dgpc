// filepath: shadcn-ui/src/components/widgets/RecentFiles.tsx

import { AnyFileItem, ModalState } from "@/types";
import { TranslationStrings } from "@/types/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Folder } from "lucide-react";
import { Button } from "../ui/button";

// الإصلاح النهائي: تعريف الخصائص الصحيحة التي يستقبلها المكون
interface RecentFilesProps {
  files: AnyFileItem[];
  isLoading: boolean;
  // الدالة تستقبل نوع النافذة والعنصر
  onPreviewFile: (type: ModalState['type'], item: AnyFileItem) => void;
  t: TranslationStrings;
}

export const RecentFiles = ({ files, isLoading, onPreviewFile, t }: RecentFilesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.dashboard.recentFiles.title}</CardTitle>
        <CardDescription>{t.dashboard.recentFiles.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {files.slice(0, 5).map((file) => (
              <li key={file._id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {file.itemType === 'folder' ? <Folder className="h-5 w-5 text-gray-500" /> : <FileText className="h-5 w-5 text-gray-500" />}
                  <span className="font-medium">{file.name}</span>
                </div>
                {/* استدعاء الدالة مع المعلمات الصحيحة */}
                <Button variant="ghost" size="sm" onClick={() => onPreviewFile('preview', file)}>
                  Preview
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};