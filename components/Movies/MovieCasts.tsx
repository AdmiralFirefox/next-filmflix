import React, { FC, useState, useEffect } from "react";
import Axios from "axios";
import { options } from "../../utils/options";
import Image from "next/legacy/image";
import ProfileFallback from "../../assets/fallbacks/ProfileFallback.jpg";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import styles from "../../styles/Movies/MovieCasts.module.scss";

interface MovieCastProp {
  movieCastData: {
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }[];
}

const LoadMoreProfilesButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  marginTop: "2em",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

const MovieCasts: FC<{ id: number }> = ({ id }) => {
  const [movieCasts, setMovieCasts] = useState<MovieCastProp["movieCastData"]>(
    []
  );

  const [isMounted, setIsMounted] = useState(true);

  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movieCasts.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 10);
  };

  useEffect(() => {
    const displayMovieCasts = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options
        );
        // console.log(res.data.cast);
        if (isMounted) {
          setMovieCasts(res.data.cast);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayMovieCasts();

    return () => {
      setIsMounted(false);
    };
  }, [id, isMounted]);

  return (
    <>
      <div className={styles["movie-casts-wrapper"]}>
        {currentItems.map((movieCast) => {
          return (
            <div key={movieCast.id}>
              {movieCast.profile_path !== null ? (
                <div className={styles["movie-casts-image"]}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movieCast.profile_path}`}
                    alt="Movie Cast"
                    width={50}
                    height={50}
                    layout="responsive"
                    objectFit="cover"
                    priority={true}
                    unoptimized={true}
                  />
                </div>
              ) : (
                <div className={styles["movie-casts-image"]}>
                  <Image
                    src={ProfileFallback}
                    alt="Movie Cast"
                    width={50}
                    height={50}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
              )}

              <div className={styles["movie-casts-name"]}>
                <p>{movieCast.name}</p>
                {movieCast.character !== "" ? (
                  <p className={styles["movie-casts-character"]}>
                    {movieCast.character}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles["movie-casts-button-wrapper"]}>
        <LoadMoreProfilesButton
          variant="contained"
          onClick={handleLoadMore}
          disabled={movieCasts.length === currentItems.length}
        >
          Load More
        </LoadMoreProfilesButton>
      </div>
    </>
  );
};

export default MovieCasts;
