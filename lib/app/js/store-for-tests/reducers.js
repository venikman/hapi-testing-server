import { combineReducers } from 'redux';
import * as actions from './actions';

export const todos = (state = [], action) => {
    switch (action.type) {
        case actions.TOGGLE_TODO:
            return state.map((t) => {
                if (t.id === action.payload) {
                    return {
                        ...t,
                        completed : !t.completed
                    };
                }
                return t;
            });
        default:
            return state;
    }
};

export default combineReducers({ todos });
