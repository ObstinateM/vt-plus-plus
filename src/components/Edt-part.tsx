import styled from 'styled-components';

export const Timetable = styled.div`
  display: grid;
  height: 80vh;
  grid-template-columns: 75px repeat(6, 1fr);
  grid-template-rows: 30px repeat(50, 1fr);
  grid-gap: 4px;
  background-color: #404040;
`;

interface PlaceItemProps {
  gridColumn: string;
  gridRow: string;
}

export const PlaceItem = styled.div<PlaceItemProps>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  background-color: #fff;
`;
