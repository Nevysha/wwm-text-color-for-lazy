import {SketchPicker} from 'react-color'
import {Box} from "@mui/material";

export const ColorPicker = ({color, setColor}) => {

  return (
    <Box>
      <SketchPicker
        color={color}
        onChangeComplete={({hex}) => setColor(hex)}
      />
    </Box>
  )
}