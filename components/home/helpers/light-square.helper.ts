export const isLightSquare = (position: string, index: number) => {
  const row = position[1];
  const isEven = (x: number) => !(x % 2);

  if (isEven(row) && !isEven(index + 1)) {
    return true;
  }

  if (isEven(index + 1) && !isEven(row)) {
    return true;
  }
  return false;
};
