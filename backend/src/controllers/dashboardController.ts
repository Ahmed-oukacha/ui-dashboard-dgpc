import { Request, Response } from 'express';
import { File } from '../models/fileModel';
import { Folder } from '../models/folderModel';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.dbUser._id;

    const totalFiles = await File.countDocuments({ user: userId });
    const totalFolders = await Folder.countDocuments({ user: userId });
    
    const totalStorageUsed = await File.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: '$size' } } }
    ]);

    res.json({
      totalFiles,
      totalFolders,
      totalStorageUsed: totalStorageUsed[0]?.total || 0,
      // يمكنك إضافة إحصائيات أخرى هنا
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};