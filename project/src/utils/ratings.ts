export function ratingToString(rating: number): string {
  if (rating >= 3) {
    if (rating >= 5) {
      if (rating >= 8) {
        if (rating === 10) {
          return 'Awesome';
        }
        return 'Very good';
      }
      return 'Good';
    }
    return 'Normal';
  }

  return 'Bad';
}
