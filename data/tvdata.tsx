export const TVData = [
  {
    id: 1,
    name: "Trending",
    route: `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  {
    id: 2,
    name: "Airing Today",
    route: `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 3,
    name: "Aired this Week",
    route: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 4,
    name: "Popular",
    route: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 5,
    name: "Top Rated",
    route: `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`,
  },
  {
    id: 6,
    name: "Discover",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&page=2&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 7,
    name: "Action and Adventure",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10759&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 8,
    name: "Animation",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 9,
    name: "Comedy",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 10,
    name: "Crime",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=80&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 11,
    name: "Documentary",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=99&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 12,
    name: "Drama",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 13,
    name: "Family",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10751&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 14,
    name: "Kids",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10762&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 15,
    name: "Mystery",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=9648&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 16,
    name: "News",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10763&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 17,
    name: "Reality",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10764&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 18,
    name: "Sci-Fi and Fantasy",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10765&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 19,
    name: "Soap",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10766&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 20,
    name: "Talk",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10767&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 21,
    name: "War and Politics",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10768&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
  {
    id: 22,
    name: "Eastern",
    route: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=37&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`,
  },
];
