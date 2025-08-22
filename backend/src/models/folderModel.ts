import { Schema, model, Types } from 'mongoose';

const folderSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  parentFolder: { type: Types.ObjectId, ref: 'Folder' }, // null for root
}, { timestamps: true });

export const Folder = model('Folder', folderSchema);