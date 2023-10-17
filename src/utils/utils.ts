import { Event } from "../@types/database";

export function getEventCoordinates({ start, end }: { start: Date; end: Date }) {
    return {
        startCoord: 2 + ((start.getHours() - 8) * 60) / 15 + start.getMinutes() / 15,
        endCoord: 2 + ((end.getHours() - 8) * 60) / 15 + end.getMinutes() / 15,
    };
}

export function isExam(className: string) {
    let str = className.split(" ");
    let type = str[str.length - 1];
    return type === "Examen" || type === "DS";
}

export function isInFuture(event: any) {
    if (event.start <= new Date()) return false;
    return true;
}

// School year are from 1st of September to 31st of August
// So for year 2023, it's from 2023-09-01 to 2024-08-31
// To know in which school year we are, we check for today's date
// If it's before 1st of September, we are in the previous year
export function isInSchoolYear(event: Event) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const start = new Date(year, 8, 1);
    const end = new Date(year + 1, 7, 31);

    if (month < 8) {
        start.setFullYear(year - 1);
        end.setFullYear(year);
    }

    if (event.start >= start && event.start <= end) return true;
    return false;
}
