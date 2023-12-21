export const getLastWord = (text: string) => {
  const words = text.trim().split(' ');

  return words[words.length - 1];
};
