import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({  // #1
    palette: {
        primary: {
            light: '#ffa4a2',
            main: '#e57373',
            dark: '#af4448',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#b2fef7',
            main: '#80cbc4',
            dark: '#4f9a94',
            contrastText: '#00000',
        },
    },
})