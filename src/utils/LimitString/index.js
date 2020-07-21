export const LimitString = (string, maxLength) => {
  let newString = string;
  if (string.length > maxLength) {
    newString = newString.substring(0, maxLength) + '...';
  }
  return newString;
};
