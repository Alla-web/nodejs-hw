import { Router } from 'express';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const noteRoutes = Router();

noteRoutes.get('/notes', getAllNotes);
noteRoutes.get('/notes/:noteId', getNoteById);
noteRoutes.post('/notes', createNote);
noteRoutes.delete('/notes/:noteId', deleteNote);
noteRoutes.patch('/notes/:noteId', updateNote);

export default noteRoutes;
