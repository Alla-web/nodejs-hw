import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: {
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  },
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least 1 characters',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: {{#valids}}`,
      }),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.error('noteId.invalid') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().required().custom(objectIdValidator).messages({
      'noteId.invalid': `Note ID - {#value} - must be valid mongo ID (24 characters in hex-format)`,
    }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().required().custom(objectIdValidator).messages({
      'noteId.invalid': `Note ID - {#value} - must be valid mongo ID (24 characters in hex-format)`,
    }),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least 1 characters',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: {{#valids}}`,
      }),
  }).min(1),
};
