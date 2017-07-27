import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { 
  deepPurple600,
  cyan500, 
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    primary1Color: deepPurple600,
    primary2Color: 'rgb(99, 116, 161)',
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
  button: {
    textTransform: 'none',
    iconButtonSize: 12,
  },
});

export default theme;