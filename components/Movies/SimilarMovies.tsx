import React, { FC, useState, useEffect } from "react";
import Axios from "axios";
import { options } from "../../utils/options";
import Image from "next/legacy/image";
import PosterFallback from "../../assets/fallbacks/PosterFallback.jpg";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import styles from "../../styles/Movies/SimilarMovies.module.scss";

interface SimilarMoviesProps {
  similarMovieData: {
    id: number;
    backdrop_path: string;
    title: string;
    overview: string;
  }[];
}

const LoadMoreSimilarMoviesButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  marginTop: "2em",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

const SimilarMovies: FC<{ id: number }> = ({ id }) => {
  const [similarMovies, setSimilarMovies] = useState<
    SimilarMoviesProps["similarMovieData"]
  >([]);

  const [isMounted, setIsMounted] = useState(true);

  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = similarMovies.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 4);
  };

  useEffect(() => {
    const displaySimilarMovies = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          options
        );
        // console.log(res.data.results);
        if (isMounted) {
          setSimilarMovies(res.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displaySimilarMovies();

    return () => {
      setIsMounted(false);
    };
  }, [id, isMounted]);

  //Limiting the Words in Overview
  let limitText = (text: string, limit: number) => {
    if (text.length > limit) {
      for (let i = limit; i > 0; i--) {
        if (
          text.charAt(i) === " " &&
          (text.charAt(i - 1) != "," ||
            text.charAt(i - 1) != "." ||
            text.charAt(i - 1) != ";")
        ) {
          return text.substring(0, i) + "...";
        }
      }
      return text.substring(0, limit) + "...";
    } else return text;
  };

  return (
    <>
      <div className={styles["similar-movies-wrapper"]}>
        {currentItems.map((similarMovie) => {
          return (
            <div
              key={similarMovie.id}
              className={styles["similar-movies-content"]}
            >
              {similarMovie.backdrop_path !== null ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${similarMovie.backdrop_path}`}
                  alt="Similar Poster"
                  width={350}
                  height={250}
                  layout="responsive"
                  objectFit="cover"
                  priority={true}
                  unoptimized={true}
                />
              ) : (
                <Image
                  src={PosterFallback}
                  alt="Similar Poster"
                  width={350}
                  height={250}
                  layout="responsive"
                  objectFit="cover"
                />
              )}
              <div className={styles["similar-movies-title"]}>
                <h2>{similarMovie.title}</h2>
              </div>

              <div className={styles["similar-movies-overview"]}>
                {similarMovie.overview === "" ? (
                  <p>Overview Unvailable...</p>
                ) : (
                  <p>{limitText(similarMovie.overview, 500)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["similar-movies-button-wrapper"]}>
        <LoadMoreSimilarMoviesButton
          variant="contained"
          onClick={handleLoadMore}
          disabled={currentItems.length === similarMovies.length}
        >
          Load More
        </LoadMoreSimilarMoviesButton>
      </div>
    </>
  );
};

export default SimilarMovies;
