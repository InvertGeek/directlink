import {proxy, useSnapshot} from 'valtio';
import {useRef} from 'react';

function useProxyState(initialState) {
    const state = useRef(proxy(initialState)).current;

    useSnapshot(state);

    return state;
}

export default useProxyState;