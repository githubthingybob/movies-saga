//post new Movie to DB

const postNewMoviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'POST_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

export default postNewMoviesReducer;