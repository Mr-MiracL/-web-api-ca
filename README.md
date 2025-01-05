# -web-api-ca
# Assignment 2 - Web API.

Name: Yuheng Gu

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + A new colllection of reviews is added 
 + Some routers connected with the new-bulit collection is added
 + The majority of fetches from frontend app go to the web API
 + Ahthentication pages and components are added

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

An env file was build.
- the variables are:
- NODE_ENV=development
- PORT=8080
- HOST=localhost
- MONGO_DB=
- TMDB_KEY=
- SECRET=


## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for  the movie
- /api/reviews/{movieid}/reviews | PUT | update the review for the movie
- /api/reviews/{movieid}/reviews | DELETE | delete the review for the movie
- /api/movies/getGenres | GET | gets movie genres
- api/movies/getMovieImages | POST | USe this method to get images of movie
- /api/movies/getNowPlayings | GET | get the list of now-playing movies
- /api/movies/getUpcomingMovies | GET | get the list of upcoming movies
- /api/movies/getPopulars | GET | get the list of popular movies
- /api/movies/getActorDetails | GET | get the actor details
- /api/movies/getActorMovies | GET | get the actor movies
- /api/movies/getCredits | GET | get the credits of the movie
-


## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected:

JWT (JSON Web Token) authentication:
The API uses JWT to authenticate users. When a user logs in, the API generates a signed JWT and returns it to the client. The client then includes this token in the Authorization request header to access protected routes.
Following are the protected routes in the API and their functions:
POST /api/favorites: Add a movie to the user's favorites.
GET /api/favorites/:userId: Get the user's favorite movie list.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.:

In this project, we create an interface with the backend API instead of using the TMDB API directly. The React application sends HTTP requests to the backend API, which handles the business logic and interacts with the MongoDB database.

Compared to Assignment One, the following updates were made in this project:
User login and authentication are implemented using JWT, and the user's login status and JWT are managed through React Context. All routes that require authentication are protected.
Users can also manage their favorites

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   
