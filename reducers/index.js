export const movies = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: action.id,
          movie: action.movie,
        },
      ];
    default:
      return state;
  }
};
