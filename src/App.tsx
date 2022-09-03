import { useState } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { NavbarComp } from './components/NavbarComp';
import { EDT } from './components/EDT';

const lightTheme = createTheme({
  type: 'light'
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      secondary: '#fff'
    }
  }
});

function App() {
  const [code, setCode] = useState('l3miaa');
  const [isLightMode, setLightMode] = useState(true);
  const changeTheme = () => setLightMode(mode => !mode);

  return (
    <NextUIProvider theme={isLightMode ? lightTheme : darkTheme}>
      <NavbarComp changeTheme={changeTheme} code={code} />
      <EDT code={code} />
    </NextUIProvider>
  );
}

export default App;
