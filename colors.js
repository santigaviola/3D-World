import {Color} from 'three';

export const colors = {
  white: new Color( 0xFFFFFF ),
  silver: new Color( 0xC0C0C0 ),
  gray: new Color( 0x808080 ),
  black: new Color( 0x000000 ),
  red: new Color( 0xFF0000 ),
  maroon: new Color( 0x800000 ),
  yellow: new Color( 0xFFFF00 ),
  olive: new Color( 0x808000 ),
  lime: new Color( 0x00FF00 ),
  green: new Color( 0x008000 ),
  aqua: new Color( 0x00FFFF ),
  teal: new Color( 0x008080 ),
  blue: new Color( 0x0000FF ),
  navy: new Color( 0x000080 ),
  fuchsia: new Color( 0xFF00FF ),
  purple: new Color( 0x800080 )
};

export const randomColor = () => {
  const colorsArray = [];
  colorsArray.push(
    colors.red,
    colors.yellow,
    colors.lime,
    colors.aqua,
    colors.teal,
    colors.blue,
    colors.fuchsia
  );
  const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  return color;
};
