import { useEffect } from 'react';
import { Table } from '@nextui-org/react';
import styled from 'styled-components';
import { formatClassname, formatHours } from '../utils/format';

const MarginDiv = styled.div`
  padding: 5rem;

  @media screen and (max-height: 1100px) {
    padding: 5rem 2rem;
  }
`;

export function ExamList({ exam }: any) {
  useEffect(() => {
    console.log(exam);
  }, [exam]);

  return (
    <MarginDiv>
      <h3>Vos prochains examens :</h3>
      <Table
        aria-label="Example table with static content"
        css={{
          height: 'auto',
          minWidth: '100%'
        }}
      >
        <Table.Header>
          <Table.Column>NOM</Table.Column>
          <Table.Column>DATE</Table.Column>
          <Table.Column>HORAIRES</Table.Column>
          <Table.Column>SALLE</Table.Column>
        </Table.Header>
        <Table.Body>
          {exam.map((el: any) => (
            <Table.Row key="1">
              <Table.Cell>{formatClassname(el.summary)}</Table.Cell>
              <Table.Cell>
                {el.start.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Table.Cell>
              <Table.Cell>{formatHours(el)}</Table.Cell>
              <Table.Cell>{el.location}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </MarginDiv>
  );
}
