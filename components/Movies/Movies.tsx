import React, { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MovieData } from "../../data/moviedata";
const MovieCarousel = dynamic(() => import("./MovieCarousel"));
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../../styles/Movies/Movies.module.scss";

const Movies: FC = () => {
  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = MovieData.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = () => {
    setTimeout(() => setitemsPerPage(itemsPerPage + 3), 2000);

    if (currentItems.length === MovieData.length) {
      setHasMore(false);
    }
  };

  //Cleanup Function
  useEffect(() => {
    if (isMounted) {
      MovieData;
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, setIsMounted]);

  return (
    <div className={styles["movie-wrapper"]}>
      <InfiniteScroll
        dataLength={currentItems.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          <div className={styles["movie-spinner"]}>
            <CircularProgress size={50} />
          </div>
        }
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "3.2em",
        }}
      >
        {currentItems.map((movieCategory) => {
          return (
            <div key={movieCategory.id} className={styles["movie-carousel"]}>
              <MovieCarousel
                title={movieCategory.name}
                route={movieCategory.route}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Movies;
