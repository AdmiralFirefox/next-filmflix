import React, { FC, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { TVData } from "../../data/tvdata";
const TVCarousel = dynamic(() => import("./TVCarousel"));
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import tvStyles from "../../styles/Home.module.scss";

const TVs: FC = () => {
  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TVData.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = useCallback(() => {
    setTimeout(() => setitemsPerPage(itemsPerPage + 3), 1500);

    if (currentItems.length === TVData.length) {
      setHasMore(false);
    }
  }, [setitemsPerPage, setHasMore, currentItems.length, itemsPerPage]);

  //Cleanup Function
  useEffect(() => {
    if (isMounted) {
      TVData;
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, setIsMounted]);

  return (
    <div className={tvStyles["tv-wrapper"]}>
      <InfiniteScroll
        dataLength={currentItems.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          <div className={tvStyles["tv-spinner"]}>
            <CircularProgress size={50} />
          </div>
        }
        style={{ position: "relative", overflow: "hidden" }}
      >
        {currentItems.map((tvCategory) => {
          return (
            <div key={tvCategory.id} className={tvStyles["tv-carousel"]}>
              <TVCarousel title={tvCategory.name} route={tvCategory.route} />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default TVs;
