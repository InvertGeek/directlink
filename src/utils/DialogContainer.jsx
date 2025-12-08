import {proxy, useSnapshot} from "valtio";
import {Backdrop} from "@mui/material";
import styled from "styled-components";
import {createPortal} from "react";
import {noProxy} from "./CommonUtils.jsx";

export const dialogList = proxy([])

export function addDialog(dialog, autoClose = true) {
    dialogList.push({
        content: noProxy(dialog),
        autoClose,
    })
}

const Container = styled(Backdrop)`
    z-index: 1000;
`

export function DialogContainer(props) {

    const dialogState = useSnapshot(dialogList)

    if (dialogState.length === 0) {
        return null
    }

    return dialogState.map((item, index) => {

        const content = (
            <Container open onClick={(event, key = index) => {
                if (event.target === event.currentTarget && item.autoClose) {
                    dialogList.pop()
                }
            }}>

                {item.content}

            </Container>
        )

        return createPortal(content, document.body)
    })
}