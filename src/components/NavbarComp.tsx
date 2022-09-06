import { useState } from 'react';
import { Navbar, Link, Text, Switch } from '@nextui-org/react';
import MoonIcon from '../assets/MoonIcon.svg';
import SunIcon from '../assets/SunIcon.svg';

interface props {
  changeTheme: () => void;
  deleteCode: (newCode: '', remind: true) => void;
  code: string;
}

export function NavbarComp({ changeTheme, deleteCode, code }: props) {
  return (
    <Navbar variant="sticky">
      <Navbar.Brand
        css={{
          '@xs': {
            w: '12%'
          }
        }}
      >
        <Text b color="inherit">
          VT++
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        {code === '' && (
          <Navbar.Link isActive href="#">
            Se connecter
          </Navbar.Link>
        )}
        {code !== '' && (
          <>
            <Navbar.Link isActive href="#">
              {`Emploi du temps : ${code.toLocaleUpperCase()}`}
            </Navbar.Link>
            <Navbar.Link onPress={() => deleteCode('', true)} href="#">
              Changer de code
            </Navbar.Link>
          </>
        )}
      </Navbar.Content>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end'
          }
        }}
      >
        <Switch
          checked={true}
          size="xl"
          color="secondary"
          iconOn={<img src={SunIcon} />}
          iconOff={<img src={MoonIcon} />}
          onChange={changeTheme}
        />
      </Navbar.Content>
    </Navbar>
  );
}
