const movies = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
        },
      ];
    default:
      return state;
  }
};

export default movies;
