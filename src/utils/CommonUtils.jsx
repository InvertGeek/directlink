import {ref} from "valtio";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import {CircularProgress} from "@mui/material";

const debounceMap = {}

export function debounce(key, fn, delay) {
    if (debounceMap[key]) {
        clearTimeout(debounceMap[key])
    }
    debounceMap[key] = setTimeout(fn, delay)
}

export function run(func, ...args) {
    return func(...args)
}

export function copyText(text) {
    copy(text)
    notifyMsg('复制成功')
}

export function notifyMsg(msg, options) {
    return toast.success(msg, options)
}

export function notifyError(msg, options) {
    return toast.error(msg, options)
}

export function notifyPromise(promise, msg, options) {
    return toast.promise(promise, {loading: msg}, {icon: <CircularProgress size={20}/>, ...options})
}


export function noProxy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj; // 如果不是对象或为null，直接返回
    }
    return ref(obj)
}


export function formatFileSize(bytes, mb) {
    if (bytes === 0) return '0 B';
    if (mb && bytes > 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
    return `${formattedSize} ${sizes[i]}`;
}

export function getFormattedDate(date = new Date()) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}