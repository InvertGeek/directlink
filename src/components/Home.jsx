import styled from "styled-components";

import logo from '../assets/logo.png'
import FileUpload from "./file/FileUpload.jsx";
import FileHistory from "./file/FileHistory.jsx";

const Container = styled.div`
    margin: 5vh auto;
    display: flex;
    justify-content: center;
    //border: 1px solid rgba(160, 158, 158, 0.45);
    width: 1400px;
    max-width: 90vw;
    padding: 10px;
    border-radius: 10px;
    //box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    flex-direction: column;
    gap: 20px;
    align-items: center;


    .title {
        display: flex;
        align-items: center;
        gap: 20px;
        justify-content: center;

        h1 {
            font-size: max(3vw, 50px);
        }

        .logo {
            height: max(5vw, 100px);
            width: max(5vw, 100px);
            display: flex;

            img {
                width: 100%;
                transition: .3s;
                filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
`

function Home(props) {

    return (
        <Container>
            <div className="title no-select">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <h1 className={'gradient-text'}>DirectLink</h1>
            </div>
            <FileUpload/>
            <FileHistory/>
            <div class="github">
                <a
                    href={'https://github.com/InvertGeek/directlink'}
                    className={'gradient-text'}
                    target="_blank"
                >
                    https://github.com/InvertGeek/directlink
                </a>
            </div>
        </Container>
    );
}

export default Home;
