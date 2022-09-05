import styled from 'styled-components';
import { Dispatch, useRef } from 'react';
import { Input, Button, Checkbox, FormElement } from '@nextui-org/react';

interface InputCodeProps {
  setCode: Dispatch<React.SetStateAction<string>>;
}

export function InputCode({ setCode }: InputCodeProps) {
  const newCode = useRef<HTMLFormElement>();
  const remind = useRef();

  return (
    <form
      onSubmit={() => {
        // @ts-ignore
        setCode(newCode.current.value);
      }}
    >
      <InputDiv>
        <Input
          clearable
          labelPlaceholder="Entrez votre code"
          color="secondary"
          size="lg"
          // @ts-ignore
          ref={newCode}
        />
        {/* @ts-ignore */}
        <Checkbox color="secondary" defaultSelected={true} size="sm" ref={remind}>
          Se souvenir
        </Checkbox>
        <Button type="submit" color="secondary" auto>
          Secondary
        </Button>
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

  & > * {
    margin: 10px;
  }
`;
