let nextMovieId = 0;
export const addMovie = (movie) => {
  return {
    type: 'ADD_MOVIE',
    id: nextMovieId++,
    movie,
  };
};
