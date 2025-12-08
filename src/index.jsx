import {render} from 'preact';
import './main.scss';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import './config.js'
import 'animate.css'
import {createTheme, ThemeProvider} from "@mui/material";
import Home from "./components/Home.jsx";
import {DialogContainer} from "./utils/DialogContainer.jsx";
import {Toaster} from "react-hot-toast";

let theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(142,42,254,0.63)',
        },
    },
});


export function App() {

    return (
        <ThemeProvider theme={theme}>
            <Home/>
            <Toaster/>
            <DialogContainer/>
        </ThemeProvider>
    );
}

render(<App/>, document.getElementById('app'));
