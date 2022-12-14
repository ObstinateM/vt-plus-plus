import { Navbar, Text, Switch } from '@nextui-org/react';
import MoonIcon from '../assets/MoonIcon.svg';
import SunIcon from '../assets/SunIcon.svg';
import config from '../assets/config';
import { CodeNavbar } from './CodeNavbar';

interface props {
  changeTheme: () => void;
  deleteCode: (newCode: string, remind: boolean) => void;
  code: string;
  isLight: boolean;
}

export function NavbarComp({ changeTheme, deleteCode, code, isLight }: props) {
  return (
    <Navbar variant="static">
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
        {config.useCode && <CodeNavbar code={code} deleteCode={deleteCode}/>}
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
          checked={isLight}
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
