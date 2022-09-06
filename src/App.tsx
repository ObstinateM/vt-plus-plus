import { useState } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { NavbarComp } from './components/NavbarComp';
import { EDT } from './components/EDT';
import { InputCode } from './components/InputCode';

const lightTheme = createTheme({
  type: 'light'
});

const darkTheme = createTheme({
  type: 'dark'
});

/**
 * Rendre fonctionnel "se souvenir"
 * UI si height écran plus petite ?
 * Hotkey fleche pour changer de semaine
 * Gérer si les cours sont trop petit
 */
function App() {
  const [code, setCode] = useState('');
  const [isLightMode, setLightMode] = useState(true);
  const changeTheme = () => setLightMode(mode => !mode);
  const deleteCode = () => setCode('');

  return (
    <NextUIProvider theme={isLightMode ? lightTheme : darkTheme}>
      <NavbarComp changeTheme={changeTheme} code={code} deleteCode={deleteCode} />
      {code !== '' && <EDT code={code} />}
      {code === '' && <InputCode setCode={setCode} />}
    </NextUIProvider>
  );
}

export default App;
