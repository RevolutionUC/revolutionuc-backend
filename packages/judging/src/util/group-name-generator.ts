import { militarizeText } from 'military-speak';

export const groupNameGenerator = (length: number): string[] => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const limit = alphabet.substr(0, length);
  const names: string[] = militarizeText(limit).split(' ');

  return names;
};
