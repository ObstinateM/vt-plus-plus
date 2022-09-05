import { useState } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { NavbarComp } from './components/NavbarComp';
import { EDT } from './components/EDT';
import { InputCode } from './components/InputCode';
import { useTheme } from '@nextui-org/react';

const lightTheme = createTheme({
  type: 'light'
});

const darkTheme = createTheme({
  type: 'dark'
});

/**
 * Régler les CORS => Créer une API tampon qui query l'ical et qui le renvoit direct => en go?
 */
function App() {
  const [code, setCode] = useState('l3miaa');
  const [isLightMode, setLightMode] = useState(true);
  const changeTheme = () => setLightMode(mode => !mode);

  const deleteCode = () => setCode('');
  const { theme } = useTheme();
  console.log(theme);

  return (
    <NextUIProvider theme={isLightMode ? lightTheme : darkTheme}>
      <NavbarComp changeTheme={changeTheme} code={code} deleteCode={deleteCode} />
      {code !== '' && <EDT code={code} />}
      {code === '' && <InputCode setCode={setCode} />}
    </NextUIProvider>
  );
}

export default App;
