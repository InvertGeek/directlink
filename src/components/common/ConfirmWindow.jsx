import styled from "styled-components";
import {Button} from "@mui/material";
import {addDialog, dialogList} from "../../utils/DialogContainer.jsx";

const Container = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
    width: 500px;
    max-width: 95vw;
    gap: 10px;
    flex-direction: column;
    color: #8e2afe;
    word-break: break-all;

    > .content {
        padding: 20px;
        gap: 20px;
        display: flex;
        max-height: 60vh;
        overflow-y: auto;
        width: 100%;
        //justify-content: center;
    }

    p {
        white-space: nowrap;
        font-weight: bold;
    }

`


export function showConfirmWindow(title, onConfirm, onCancel) {
    addDialog(<ConfirmWindow title={title} onConfirm={onConfirm} onCancel={onCancel}/>)
}


function ConfirmWindow({title, onConfirm, onCancel}) {


    return (
        <Container className={'shadow'}>
            <h4>{title}</h4>
            <div class="content">
                <Button variant={'contained'} onClick={async () => {
                    dialogList.pop()
                    onConfirm()
                }}>确认</Button>
                <Button variant={'outlined'} onClick={async () => {
                    dialogList.pop()
                    onCancel?.()
                }}>取消</Button>
            </div>

        </Container>

    );
}

export default ConfirmWindow;
