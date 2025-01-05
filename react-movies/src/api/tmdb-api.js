export const getMovies = async () => {
  const response = await fetch(
    'http://localhost:8080/api/movies', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};
  
export const getMovie = async ({queryKey}) => {
  const response = await fetch('http://localhost:8080/api/movies/getMovie', {
  headers: {
    'Content-Type': 'application/json', 
  'Authorization': window.localStorage.getItem('token')
  },
  method: 'post',
  body: JSON.stringify({ args:queryKey })
  });
  return response.json();
  };

export const getGenres = async () => {
  const response = await fetch(
   'http://localhost:8080/api/movies/genres', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
});
  return response.json();
};
export const getLanguages=async()=>{
  
  return fetch(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

export const getMovieImages = async ({ queryKey }) => {
  const response = await fetch('http://localhost:8080/api/movies/getMovieImages', {
  headers: {
    'Content-Type': 'application/json',
  'Authorization': window.localStorage.getItem('token')
  },
  method: 'post', 
  body: JSON.stringify({ args:queryKey })
  });
  return response.json();
};
export const getMovieReviews = async ({ queryKey }) => {
  const response = await fetch('http://localhost:8080/api/movies/getMovieReviews', {
  headers: {
    'Content-Type': 'application/json', 
  'Authorization': window.localStorage.getItem('token')
  },
  method: 'post',
  body: JSON.stringify({ args:queryKey })
  });
  return response.json();
};

 
  export const getNowPlayings = async() => {
    const response = await fetch(
      'http://localhost:8080/api/movies/getNowPlayings', {
       headers: {
         'Authorization': window.localStorage.getItem('token')
       }
   });
     return response.json();
  };
  export const getUpcomingMovies = async() => {
    const response = await fetch(
      'http://localhost:8080/api/movies/getUpcomingMovies', {
       headers: {
         'Authorization': window.localStorage.getItem('token')
       }
   });
     return response.json();
  };

  export const getPopulars = async () => {
    const response = await fetch(
      'http://localhost:8080/api/movies/getPopulars', {
       headers: {
         'Authorization': window.localStorage.getItem('token')
       }
   });
     return response.json();
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