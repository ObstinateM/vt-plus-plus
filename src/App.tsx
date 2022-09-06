import { useState } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { NavbarComp } from './components/NavbarComp';
import { EDT } from './components/EDT';
import { InputCode } from './components/InputCode';
import { useLocalStorage } from './hooks/useLocalstorage';

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
  const [codeStorage, setCodeStorage] = useLocalStorage('code', '');
  const [code, setCode] = useState(codeStorage);
  const [isLightMode, setLightMode] = useState(true);
  const changeTheme = () => setLightMode(mode => !mode);
  const deleteCode = () => setCode('');

  const updateCode = (newCode: string, remember: boolean) => {
    setCode(newCode);
    if (remember) setCodeStorage(newCode);
  };

  return (
    <NextUIProvider theme={isLightMode ? lightTheme : darkTheme}>
      <NavbarComp changeTheme={changeTheme} code={code} deleteCode={deleteCode} />
      {code !== '' && <EDT code={code} />}
      {code === '' && <InputCode setCode={updateCode} />}
    </NextUIProvider>
  );
}

export default App;
