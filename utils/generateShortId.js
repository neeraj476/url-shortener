import { nanoid } from 'nanoid';

export const generateShortId = () => {
  return nanoid(6); // Generates a short, unique ID of length 6
};

