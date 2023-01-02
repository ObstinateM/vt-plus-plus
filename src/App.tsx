import { useEffect, useState } from 'react';
import { NextUIProvider, createTheme, Link, Modal, Text, Button } from '@nextui-org/react';
import { NavbarComp } from './components/NavbarComp';
import { EDT } from './components/EDT';
import { InputCode } from './components/InputCode';
import { useLocalStorage } from './hooks/useLocalstorage';
import { useLocalStorageUpdate } from './hooks/useLocalstorageUpdate';
import { createGlobalStyle } from 'styled-components';
import { Center, ClassHour, ClassNameDisplay } from './components/Edt-part';
import updateInfo from './assets/update.json';
import config from './assets/config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DayView from './components/DayView';

const lightTheme = createTheme({
  type: 'light'
});

const darkTheme = createTheme({
  type: 'dark'
});

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 750px) {
    ${ClassHour} {
      font-size: 8px;
    }
    ${ClassNameDisplay} {
      font-size: 9px;
    }
  }
`;

function App() {
  const [isLightMode, setLightMode] = useState(true);
  const changeTheme = () => setLightMode(mode => !mode);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setLightMode(false);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      setLightMode(!event.matches);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <EdtFull changeTheme={changeTheme} isLightMode={isLightMode} />
    },
    {
      path: '/inte/',
      element: <DayView />
    }
  ]);

  return (
    <NextUIProvider theme={isLightMode ? lightTheme : darkTheme}>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

// TODO: move this shit in a separate file
function EdtFull({ changeTheme, isLightMode }: { changeTheme: () => void; isLightMode: boolean }) {
  const [codeStorage, setCodeStorage] = useLocalStorage('code', '');
  const [code, setCode] = useState(codeStorage);
  const [updateStorage, setUpdateStorage] = useLocalStorageUpdate('update', updateInfo.name);
  const [updateVisible, setUpdateVisible] = useState(
    updateStorage!.replace('"', '') === `${updateInfo.name}:no`
  );

  const updateCode = (newCode: string, remember: boolean) => {
    newCode = newCode.toLocaleLowerCase();
    setCode(newCode);
    if (remember) setCodeStorage(newCode);
  };

  const updateClose = () => {
    setUpdateStorage(`${updateInfo.name}:yes`);
    setUpdateVisible(false);
  };
  return (
    <>
      <GlobalStyle />
      <NavbarComp
        changeTheme={changeTheme}
        code={code}
        deleteCode={updateCode}
        isLight={isLightMode}
      />
      {(!config.useCode || code !== '') && <EDT code={code} />}
      {config.useCode && code === '' && <InputCode setCode={updateCode} />}
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
          <p>{updateInfo.p}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={updateClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
    </>
  );
}

export default App;
