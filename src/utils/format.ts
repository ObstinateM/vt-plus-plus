export function formatMinutes(minutes: number) {
  if (minutes === 0) return '00';
  return minutes;
}

export function formatHours(event: any) {
  return `${event.start.getHours()}:${formatMinutes(
    event.start.getMinutes()
  )} - ${event.end.getHours()}:${formatMinutes(event.end.getMinutes())}`;
}
