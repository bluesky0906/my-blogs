import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({  // #1
    palette: {
        primary: {
            light: '#ffcccb',
            main: '#ef9a9a',
            dark: '#ba6b6c',
            contrastText: '#000000',
        },
        secondary: {
            light: '#ffffb3',
            main: '#ffe082',
            dark: '#caae53',
            contrastText: '#00000',
        },
    },
})