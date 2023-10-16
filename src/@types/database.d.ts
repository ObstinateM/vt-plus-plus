export type EDTType = {
    [year: number]: Event[];
};

export type Event = {
    start: Date;
    end: Date;
    summary: string;
    location: string;
    organizer: string;
};
