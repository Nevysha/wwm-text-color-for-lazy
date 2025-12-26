import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ColorPicker } from './ColorPicker.tsx';
import { Topbar } from './Topbar.tsx';

let initFlag = false;

const App = () => {
  const [colorFrom, setColorFrom] = useState('#bd10e0');
  const [colorTo, setColorTo] = useState('#ffffff');
  const [rawText, setRawText] = useState('Nevysha is so cute tbh');
  const [textToCopy, setTextToCopy] = useState(rawText);
  const [coloredText, setColoredText] = useState(rawText);

  const applyColor = () => {
    setTextToCopy(`${colorFrom} ${rawText}`);
    setColoredText(`<span style="color: ${colorFrom}">${rawText}</span>`);
  };

  const interpolateColor = (hex: string, targetHex: string, factor: number) => {
    const r1 = parseInt(hex.slice(1, 3), 16);
    const g1 = parseInt(hex.slice(3, 5), 16);
    const b1 = parseInt(hex.slice(5, 7), 16);

    const r2 = parseInt(targetHex.slice(1, 3), 16);
    const g2 = parseInt(targetHex.slice(3, 5), 16);
    const b2 = parseInt(targetHex.slice(5, 7), 16);

    const newR = Math.round(r1 + (r2 - r1) * factor);
    const newG = Math.round(g1 + (g2 - g1) * factor);
    const newB = Math.round(b1 + (b2 - b1) * factor);

    return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toLowerCase()}`;
  };

  const applyColorGradiantToLight = () => {
    let resultTextToCopy = '';
    let resultColoredText = '';

    for (let i = 0; i < rawText.length; i++) {
      const char = rawText[i];
      const factor = (i / (rawText.length > 1 ? rawText.length - 1 : 1)) * 0.7;
      const blendedHex = interpolateColor(colorFrom, '#ffffff', factor);

      resultTextToCopy += `${blendedHex}${char}`;
      resultColoredText += `<span style="color: ${blendedHex}">${char}</span>`;
    }

    setTextToCopy(resultTextToCopy);
    setColoredText(resultColoredText);
  };

  const applyColorGradiantToDark = () => {
    let resultTextToCopy = '';
    let resultColoredText = '';

    for (let i = 0; i < rawText.length; i++) {
      const char = rawText[i];
      const factor = (i / (rawText.length > 1 ? rawText.length - 1 : 1)) * 0.7;
      const blendedHex = interpolateColor(colorFrom, '#000000', factor);

      resultTextToCopy += `${blendedHex}${char}`;
      resultColoredText += `<span style="color: ${blendedHex}">${char}</span>`;
    }

    setTextToCopy(resultTextToCopy);
    setColoredText(resultColoredText);
  };

  const applyColorGradientBetween = () => {
    let resultTextToCopy = '';
    let resultColoredText = '';

    for (let i = 0; i < rawText.length; i++) {
      const char = rawText[i];
      const factor = i / (rawText.length > 1 ? rawText.length - 1 : 1);
      const blendedHex = interpolateColor(colorFrom, colorTo, factor);

      resultTextToCopy += `${blendedHex}${char}`;
      resultColoredText += `<span style="color: ${blendedHex}">${char}</span>`;
    }

    setTextToCopy(resultTextToCopy);
    setColoredText(resultColoredText);
  };

  const safeSetColor = (
    newColor: string,
    setter: Dispatch<SetStateAction<string>>,
  ) => {
    // ensure strict hex format with 6 digits. Convert shorthand to full form
    let hex = newColor.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    hex = hex.toLowerCase();
    setter('#' + hex);
  };

  useEffect(() => {
    if (initFlag) return;
    initFlag = true;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyColorGradientBetween();
  }, [applyColorGradientBetween]);

  return (
    <Stack sx={{ gap: '10px' }}>
      <Topbar />
      <TextField
        id='multiline-static'
        label='Your Text'
        multiline
        rows={4}
        onChange={(e) => setRawText(e.target.value)}
        value={rawText}
      />

      <Divider />

      <Stack
        direction='row'
        spacing={2}
      >
        <ColorPicker
          color={colorFrom}
          setColor={(color: string) => safeSetColor(color, setColorFrom)}
        />
        <ColorPicker
          color={colorTo}
          setColor={(color: string) => safeSetColor(color, setColorTo)}
        />
      </Stack>

      <Button onClick={applyColor}>Apply Simple</Button>
      <Button onClick={applyColorGradiantToLight}>
        Apply Gradiant from color1 to light
      </Button>
      <Button onClick={applyColorGradiantToDark}>
        Apply Gradiant from color1 to dark
      </Button>
      <Button onClick={applyColorGradientBetween}>
        Apply Gradiant Between color1 and color2
      </Button>

      <Paper>
        <Stack sx={{ padding: '10px' }}>
          <Typography>Preview:</Typography>
          <div dangerouslySetInnerHTML={{ __html: coloredText }}></div>
        </Stack>
      </Paper>

      <Paper>
        <Stack sx={{ padding: '10px' }}>
          <Typography>Copy in game:</Typography>
          <div dangerouslySetInnerHTML={{ __html: textToCopy }}></div>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default App;
