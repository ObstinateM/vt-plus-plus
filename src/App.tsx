import { useEffect, useState } from 'react';
import { NextUIProvider, createTheme, Link, Modal, Text, Button } from '@nextui-org/react';
import { NavbarComp } from './components/NavbarComp';
import { EDT } from './components/EDT';
import { InputCode } from './components/InputCode';
import { useLocalStorage } from './hooks/useLocalstorage';
import { useLocalStorageUpdate } from './hooks/useLocalstorageUpdate';
import { createGlobalStyle } from 'styled-components';
import { Center, ClassHour, ClassNameDisplay } from './components/Edt-part';

const lightTheme = createTheme({
  type: 'light'
});

const darkTheme = createTheme({
  type: 'dark'
});

const GlobalStyle = createGlobalStyle`
  @media screen and (max-height: 1100px) {
    ${ClassHour} {
      font-size: 8px;
    }
    ${ClassNameDisplay} {
      font-size: 9px;
    }
  }
`;

function App() {
  const lastUpdate = 'exam';
  const [codeStorage, setCodeStorage] = useLocalStorage('code', '');
  const [code, setCode] = useState(codeStorage);
  const [isLightMode, setLightMode] = useState(true);
  const [updateStorage, setUpdateStorage] = useLocalStorageUpdate('update', lastUpdate);
  const [updateVisible, setUpdateVisible] = useState(updateStorage === `${lastUpdate}:no`);
  const changeTheme = () => setLightMode(mode => !mode);

  const updateCode = (newCode: string, remember: boolean) => {
    newCode = newCode.toLocaleLowerCase();
    setCode(newCode);
    if (remember) setCodeStorage(newCode);
  };

  const updateClose = () => {
    setUpdateStorage(`${lastUpdate}:yes`);
    setUpdateVisible(false);
  };

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setLightMode(false);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      setLightMode(!event.matches);
    });
  }, []);

  return (
    <NextUIProvider theme={isLightMode ? lightTheme : darkTheme}>
      <GlobalStyle />
      <NavbarComp
        changeTheme={changeTheme}
        code={code}
        deleteCode={updateCode}
        isLight={isLightMode}
      />
      <Modal
        closeButton
        aria-labelledby="modal-patchnote"
        open={updateVisible}
        onClose={updateClose}
      >
        <Modal.Header>
          <Text id="modal-title" size={18} b>
            Note de mis à jour
          </Text>
        </Modal.Header>
        <Modal.Body>
          <p>Vous pouvez désormais voir vos prochains examens (voir en dessous de l'edt)</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={updateClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {code !== '' && <EDT code={code} />}
      {code === '' && <InputCode setCode={updateCode} />}
      <Center>
        <Link
          href="https://github.com/ObstinateM/vt-plus-plus"
          isExternal
          color="secondary"
          css={{ pt: '20px', pb: '20px' }}
        >
          Developped by Mathis "Obstinate" Beauville - See source code
        </Link>
      </Center>
    </NextUIProvider>
  );
}

export default App;
