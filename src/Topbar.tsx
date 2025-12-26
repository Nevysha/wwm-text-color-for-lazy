import { Box, IconButton, useColorScheme } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Topbar = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const deduceNextColor = () => {
    if (!mode) return 'dark';

    switch (mode) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
      default:
        return 'dark';
    }
  };

  const toggleColorMode = () => {
    setMode(deduceNextColor());
  };

  const goToGh = () => {
    window.open('https://github.com/Nevysha/wwm-text-color-for-lazy', '_blank');
  };

  const Icon = (() => {
    switch (mode) {
      case 'dark':
        return DarkModeOutlinedIcon;
      case 'light':
        return LightModeOutlinedIcon;
      default:
        return DarkModeOutlinedIcon;
    }
  })();

  const kofi = `<a href='https://ko-fi.com/G2G2L55CD' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi4.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    >
      <IconButton onClick={toggleColorMode}>
        <Icon />
      </IconButton>
      <IconButton onClick={goToGh}>
        <GitHubIcon />
      </IconButton>
      {/*<Button onClick={goToKofi}>KoFi</Button>*/}
      <div dangerouslySetInnerHTML={{ __html: kofi }}></div>
    </Box>
  );
};
