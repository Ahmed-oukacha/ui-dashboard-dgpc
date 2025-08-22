import { Request, Response } from 'express';
import { File } from '../models/fileModel';
import { Folder } from '../models/folderModel';
import { Types } from 'mongoose';

// جلب كل الملفات والمجلدات داخل مجلد معين
export const getContents = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.dbUser._id;
    const parentId = req.query.parentId ? new Types.ObjectId(req.query.parentId as string) : null;

    const folders = await Folder.find({ user: userId, parentFolder: parentId });
    const files = await File.find({ user: userId, parentFolder: parentId });

    // إضافة خاصية لتسهيل التمييز في الواجهة الأمامية
    const typedFolders = folders.map(f => ({ ...f.toObject(), itemType: 'folder' }));
    const typedFiles = files.map(f => ({ ...f.toObject(), itemType: 'file' }));

    res.json([...typedFolders, ...typedFiles]);
  } catch (error) {
    console.error('Get Contents Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// إنشاء مجلد جديد
export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    const userId = req.auth?.dbUser._id;
    const parentFolder = parentId ? new Types.ObjectId(parentId) : null;

    const newFolder = new Folder({ name, user: userId, parentFolder });
    await newFolder.save();
    res.status(201).json({ ...newFolder.toObject(), itemType: 'folder' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create folder' });
  }
};

// حذف ملف أو مجلد
export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type } = req.query; // 'file' or 'folder'
        const userId = req.auth?.dbUser._id;

        if (!type) {
            return res.status(400).json({ message: 'Item type is required' });
        }

        if (type === 'folder') {
            // ملاحظة: في تطبيق حقيقي، يجب حذف كل المحتويات داخل المجلد أيضًا (حذف متتالي)
            await Folder.findOneAndDelete({ _id: id, user: userId });
        } else {
            await File.findOneAndDelete({ _id: id, user: userId });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete item' });
    }
};

// إعادة تسمية ملف أو مجلد
export const renameItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body; // **الإصلاح الرئيسي هنا**
        const userId = req.auth?.dbUser._id;

        if (!name || !type) {
            return res.status(400).json({ message: 'New name and type are required' });
        }

        let updatedItem;
        if (type === 'folder') {
            updatedItem = await Folder.findOneAndUpdate({ _id: id, user: userId }, { name }, { new: true });
        } else {
            updatedItem = await File.findOneAndUpdate({ _id: id, user: userId }, { name }, { new: true });
        }

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: 'Failed to rename item' });
    }
};