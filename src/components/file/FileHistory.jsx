import styled from "styled-components";
import {formatFileSize} from "../../utils/CommonUtils.jsx";
import FileDialog from "./FileDialog.jsx";
import {proxy, subscribe, useSnapshot} from "valtio";
import {addDialog} from "../../utils/DialogContainer.jsx";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

`

const CardContainer = styled.div`
    transition: .3s;
    background-color: rgba(210, 172, 254, 0.25);
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
    word-break: break-all;
    border-radius: 5px;
    cursor: pointer;
    color: #8e2afe;
    border: 1px solid rgba(142, 42, 254, 0.53);;
    box-shadow: rgba(75, 82, 86, 0.66) 0px 2px 10px 0px;

    &:hover {
        background-color: rgba(210, 172, 254, 0.5);
    }
`

const history = proxy(JSON.parse(localStorage.getItem('file-history')) || [])

subscribe(history, () => {
    localStorage.setItem('file-history', JSON.stringify(history));
})

export function addHistory(file) {
    if (history.length > 100) {
        history.shift()
    }
    history.push(file)
}

export function FileCard({item}) {
    const {name, size, time, url} = item
    return (
        (<CardContainer className={'animate__animated animate__slideInDown animate__faster no-select'} onClick={() => {
            addDialog(<FileDialog data={item}/>)
        }}>
            <h4 className={'text-hide'}>{name}</h4>
            <p>{formatFileSize(size)}</p>
        </CardContainer>)
    )
}

function FileHistory(props) {
    useSnapshot(history)

    return (
        <Container>
            {
                [...history].reverse().map((item) => <FileCard item={item} key={item.url}/>)
            }
        </Container>
    );
}

export default FileHistory;
