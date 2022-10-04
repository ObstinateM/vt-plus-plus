import { Badge, Table, Tooltip } from '@nextui-org/react';
import styled from 'styled-components';
import { formatClassname, formatHours, formatUE, shouldBeFormatted } from '../utils/format';

const MarginDiv = styled.div`
  padding: 5rem;

  @media screen and (max-height: 1100px) {
    padding: 5rem 2rem;
  }
`;

export function ExamList({ exam, code }: any) {
  return (
    <MarginDiv>
      <Tooltip
        content="Note: seul les examens de l'année en cours (non scolaire) sont affichés"
        placement="rightStart"
        contentColor="secondary"
      >
        <h3>
          Vos prochains examens
          <Badge color="secondary" variant="flat" css={{ marginLeft: '5px' }}>
            ?
          </Badge>
        </h3>
      </Tooltip>
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
            <Table.Row key={el.start}>
              <Table.Cell>
                {formatClassname(shouldBeFormatted(code) ? formatUE(el.summary, code) : el.summary)}
              </Table.Cell>
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
