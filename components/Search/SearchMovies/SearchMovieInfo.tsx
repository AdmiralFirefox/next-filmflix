import React, { FC, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PosterFallback from "../../../assets/fallbacks/PosterFallback.jpg";
import { SearchMovieIDContext } from "./SearchMovies";
import Axios from "axios";
import searchMovieInfoStyles from "../../../styles/Home.module.scss";
const MovieModal = dynamic(() => import("../../Modal/Movies/MovieModal"));

const { NEXT_PUBLIC_API_KEY } = process.env;

interface GenreProp {
  genreData: {
    id: number;
    name: string;
  }[];
}

interface SearchMovieInfoProps {
  posterPath: string;
  voteAverge: number;
}

const SearchMovieInfo: FC<SearchMovieInfoProps> = ({
  posterPath,
  voteAverge,
}) => {
  const [searchMovieInfo, setSearchMovieInfo] = useState({
    overview: "",
    release_date: 0,
    runtime: 0,
    status: "",
    title: "",
    id: 0,
  });

  const searchMovieID = useContext(SearchMovieIDContext);

  const [isMounted, setIsMounted] = useState(true);

  const [genres, setGenres] = useState<GenreProp["genreData"]>([]);

  useEffect(() => {
    const displaySearchMovieInfo = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/movie/${searchMovieID}?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        // console.log(res.data);
        if (isMounted) {
          setSearchMovieInfo(res.data);
          setGenres(res.data.genres);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displaySearchMovieInfo();

    return () => {
      setIsMounted(false);
    };
  }, [searchMovieID, isMounted]);

  const [openSearchMovieModal, setOpenSearchMovieModal] = useState(false);

  const handleOpenSearchMovieModal = (): void => {
    setOpenSearchMovieModal(true);
  };

  const handleCloseSearchMovieModal = (): void => {
    setOpenSearchMovieModal(false);
  };

  return (
    <div>
      <MovieModal
        open={openSearchMovieModal}
        handleCloseMovieModal={handleCloseSearchMovieModal}
        overview={searchMovieInfo.overview}
        releaseDate={searchMovieInfo.release_date}
        genres={genres}
        runtime={searchMovieInfo.runtime}
        status={searchMovieInfo.status}
        title={searchMovieInfo.title}
        id={searchMovieInfo.id}
      />
      {posterPath !== "" ? (
        <>
          {posterPath !== null ? (
            <div className={searchMovieInfoStyles["search-movie-container"]}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                alt="Movie Poster"
                priority={true}
                layout="responsive"
                width={350}
                height={500}
                objectFit="cover"
              />

              <div className={searchMovieInfoStyles["search-movie-overlay"]}>
                <div
                  className={searchMovieInfoStyles["search-movie-vote-average"]}
                >
                  {voteAverge !== 0 ? <h1>{voteAverge}</h1> : <h1>N/A</h1>}
                </div>
                <div
                  onClick={handleOpenSearchMovieModal}
                  className={searchMovieInfoStyles["search-movie-info-icon"]}
                >
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          ) : (
            <div className={searchMovieInfoStyles["search-movie-container"]}>
              <Image
                src={PosterFallback}
                alt="Movie Poster"
                loading="lazy"
                layout="responsive"
                width={350}
                height={500}
                objectFit="cover"
              />

              <div className={searchMovieInfoStyles["search-movie-overlay"]}>
                <div
                  className={searchMovieInfoStyles["search-movie-vote-average"]}
                >
                  {voteAverge !== 0 ? <h1>{voteAverge}</h1> : <h1>N/A</h1>}
                </div>
                <div
                  onClick={handleOpenSearchMovieModal}
                  className={searchMovieInfoStyles["search-movie-info-icon"]}
                >
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={searchMovieInfoStyles["search-movie-container"]}>
          <Image
            src={PosterFallback}
            alt="Movie Poster"
            loading="lazy"
            layout="responsive"
            width={350}
            height={500}
            objectFit="cover"
          />

          <div className={searchMovieInfoStyles["search-movie-overlay"]}>
            <div className={searchMovieInfoStyles["search-movie-vote-average"]}>
              {voteAverge !== 0 ? <h1>{voteAverge}</h1> : <h1>N/A</h1>}
            </div>
            <div
              onClick={handleOpenSearchMovieModal}
              className={searchMovieInfoStyles["search-movie-info-icon"]}
            >
              <i className="fas fa-info-circle"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovieInfo;
