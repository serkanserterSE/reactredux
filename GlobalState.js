import {
    combineReducers,
    createStore,
} from 'redux';

const defaultState = {};

export const _setGlobalState = globalState => ({
    type: 'SET_GLOBAL_STATE',
    globalState,
});

export const _cleanGlobalState = () => ({
    type: 'CLEAN_GLOBAL_STATE',
});

export const _getGlobalState = (globalState) => ({
    type: 'GET_GLOBAL_STATE',
    globalState
});

export const globalState = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_GLOBAL_STATE':
            let tmp = state;
            Object.keys(tmp).forEach(function (key) {
                if (action.globalState[key] === undefined)
                    action.globalState[key] = tmp[key];
            });
            state = action.globalState;
            return state;
        case 'GET_GLOBAL_STATE':
            action.globalState = state;
            return state;
        case 'CLEAN_GLOBAL_STATE':
            return state = {};
        default:
            return state;
    }
};

export const reducers = combineReducers({
    globalState,
});

export function configureStore(initialState = defaultState) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();

export function GetGlobalState() {
    return store.dispatch(_getGlobalState()).globalState;
}

export function SetGlobalState(_globalState) {
    return store.dispatch(_setGlobalState(_globalState));
}
