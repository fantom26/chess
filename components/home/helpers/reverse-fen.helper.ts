export const reverseFen = (fen: string) => {
  const fenArr = fen.split(" ");
  const [fenBoard] = fenArr;
  return [fenBoard.split("").reverse().join(""), ...fenArr.slice(1)].join(" ");
};