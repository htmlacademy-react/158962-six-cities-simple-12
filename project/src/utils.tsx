export const getRatingWidth = (rating: number, scale: number): number => {
  const num = Math.round(rating);
  return num / scale;
};

export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);
