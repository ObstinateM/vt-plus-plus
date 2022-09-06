import styled from 'styled-components';
import { Dispatch, useRef, useState } from 'react';
import { Input, Button, Checkbox, Card, Text } from '@nextui-org/react';

interface InputCodeProps {
  setCode: (code: string, remember: boolean) => void;
}

export function InputCode({ setCode }: InputCodeProps) {
  const newCode = useRef<HTMLFormElement>();
  // const remind = useRef();
  const [remind, setRemind] = useState(true);

  const onSubmit = (form: any) => {
    form.preventDefault();
    // @ts-ignore
    setCode(newCode.current.value, remind);
  };

  return (
    <form onSubmit={onSubmit} name="form">
      <InputDiv>
        <Card css={{ mw: '400px' }}>
          <Card.Header>
            <Text b>Connexion</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Input
              clearable
              labelPlaceholder="Entrez votre code"
              color="secondary"
              size="lg"
              // @ts-ignore
              ref={newCode}
              css={{ mt: '15px', mb: '15px' }}
            />
            <Checkbox
              color="secondary"
              defaultSelected={true}
              size="sm"
              css={{ mb: '15px' }}
              onChange={state => setRemind(state)}
            >
              Se souvenir
            </Checkbox>
            <Button type="submit" color="secondary" auto>
              Se connecter
            </Button>
          </Card.Body>
        </Card>
      </InputDiv>
    </form>
  );
}

const InputDiv = styled.div`
  border-top: 1px solid #000;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
