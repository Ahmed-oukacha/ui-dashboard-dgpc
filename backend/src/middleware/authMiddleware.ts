import { clerkClient } from '@clerk/clerk-sdk-node'; // 1. استيراد clerkClient بدلاً من Clerk
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';

// Extend Express Request type to include auth property
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        dbUser?: any;
      }
    }
  }
}

export const clerkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    // 3. استخدام clerkClient مباشرة
    const claims = await clerkClient.verifyToken(token);

    if (!claims) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    // Find or create user in our DB
    let dbUser = await User.findOne({ clerkId: claims.sub });
    if (!dbUser) {
        // 4. استخدام clerkClient مباشرة
        const clerkUser = await clerkClient.users.getUser(claims.sub);
        dbUser = await User.create({
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0].emailAddress,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            imageUrl: clerkUser.imageUrl,
        });
    }

    req.auth = { userId: claims.sub, dbUser };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};