export function getMessage(percent: number): string {
  if (percent > 0.9) {
    return "Wow, you're absolutely thriving! Keep up the fantastic work!";
  }

  if (percent > 0.75) {
    return "Looks like you're doing great! Keep up the positive momentum!";
  }

  if (percent > 0.6) {
    return "You're doing well, and we're here to support you on your journey!";
  }

  if (percent > 0.5) {
    return "Doing okay, but remember to take care of yourself. You've got this!";
  }

  if (percent > 0.4) {
    return "It seems like you're facing some challenges, but don't worry, we're here to help you overcome them!";
  }

  if (percent > 0.3) {
    return "Not your best days, but remember that you're not alone. Reach out for support if you need it!";
  }

  if (percent > 0.2) {
    return "You're going through a tough time, but we believe in your strength. We're here to lend a helping hand!";
  }

  return "It seems like you're really struggling right now. Please click on the help links to see if we can help you do better.";
}
