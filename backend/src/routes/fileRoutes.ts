import { Router } from 'express';
import { getContents, createFolder, deleteItem, renameItem } from '../controllers/fileController';
import { clerkAuth } from '../middleware/authMiddleware';

const router = Router();

// تطبيق المصادقة على جميع المسارات التالية
router.use(clerkAuth);

router.get('/', getContents);
router.post('/folders', createFolder);
router.delete('/:id', deleteItem);
router.put('/:id', renameItem);

export default router;