// Takes a date and returns if said date is today.
export function isToday(givenDate: Date): boolean {
  const today = new Date();
  return (
    today.getDate() === givenDate.getDate() &&
    today.getMonth() === givenDate.getMonth() &&
    today.getFullYear() === givenDate.getFullYear()
  );
}

const ONE_DAY = 24 * 60 * 60 * 1000;

// Returns a timestmap number (in milliseconds), left until the next day.
export function timeUntilEndOfDay(): number {
  return ONE_DAY - (Math.floor(new Date().getTime()) % ONE_DAY);
}
