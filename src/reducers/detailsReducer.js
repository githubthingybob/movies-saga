const detailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECTED_MOVIE':
            return state = action.payload;
        default:
            return state;
    }
}


export default detailsReducer; 