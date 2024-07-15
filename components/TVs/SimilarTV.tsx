import React, { FC, useState, useEffect } from "react";
import Axios from "axios";
import { options } from "../../utils/options";
import Image from "next/legacy/image";
import PosterFallback from "../../assets/fallbacks/PosterFallback.jpg";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import styles from "../../styles/TVs/SimilarTVs.module.scss";

interface SimilarTVProp {
  similarTVData: {
    id: number;
    backdrop_path: string;
    name: string;
    overview: string;
  }[];
}

const LoadMoreSimilarTVsButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  marginTop: "2em",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

const SimilarTV: FC<{ id: number }> = ({ id }) => {
  const [similarTVs, setSimilarTVs] = useState<SimilarTVProp["similarTVData"]>(
    []
  );

  const [isMounted, setIsMounted] = useState(true);

  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = similarTVs.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 4);
  };

  useEffect(() => {
    const displaySimilarTV = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
          options
        );
        // console.log(res.data.results);
        if (isMounted) {
          setSimilarTVs(res.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displaySimilarTV();

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
      <div className={styles["similar-tvs-wrapper"]}>
        {currentItems.map((similarTV) => {
          return (
            <div key={similarTV.id} className={styles["similar-tvs-content"]}>
              {similarTV.backdrop_path !== null ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${similarTV.backdrop_path}`}
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
              <div className={styles["similar-tvs-title"]}>
                <h2>{similarTV.name}</h2>
              </div>

              <div className={styles["similar-tvs-overview"]}>
                {similarTV.overview === "" ? (
                  <p>Overview Unvailable...</p>
                ) : (
                  <p>{limitText(similarTV.overview, 500)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["similar-tvs-button-wrapper"]}>
        <LoadMoreSimilarTVsButton
          variant="contained"
          onClick={handleLoadMore}
          disabled={currentItems.length === similarTVs.length}
        >
          Load More
        </LoadMoreSimilarTVsButton>
      </div>
    </>
  );
};

export default SimilarTV;
