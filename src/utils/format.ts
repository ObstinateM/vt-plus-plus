export function formatMinutes(minutes: number) {
  if (minutes === 0) return '00';
  return minutes;
}

export function formatHours(event: any) {
  return `${event.start.getHours()}H${formatMinutes(
    event.start.getMinutes()
  )} - ${event.end.getHours()}H${formatMinutes(event.end.getMinutes())}`;
}
