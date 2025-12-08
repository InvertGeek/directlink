import styled from "styled-components";
import {Button} from "@mui/material";
import {copyText, formatFileSize} from "../../utils/CommonUtils.jsx";

const Container = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
    width: 500px;
    max-width: 95vw;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: column;
    color: #8e2afe;
    word-break: break-all;
`


function FileDialog({data}) {

    const {name, size, url} = data


    return (
        <Container className={'shadow'}>
            <h3 className={'text-hide'}>文件: {name}</h3>
            <p>{formatFileSize(size ?? 0)}</p>
            <Button variant={'outlined'} onClick={() => {
                copyText(url);
            }}>
                复制地址
            </Button>
            <Button variant={'contained'} onClick={() => {
                window.open(url)
            }}>打开</Button>
        </Container>
    );
}


export default FileDialog;
