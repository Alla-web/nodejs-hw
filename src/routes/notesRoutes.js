import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import {
  updateNoteSchema,
  createNoteSchema,
  noteIdSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const noteRoutes = Router();

noteRoutes.use('/notes', authenticate);

noteRoutes.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
noteRoutes.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
noteRoutes.post('/notes', celebrate(createNoteSchema), createNote);
noteRoutes.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
noteRoutes.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default noteRoutes;
