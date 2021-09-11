const { NEXT_PUBLIC_API_KEY } = process.env;

export const MovieData = [
  {
    id: 1,
    name: "Trending",
    route: `https://api.themoviedb.org/3/trending/movie/day?api_key=${NEXT_PUBLIC_API_KEY}`,
  },
  {
    id: 5,
    name: "Upcoming",
    route: `https://api.themoviedb.org/3/movie/upcoming?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 3,
    name: "Now Playing",
    route: `
    https://api.themoviedb.org/3/movie/now_playing?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 2,
    name: "Popular",
    route: `https://api.themoviedb.org/3/movie/popular?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 4,
    name: "Top Rated",
    route: `https://api.themoviedb.org/3/movie/top_rated?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 6,
    name: "Discover",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`,
  },
  {
    id: 7,
    name: "Action",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 8,
    name: "Adventure",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=12&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 9,
    name: "Animation",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=16&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 10,
    name: "Comedy",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=35&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 11,
    name: "Crime",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=80&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 12,
    name: "Documentary",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=99&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 13,
    name: "Drama",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=18&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 14,
    name: "Family",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10751&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 15,
    name: "Fantasy",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=14&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 16,
    name: "History",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=36&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 17,
    name: "Horror",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=27&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 18,
    name: "Music",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10402&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 19,
    name: "Mystery",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=9648&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 20,
    name: "Romance",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10749&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 21,
    name: "Science Fiction",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=878&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 22,
    name: "TV Movie",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10770&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 23,
    name: "Thriller",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=53&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 24,
    name: "War",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=10752&page=1&with_watch_monetization_types=flatrate`,
  },
  {
    id: 25,
    name: "Western",
    route: `https://api.themoviedb.org/3/discover/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=37&page=1&with_watch_monetization_types=flatrate`,
  },
];
