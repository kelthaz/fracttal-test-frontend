// src/contexto/ThemeContext.jsx
import React, { createContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '../theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => { localStorage.setItem('theme', mode); }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
