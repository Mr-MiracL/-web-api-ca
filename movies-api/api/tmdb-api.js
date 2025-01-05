import fetch from 'node-fetch';


export const getGenres = async () => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
      );

      if (!response.ok) {
          throw new Error(response.json().message);
      }
      return await response.json();
  } catch (error) {
      throw error;
  }
};


export const getMovie = async ( queryKey ) => {
  try {
  const [, { id }] = queryKey;
  console.log(id)
  const response = await fetch(
  `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || "Failed to fetch movie details.");
  } 
  return await response.json();
  } catch (error) {
  console.error("Error fetching movie details:", error.message);
  throw error;
  }
};

  export const getMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
export const getMovieImages = async ( queryKey ) => {
  try {
  const [, { id }] = queryKey;
  console.log(id)
  const response = await fetch(
  `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || "Failed to fetch movie details.");
  } 
  return await response.json();
  } catch (error) {
  console.error("Error fetching movie details:", error.message);
  throw error;
  }
};

export const getNowPlayings = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getPopulars = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};
export const getUpcomingMovies = async () => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
          throw new Error(response.json().message);
      }

      return await response.json();
  } catch (error) {
      throw error;
  }
};
 export const getActorDetails = async (id) => {
    return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };
  
  export const getActorMovies = async (id) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };
  export const getCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };