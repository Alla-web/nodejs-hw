import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

import {
  findUserService,
  createNewSessionService,
  setSessionCookies,
} from '../services/auth.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await findUserService(email, password);
  if (existingUser) throw createHttpError(400, `Email - ${email} - in use`);

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashPassword });

  const newSession = await createNewSessionService(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserService(email);
  if (!user) throw createHttpError(401, `User with email ${email} not found`);

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw createHttpError(401, 'Invalid credantials');

  await Session.deleteOne({ userId: user._id });

  const newSession = await createNewSessionService(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) await Session.deleteOne({ _id: sessionId });

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSession = async (req, res) => {
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  if (!session) throw createHttpError(401, 'Unauthorized: session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshtokenValidUntil);
  if (isSessionTokenExpired)
    throw createHttpError(401, 'Session token expired');

  await Session.deleteOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  const newSession = await createNewSessionService(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: 'Session cuccessfuly refreshed' });
};
