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
} from '../validations/notesValidation.js';

const noteRoutes = Router();

noteRoutes.use('/notes/:noteId', celebrate(noteIdSchema));

noteRoutes.get('/notes', getAllNotes);
noteRoutes.get('/notes/:noteId', getNoteById);
noteRoutes.post('/notes', celebrate(createNoteSchema), createNote);
noteRoutes.delete('/notes/:noteId', deleteNote);
noteRoutes.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default noteRoutes;
