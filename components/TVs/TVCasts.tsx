import React, { FC, useState, useEffect } from "react";
import Axios from "axios";
import Image from "next/image";
import ProfileFallback from "../../assets/fallbacks/ProfileFallback.jpg";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import tvCastsStyles from "../../styles/Home.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

interface TVCastProp {
  tvCastData: {
    id: number;
    profile_path: string;
    name: string;
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

const TVCasts: FC<{ id: number }> = ({ id }) => {
  const [castTV, setCastTV] = useState<TVCastProp["tvCastData"]>([]);

  const [isMounted, setIsMounted] = useState(true);

  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = castTV.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 10);
  };

  useEffect(() => {
    const displayTVCasts = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        // console.log(res.data.cast);
        if (isMounted) {
          setCastTV(res.data.cast);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTVCasts();

    return () => {
      setIsMounted(false);
    };
  }, [id, isMounted]);

  return (
    <>
      <div className={tvCastsStyles["tv-casts-wrapper"]}>
        {currentItems.map((cast) => {
          return (
            <div key={cast.id}>
              {cast.profile_path !== null ? (
                <div className={tvCastsStyles["tv-casts-image"]}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    alt="TV Cast"
                    width={50}
                    height={50}
                    layout="responsive"
                    objectFit="cover"
                    priority={true}
                  />
                </div>
              ) : (
                <div className={tvCastsStyles["tv-casts-image"]}>
                  <Image
                    src={ProfileFallback}
                    alt="TV Cast"
                    width={50}
                    height={50}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
              )}

              <div className={tvCastsStyles["tv-casts-name"]}>
                <p>{cast.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={tvCastsStyles["tv-casts-button-wrapper"]}>
        <LoadMoreProfilesButton
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          disabled={castTV.length === currentItems.length}
        >
          Load More
        </LoadMoreProfilesButton>
      </div>
    </>
  );
};

export default TVCasts;
