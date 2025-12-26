import {Box, IconButton, useColorScheme, useTheme} from "@mui/material";
import {useContext, useMemo, useState} from "react";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

export const Topbar = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const deduceNextColor = () => {

    if (!mode) return 'dark';

    switch (mode) {
      case 'dark': return 'light';
      case 'light': return 'dark';
      default: return 'dark';
    }
  }

  const toggleColorMode = () => {
    setMode(deduceNextColor());
  }

  const Icon = (() => {
    switch (mode) {
      case 'dark': return DarkModeOutlinedIcon;
      case 'light': return LightModeOutlinedIcon;
      default: return DarkModeOutlinedIcon;
    }
  })()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        }}
    >
      <IconButton onClick={toggleColorMode}>
        <Icon />
      </IconButton>
    </Box>
  );
}