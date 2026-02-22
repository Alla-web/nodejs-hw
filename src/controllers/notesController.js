import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({
    status: 200,
    message: 'Retrieved all notes',
    data: notes,
  });
};

export const getNoteById = async (req, res) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, `Note with ID: ${noteId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Retrieved note with ID: ${noteId}`,
    data: note,
  });
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json({
    status: 201,
    message: 'New note successfully created',
    data: newNote,
  });
};

export const deleteNote = async (req, res) => {
  const noteId = await req.params.noteId;

  const deletedNote = await Note.findByIdAndDelete(noteId);

  if (!deletedNote) {
    throw createHttpError(404, `Note with ID: ${noteId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Note with ID: ${noteId} successfully deleted`,
    data: deletedNote,
  });
};

export const updateNote = async (req, res) => {
  const noteId = await req.params.noteId;

  const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
  });

  if (!updatedNote) {
    throw createHttpError(404, `Note with ID: ${noteId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Note with ID: ${noteId} successfully updated`,
    data: updatedNote,
  });
};
