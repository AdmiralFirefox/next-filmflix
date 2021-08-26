import React, { FC, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MovieData } from "../../data/moviedata";
const MovieCarousel = dynamic(() => import("./MovieCarousel"));
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import movieStyles from "../../styles/Home.module.scss";

const Movies: FC = () => {
  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = MovieData.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = useCallback(() => {
    setTimeout(() => setitemsPerPage(itemsPerPage + 2), 3000);

    if (currentItems.length === MovieData.length) {
      setHasMore(false);
    }
  }, [setitemsPerPage, setHasMore, currentItems.length, itemsPerPage]);

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
    <div className={movieStyles["movie-wrapper"]}>
      <InfiniteScroll
        dataLength={currentItems.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          <div className={movieStyles["movie-spinner"]}>
            <CircularProgress size={50} />
          </div>
        }
        style={{ position: "relative", overflow: "hidden" }}
      >
        {currentItems.map((movieCategory) => {
          return (
            <div
              key={movieCategory.id}
              className={movieStyles["movie-carousel"]}
            >
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
