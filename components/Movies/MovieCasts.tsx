import React, { FC, useState, useEffect } from "react";
import Axios from "axios";
import Image from "next/image";
import ProfileFallback from "../../assets/fallbacks/ProfileFallback.jpg";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import movieCastsStyles from "../../styles/Home.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

interface MovieCastProp {
  movieCastData: {
    id: number;
    name: string;
    profile_path: string;
  }[];
}

const LoadMoreProfilesButton = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0071EB",
    marginTop: "2em",
    "&:hover": {
      backgroundColor: "hsl(211, 100%, 60%)",
    },
  },
}))(Button);

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
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`
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
      <div className={movieCastsStyles["movie-casts-wrapper"]}>
        {currentItems.map((movieCast) => {
          return (
            <div key={movieCast.id}>
              {movieCast.profile_path !== null ? (
                <div className={movieCastsStyles["movie-casts-image"]}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movieCast.profile_path}`}
                    alt="Movie Cast"
                    width={50}
                    height={50}
                    layout="responsive"
                    objectFit="cover"
                    priority={true}
                  />
                </div>
              ) : (
                <div className={movieCastsStyles["movie-casts-image"]}>
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

              <div className={movieCastsStyles["movie-casts-name"]}>
                <p>{movieCast.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={movieCastsStyles["movie-casts-button-wrapper"]}>
        <LoadMoreProfilesButton
          variant="contained"
          color="primary"
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
