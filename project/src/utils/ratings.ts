export function ratingToString(rating: number): string {
  if (rating >= 2) {
    if (rating >= 4) {
      if (rating >= 6) {
        if (rating >= 8) {
          return 'Very good';
        }
        return 'Good';
      }
      return 'Ok';
    }
    return 'Bad';
  }

  return 'Very bad';
}
