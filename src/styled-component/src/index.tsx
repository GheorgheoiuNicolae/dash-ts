import 'array.prototype.fill';
import { CSSProperties, CSSWideKeyword, PureComponent } from 'react';
import AppStyles from './styles/AppStyles';
import Font from './styles/Font';
import styleConstants from './styles/styleConstants';

export interface Colors {
  alto: string;
  background: string;
  baliHai: string;
  baseGreen: string;
  bilbao: string;
  black: string;
  blackRussian: string;
  blackShadow: string;
  blueBayoux: string;
  blueCharcoal: string;
  blueDark: string;
  blueLight: string;
  blueLightest: string;
  bondieBlue: string;
  cinnabar: string;
  cornFlowerBlue: string;
  curiousBlue: string;
  darkGray: string;
  darkOrange: string;
  darkRed: string;
  dimGray: string;
  dodgerBlue: string;
  dustyGray: string;
  ebonyClay: string;
  error: string;
  flamingo: string;
  gainsboro: string;
  gray20: string;
  gray30: string;
  gray40: string;
  gray48: string;
  gray50: string;
  gray53: string;
  gray60: string;
  gray67: string;
  gray70: string;
  gray90: string;
  gray95: string;
  greenDark: string;
  greenDarker: string;
  harleyDavidsonOrange: string;
  inputBorderColor: string;
  inputBorderGray: string;
  inputText: string;
  limeade: string;
  lightGray: string;
  mandy: string;
  mangoTango: string;
  mantis: string;
  myrtle: string;
  nobel: string;
  orange: string;
  overviewHeaderBody: string;
  persimmon: string;
  pictonBlue: string;
  primary: string;
  primaryDarker: string;
  productRow: string;
  productRowInverted: string;
  productRowSubtext: string;
  secondary: string;
  secondaryDarker: string;
  secondGreen: string;
  snow: string;
  success: string;
  successDarker: string;
  summerSky: string;
  sunshade: string;
  sushi: string;
  tableBorder: string;
  textPrimary: string;
  textSecondary: string;
  thirdGreen: string;
  whisper: string;
  white: string;
  yellowDark: string;
  yellowLight: string;
  tableRowBorderColor: string;
  tableRowBackground: string;
}

export interface MediaQueries {
  max479: string;
  min480max767: string;
  max767: string;
  min768max991: string;
  max991: string;
  min992max1199: string;
  max1199: string;
  min1200: string;
  retina: string;
  webkit: string;
}

export interface Sizes {
  checkbox: string;
  container: string;
  inputFontSize: string;
  inputHeight: string;
  large: string;
  medium: string;
  small: string;
  tiny: string;
}

export interface Transitions {
  linear: string;
  tile: string;
}

export interface StyleConstants {
  colors: Colors;
  mediaQueries: MediaQueries;
  sizes: Sizes;
  transitions: Transitions;
}

export type StyleMap = StyleObject;

export interface StyleCallback {
  (localStyle: StyleMap, globalStyle: StyleConstants): StyleMap;
}

export type Style = StyleCallback | StyleMap;

export interface StyledComponentProps {
  style?: Style;
}

export interface InternalStyle {
  (styleConstants: StyleConstants): StyleMap;
}

export default class StyledComponent<P, S> extends PureComponent<P & StyledComponentProps, S> {

  getStyle(localStyle: InternalStyle): StyleMap {
    const computedLocalStyle = localStyle(styleConstants);
    const { style } = this.props as Readonly<StyledComponentProps>;

    if (!style) {
      return computedLocalStyle;
    }

    if (typeof style === 'function') {
      return style(computedLocalStyle, styleConstants);
    }

    return { ...computedLocalStyle, ...style as StyleMap };
  }

}

export type StyleObject = StyleMarkups;

export type Display = 'inline' | 'block' | 'flex' | 'inline-block' | 'inline-flex' | 'inline-table' | 'list-item' | 'table' | 'table-caption' | 'table-cell' | 'table-row' | 'none';
export type FontWeight = 300 | 400 | 700;

export interface StyleMarkups extends CSSProperties, RadiumPseudoProperties {
  display?: CSSWideKeyword | Display;
  fontWeight?: CSSWideKeyword | FontWeight;
}

export interface RadiumPseudoProperties {
  ':active'?: StyleObject;
  ':focus'?: StyleObject;
  ':hover'?: StyleObject;
}

export type Styles<K extends string> = {
  [P in K]: StyleObject;
};

export const styles = {
  styleConstants,
  AppStyles,
  Font,
};
