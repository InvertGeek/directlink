import styled from "styled-components";
import {FileDrop} from "react-file-drop";
import {apiAddress} from "../../config.js";
import axios from "axios";
import {formatFileSize} from "../../utils/CommonUtils.jsx";
import {Semaphore} from "@chriscdn/promise-semaphore";
import {addUploadFile} from "./upload/UploadDialog.jsx";
import {addHistory} from "./FileHistory.jsx";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100px;
    align-items: center;
    justify-content: center;
    font-size: min(2rem, 100px);
    cursor: pointer;
    color: rgba(138, 43, 226, 0.76);
    font-weight: bold;
    border: 4px dashed rgba(142, 42, 254, 0.63);
    transition: .3s;
    box-shadow: 0 0 5px 3px rgba(138, 43, 226, 0.15);
    word-break: break-all;

    &:hover {
        background-color: rgba(138, 43, 226, 0.1);
    }

    .file-drop {
        width: 100%;
        height: 100%;
    }

    .file-drop-target {
        filter: drop-shadow(2px 2px 4px rgba(174, 107, 239, 0.2));
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: .3s;
    }

    .file-drop-target.file-drop-dragging-over-frame {
        /* overlay a black mask when dragging over the frame */
        border: none;
        background-color: rgba(138, 43, 226, 0.1);
        z-index: 50;
        opacity: 1;
    }

    .file-drop-target.file-drop-dragging-over-target {
        /* turn stuff orange when we are dragging over the target */
        color: blueviolet;
        box-shadow: 0 0 13px 3px blueviolet;
    }
`

const semaphore = new Semaphore(2)

export async function uploadFile(upFile) {
    const controller = new AbortController();
    const {file} = upFile;
    const uploadAddress = `${apiAddress}api/upload?name=${encodeURIComponent(file.name)}`
    upFile.tip = '等待中'
    upFile.cancel = () => {
        controller.abort()
    }
    await semaphore.acquire()
    upFile.tip = `上传中: 0/${formatFileSize(file.size)}`
    try {
        let response = await axios.put(uploadAddress, file, {
            onUploadProgress: progressEvent => {
                const {loaded, total} = progressEvent
                upFile.tip = `上传中: ${formatFileSize(loaded, true)}/${formatFileSize(total)}`
                upFile.progress = loaded / total * 100
            },
            signal: controller.signal
        })
        upFile.result = response.data
        addHistory({
            name: file.name,
            size: file.size,
            url: upFile.result
        })
    } catch (e) {
        upFile.error = true
        upFile.tip = '上传失败'
        upFile.progress = 0
        if (e.message === 'canceled') {
        }
        return
    } finally {
        upFile.complete = true
        semaphore.release()
    }
    upFile.progress = 100
    upFile.tip = `上传成功 ${formatFileSize(file.size)}`
}

function FileUpload(props) {
    return (
        <Container className={"no-select"}>
            <input type="file" id={'select-file'} hidden onChange={(event) => {
                addUploadFile(...event.target.files)
                event.target.value = ''
            }} multiple="multiple"/>
            <FileDrop
                onTargetClick={() => {
                    document.querySelector('#select-file').click()
                }}
                onDrop={(files, event) => {
                    addUploadFile(...files)
                }}
            >
                选择/拖入文件
            </FileDrop>
        </Container>
    );
}

export default FileUpload;
