import styled from 'styled-components';

interface TimetableProps {
    type: string;
    saturday: boolean;
}

interface DayTimetableProps {
    type: string;
    showHours: boolean;
}

export const Timetable = styled.div<TimetableProps>`
    display: grid;
    grid-template-columns: 30px repeat(${props => (props.saturday ? '6' : '5')}, 3fr);
    grid-template-rows: 50px repeat(48, minmax(10px, calc(80vh / 50)));
    grid-column-gap: 4px;
    border-top: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
    border-bottom: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
`;

export const DayTimetable = styled.div<DayTimetableProps>`
    display: grid;
    grid-template-columns: ${props => (props.showHours ? '30px' : '0')} 1fr;
    grid-template-rows: 50px repeat(48, minmax(10px, calc(80vh / 50)));
    grid-column-gap: 4px;
    border-top: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
    border-bottom: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
`;

interface PlaceItemProps {
    gridColumn: string | number;
    gridRow: string | number;
}

interface PlaceItemWithBorderProps {
    gridColumn: string | number;
    gridRow: string | number;
    type: string;
}

interface PlaceItemPropsColor {
    gridColumn: string | number;
    gridRow: string | number;
    bgColor: string;
    borderColor: string;
}
//Course subjects
export const PlaceItem = styled.div<PlaceItemPropsColor>`
    grid-column: ${props => props.gridColumn};
    grid-row: ${props => props.gridRow};
    display: flex;
    background-color: ${props => props.bgColor};
    border: 1.5px solid ${props => props.borderColor};
    border-radius: 5px;
    text-overflow: ellipsis;
    justify-content: flex-end;
    flex-direction: column;
    padding: 5px;
`;

export const PlaceItemCenter = styled.div<PlaceItemProps>`
    box-sizing: border-box;
    grid-column: ${props => props.gridColumn};
    grid-row: ${props => props.gridRow};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-overflow: ellipsis;
`;

export const PlaceItemHours = styled.div<PlaceItemWithBorderProps>`
    grid-column: ${props => props.gridColumn};
    grid-row: ${props => props.gridRow};
    display: flex;
    border-top: 1px solid ${props => (props.type === 'light' ? '#000' : '#fff')};
    justify-content: flex-end;
`;

export const PlaceItemNoStyle = styled.div<PlaceItemProps>`
    grid-column: ${props => props.gridColumn};
    grid-row: ${props => props.gridRow};
`;

export const Hours = styled.div`
    margin-top: -13px;
    font-size: 9px;
`;

export const ClassNameDisplay = styled.p`
    font-size: 0.8rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    /* color: #000; */
`;

export const ClassHour = styled.p`
    font-size: 0.75rem;
    /* color: #000; */
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
`;
export const reduceItem = styled.p<JSX.IntrinsicElements>`
    display: flex;
`;
