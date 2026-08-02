import { createTheme } from "@mui/material/styles";
import { colors } from "./palette";
import { typography } from "./typography";

const theme = createTheme({
    palette: {
        primary: {
            main: colors.olive,
        },
        background: {
            default: colors.lightLime,
            paper: colors.paper,
        },  
    },
    typography
});

export default theme;