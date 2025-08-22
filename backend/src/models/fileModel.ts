import { Schema, model, Types } from 'mongoose';

const fileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'image/png', 'application/pdf'
  size: { type: Number, required: true },
  storageUrl: { type: String, required: true }, // URL from cloud storage like S3
  user: { type: Types.ObjectId, ref: 'User', required: true },
  parentFolder: { type: Types.ObjectId, ref: 'Folder' }, // null for root
}, { timestamps: true });

export const File = model('File', fileSchema);