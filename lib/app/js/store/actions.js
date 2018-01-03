/* eslint id-match: ["error", "^[A-Za-z]+[A-Za-z_]+$"] */
export const TOGGLE_TODO = 'TOGGLE_TODO';

// Should delete lovercase rule after more action to another file.
export const toggleTodo = (id) => {
    return {
        type    : TOGGLE_TODO,
        payload : id
    };
};
