import { Button, Dropdown, Pagination, useTheme } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { EDTType } from "../@types/database";
import config, { SaturdayType } from "../assets/config";
import { getEventColor } from "../utils/colors";
import { getNextExam, getWeekEvent, getYearEdt } from "../utils/database";
import { getCurrentWeekNumber, getDateRangeOfWeek } from "../utils/date";
import {
    formatClassname,
    formatHours,
    formatUE,
    rangeHour,
    shouldBeFormatted,
} from "../utils/format";
import { getEventCoordinates } from "../utils/utils";
import {
    Center,
    ClassHour,
    ClassNameDisplay,
    Hours,
    PlaceItem,
    PlaceItemCenter,
    PlaceItemHours,
    PlaceItemNoStyle,
    Timetable,
} from "./Edt-part";
import { ExamList } from "./ExamList";

export const hours = [
    "8:00",
    "8:15",
    "8:30",
    "8:45",
    "9:00",
    "9:15",
    "9:30",
    "9:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
];

export function EDT({ code }: { code: string }) {
    const currentYear = new Date().getFullYear();
    const [edt, setEDT] = useState<EDTType | null>(null);
    const [weekEvent, setWeekEvent] = useState<any[]>([[], [], [], [], [], []]);
    const [weekNumber, setWeekNumber] = useState<number>(getCurrentWeekNumber());
    const [year, setYear] = useState(currentYear);
    const [weekDate, setWeekDate] = useState<string[]>([]);
    const [nextExam, setNextExam] = useState<any[]>([]);
    const [days, setDays] = useState<string[]>([]);
    const { type } = useTheme();

    const setYearProxy = (_year: any) => {
        const tmp = _year.entries().next().value;
        setYear(tmp[0]);
    };

    // Get the current week event, set it has state for UI
    // and handle the saturday config
    const updateWeekEvent = () => {
        if (!edt) return;
        const weekE = getWeekEvent(edt, weekNumber, year);
        const isSaturdayEnabled = (config.saturday as SaturdayType) === SaturdayType.enable;
        const isSaturdayInAuto = (config.saturday as SaturdayType) === SaturdayType.auto;

        if (isSaturdayEnabled || (isSaturdayInAuto && weekE[5].length > 0)) {
            setDays(["Lun", "Mar", "Mer", "Jeu", "Ven", "Sat"]);
        } else {
            setDays(["Lun", "Mar", "Mer", "Jeu", "Ven"]);
        }

        setWeekEvent(weekE);
        setWeekDate(getDateRangeOfWeek(weekNumber));
    };

    const onWeekChange = (number: number): void => {
        setWeekNumber((actual) => {
            if (actual + number < 1) {
                setYear((year) => year - 1);
                return 52;
            }

            if (actual + number > 52) {
                setYear((year) => year + 1);
                return 1;
            }

            return actual + number;
        });
    };

    useEffect(() => {
        getYearEdt(code.toLowerCase())
            .then((edt) => setEDT(edt))
            .catch(() => console.log("Failed to load EDT"));
        document.addEventListener("keyup", (event) => {
            event.preventDefault();

            if (event.key === "ArrowRight") {
                onWeekChange(1);
            }

            if (event.key === "ArrowLeft") {
                onWeekChange(-1);
            }

            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                setWeekNumber(getCurrentWeekNumber());
                setYear(currentYear);
            }
        });
    }, []);

    useEffect(() => {
        updateWeekEvent();
    }, [weekNumber]);

    useEffect(() => {
        updateWeekEvent();
    }, [year]);

    useEffect(() => {
        if (!edt) return;
        updateWeekEvent();
        setNextExam(getNextExam(edt!));
    }, [edt]);

    return (
        <>
            <Timetable
                type={type}
                saturday={
                    (config.saturday as SaturdayType) === SaturdayType.enable ||
                    ((config.saturday as SaturdayType) === SaturdayType.auto &&
                        weekEvent[5].length > 0)
                }
            >
                <PlaceItemNoStyle gridColumn="1" gridRow="1"></PlaceItemNoStyle>

                {days.map((day, index) => (
                    <PlaceItemCenter gridColumn={index + 2} gridRow="1" key={index}>
                        {day}
                        <b>{weekDate[index]}</b>
                    </PlaceItemCenter>
                ))}

                {hours.map((hour, index) => (
                    <PlaceItemHours gridColumn="1" gridRow={index + 2} key={index} type={type}>
                        <Hours>{hour}</Hours>
                    </PlaceItemHours>
                ))}

                {weekEvent.map((day: any, index: number) => {
                    return day.map((event: any) => {
                        const { startCoord, endCoord } = getEventCoordinates(event);
                        const { bgColor, borderColor } = getEventColor(type, event.summary);
                        return (
                            <PlaceItem
                                bgColor={bgColor}
                                borderColor={borderColor}
                                gridColumn={index + 2}
                                gridRow={`${startCoord} / ${endCoord}`}
                                key={event.id}
                            >
                                {rangeHour(event) >= 90 ? (
                                    <ClassNameDisplay>
                                        {formatClassname(
                                            shouldBeFormatted(code)
                                                ? formatUE(event.summary, code)
                                                : event.summary,
                                        )}
                                    </ClassNameDisplay>
                                ) : (
                                    false
                                )}
                                {rangeHour(event) >= 90 ? (
                                    <ClassHour>
                                        {formatHours(event)} ― {event.location}
                                    </ClassHour>
                                ) : (
                                    <ClassHour>
                                        {formatHours(event)} ― {event.location} -
                                        {formatClassname(
                                            shouldBeFormatted(code)
                                                ? formatUE(event.summary, code)
                                                : event.summary,
                                        )}
                                    </ClassHour>
                                )}
                                {config.organizer && <ClassHour> {event.organizer} </ClassHour>}
                            </PlaceItem>
                        );
                    });
                })}
            </Timetable>
            <Center>
                <Button
                    auto
                    light
                    css={{ mt: "6px" }}
                    color="secondary"
                    onPress={() => onWeekChange(-1)}
                >
                    &#60;
                </Button>
                <Pagination
                    color="secondary"
                    total={52}
                    controls={false}
                    page={weekNumber}
                    onChange={(number: number) => setWeekNumber(number)}
                    css={{ mt: "10px" }}
                />
                <Button
                    auto
                    light
                    css={{ mt: "6px" }}
                    color="secondary"
                    onPress={() => onWeekChange(1)}
                >
                    &#62;
                </Button>
                <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                    <Dropdown>
                        <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                            {year}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={[currentYear, currentYear - 1, currentYear + 1]}
                            onSelectionChange={setYearProxy}
                        >
                            <Dropdown.Item
                                textValue={String(currentYear - 1)}
                                key={currentYear - 1}
                            >
                                {currentYear - 1}
                            </Dropdown.Item>
                            <Dropdown.Item textValue={String(currentYear)} key={currentYear}>
                                {currentYear}
                            </Dropdown.Item>
                            <Dropdown.Item
                                textValue={String(currentYear + 1)}
                                key={currentYear + 1}
                            >
                                {currentYear + 1}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Center>
            <ExamList exam={nextExam} code={code} />
        </>
    );
}
