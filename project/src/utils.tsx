export const getRatingWidth = (rating: number, maxRating: number): number => {
  const num = maxRating / 100;
  return Math.round(rating) / num;
};

export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);
