import styled from 'styled-components';

export const Timetable = styled.div`
  display: flex;
`;

export const HoursColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
`;

export const HoursDisplay = styled.div`
  margin-bottom: 40px;
`;

export const WeekPane = styled.div`
  background-color: #f55555;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const WeekRow = styled.div`
  background-color: #fee;
  width: 100%;
  display: flex;
`;

export const BlockName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: calc(100% / 5);
  height: 50px;
`;

export const BlockCours = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  width: calc(100% / 5);
`;

export const Cours = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;
