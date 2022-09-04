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
 * TODO: Update la navbar, l'active n'est pas update si on change le texte
 * Dark mode => gérer toutes les couleurs
 */
function App() {
  const [code, setCode] = useState('l3miaa');
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
