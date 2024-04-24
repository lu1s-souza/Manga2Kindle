import { Schema, model } from 'mongoose';
import { Volume } from '../interfaces';

const volumeSchema = new Schema<Volume>({
  mangaId: String,
  chapters: [String],
  hasDownloaded: Boolean,
  totalPages: Number,
  shouldBypass: Boolean
})

export const VolumeModel = model('Volume', volumeSchema);
