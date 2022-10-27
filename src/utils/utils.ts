export function getEventCoordinates({ start, end }: { start: Date; end: Date }) {
  return {
    startCoord: 2 + ((start.getHours() - 8) * 60) / 15 + start.getMinutes() / 15,
    endCoord: 2 + ((end.getHours() - 8) * 60) / 15 + end.getMinutes() / 15
  };
}

export function isExam(className: string) {
  let str = className.split(' ');
  let type = str[str.length - 1];
  return type === 'Examen' || type === 'DS';
}

export function isInFuture(event: any) {
  if (event.start <= new Date() || event.start.getFullYear() !== new Date().getFullYear())
    return false;
  return true;
}
