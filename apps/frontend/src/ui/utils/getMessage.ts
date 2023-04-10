export function getMessage(percent: number): string {
  if (percent > 0.75) {
    return "Looks like you are doing great!";
  }

  if (percent > 0.5) {
    return "Doing Ok, keep going!";
  }

  if (percent > 0.25) {
    return "Not your best days, but we can help if you need!";
  }

  return "Please let us help, see these links";
}
