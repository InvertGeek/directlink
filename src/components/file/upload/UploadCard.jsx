import {Box, LinearProgress} from "@mui/material";
import {useEffect} from "react";
import styled from "styled-components";
import useUnmountEffect from "../../../hooks/useUnmountEffect.js";
import {uploadFile} from "../FileUpload.jsx";
import {useSnapshot} from "valtio";
import {addDialog} from "../../../utils/DialogContainer.jsx";
import FileDialog from "../FileDialog.jsx";


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{width: '100%', mr: 1}}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{minWidth: 35}}>
                <p>
                    {`${Math.round(props.value)}%`}
                </p>
            </Box>
        </Box>
    );
}

const Container = styled.div`
    display: flex;
    padding: 10px;
    justify-content: center;
    width: 100%;
    gap: 10px;
    flex-direction: column;
    color: #8e2afe;
    word-break: break-all;
    border: 2px solid rgba(142, 42, 254, 0.6);
    border-radius: 10px;
    transition: .3s;
    background-color: rgba(229, 207, 254, 0.25);

    &.error {
        color: red;
        border: 2px solid red;
    }

    &.done {
        cursor: pointer;

        &:hover {
            background-color: rgba(142, 42, 254, 0.23);
        }
    }

    p {
        white-space: nowrap;
        font-weight: bold;
    }
`

export function ProgressCard({file: upFile}) {

    const {tip, progress, cancel, title, error, result, file} = useSnapshot(upFile)

    useUnmountEffect(() => {
        cancel?.()
    }, [cancel])

    useEffect(() => {
        uploadFile(upFile)
    }, []);
    const classes = ['shadow no-select']
    if (error) {
        classes.push('error')
    }
    if (result) {
        classes.push('done')
    }

    return <Container className={classes.join(' ')} error={error} onClick={() => {
        if (result) {
            addDialog(<FileDialog data={
                {
                    name: file.name,
                    size: file.size,
                    url: result,
                }
            }/>)
        }
    }}>
        <h4 className={'text-hide'}>{title}</h4>
        {!result && <LinearProgressWithLabel value={progress}/>}
        <p>{tip}</p>
    </Container>
}
