import { Schema, model } from 'mongoose';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      required: false,
      default: 'Todo',
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

notesSchema.index(
  {
    title: 'text',
    content: 'text',
  },
  {
    name: 'NoteTextIndex',
    weights: { title: 10, content: 5 },
    default_language: 'english',
  }
);

export const Note = model('Note', notesSchema, 'notes');
