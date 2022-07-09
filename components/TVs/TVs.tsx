import React, { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TVData } from "../../data/tvdata";
const TVCarousel = dynamic(() => import("./TVCarousel"));
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../../styles/TVs/TVs.module.scss";

const TVs: FC = () => {
  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = TVData.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = () => {
    setTimeout(() => setitemsPerPage(itemsPerPage + 3), 1500);

    if (currentItems.length === TVData.length) {
      setHasMore(false);
    }
  };

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
    <div className={styles["tv-wrapper"]}>
      <InfiniteScroll
        dataLength={currentItems.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          <div className={styles["tv-spinner"]}>
            <CircularProgress size={50} />
          </div>
        }
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "3.2em",
        }}
      >
        {currentItems.map((tvCategory) => {
          return (
            <div key={tvCategory.id} className={styles["tv-carousel"]}>
              <TVCarousel title={tvCategory.name} route={tvCategory.route} />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default TVs;
