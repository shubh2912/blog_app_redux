import actionTypes from '../Actions/actionTypes';

const initialState = {
    blogData: []
}

export default (state, action) => {
    if (!state) {
        state = initialState;
    }

    switch (action.type) {
        case actionTypes.SAVE_BLOG_DATA: {
            state = Object.assign({}, state, {
                blogData: action.payload
            });
        }
            return state;

        default:
            return state;
    }

}