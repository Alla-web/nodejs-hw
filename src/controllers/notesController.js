import Note from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 15, tag, search } = req.query;

  const skip = (Number(page) - 1) * Number(perPage);

  const noteQuery = Note.find();

  if (search) {
    noteQuery.where({ $text: { $search: search } });
  }

  if (tag) noteQuery.where('tag').equals(tag);

  const [totalNotes, notes] = await Promise.all([
    noteQuery.clone().countDocuments(),
    noteQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, `Note with ID: ${noteId} not found`);
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;

  const deletedNote = await Note.findByIdAndDelete(noteId);

  if (!deletedNote) {
    throw createHttpError(404, `Note with ID: ${noteId} not found`);
  }

  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const noteId = req.params.noteId;

  const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
  });

  if (!updatedNote) {
    throw createHttpError(404, `Note with ID: ${noteId} not found`);
  }

  res.status(200).json(updatedNote);
};
