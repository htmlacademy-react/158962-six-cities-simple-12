export const getRating = (rating: number): number => {
  const num = Math.round(rating);
  if (num === 5) {
    return 100;
  } else if (num === 4) {
    return 80;
  } else if (num === 3) {
    return 60;
  } else if (num === 2) {
    return 40;
  } else if (num === 1) {
    return 20;
  }

  return num;
};

export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);
