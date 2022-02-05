import React, { FC, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PosterFallback from "../../../assets/fallbacks/PosterFallback.jpg";
import { SearchMovieIDContext } from "./SearchMovies";
import Axios from "axios";
import styles from "../../../styles/Search/SearchMovies/SearchMovieInfo.module.scss";
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

interface LanguageProps {
  languageData: {
    english_name: string;
  }[];
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

  const [spokenLanguages, setSpokenLanguages] = useState<
    LanguageProps["languageData"]
  >([]);

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
          setSpokenLanguages(res.data.spoken_languages);
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
    <>
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
        spokenLanguages={spokenLanguages}
      />
      {posterPath !== "" ? (
        <>
          {posterPath !== null ? (
            <div className={styles["search-movie-container"]}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                alt="Movie Poster"
                priority={true}
                layout="responsive"
                width={350}
                height={500}
                objectFit="cover"
                unoptimized={true}
              />

              <div className={styles["search-movie-overlay"]}>
                <div className={styles["search-movie-vote-average"]}>
                  {voteAverge !== 0 ? <h1>{voteAverge}</h1> : <h1>N/A</h1>}
                </div>
                <div
                  onClick={handleOpenSearchMovieModal}
                  className={styles["search-movie-info-icon"]}
                >
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["search-movie-container"]}>
              <Image
                src={PosterFallback}
                alt="Movie Poster"
                loading="lazy"
                layout="responsive"
                width={350}
                height={500}
                objectFit="cover"
              />

              <div className={styles["search-movie-overlay"]}>
                <div className={styles["search-movie-vote-average"]}>
                  {voteAverge !== 0 ? <h1>{voteAverge}</h1> : <h1>N/A</h1>}
                </div>
                <div
                  onClick={handleOpenSearchMovieModal}
                  className={styles["search-movie-info-icon"]}
                >
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles["search-movie-container"]}>
          <Image
            src={PosterFallback}
            alt="Movie Poster"
            loading="lazy"
            layout="responsive"
            width={350}
            height={500}
            objectFit="cover"
          />

          <div className={styles["search-movie-overlay"]}>
            <div className={styles["search-movie-vote-average"]}>
              {voteAverge !== 0 ? <h1>{voteAverge}</h1> : <h1>N/A</h1>}
            </div>
            <div
              onClick={handleOpenSearchMovieModal}
              className={styles["search-movie-info-icon"]}
            >
              <i className="fas fa-info-circle"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchMovieInfo;
