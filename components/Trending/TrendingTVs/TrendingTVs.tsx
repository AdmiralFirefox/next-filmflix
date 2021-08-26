import React, { FC, useState, useEffect, createContext } from "react";
import Axios from "axios";
import dynamic from "next/dynamic";
const TrendingTVInfo = dynamic(() => import("./TrendingTVInfo"));
import Skeleton from "@material-ui/lab/Skeleton";
import trendingTVStyles from "../../../styles/Home.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

export const TrendingTVIDContext = createContext(0);

const TrendingTVs: FC = () => {
  const [trendingTV, setTrendingTV] = useState({
    id: 0,
    backdrop_path: "",
    name: "",
    overview: "",
  });

  const [isMounted, setIsMounted] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const displayTrendingTVData = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${NEXT_PUBLIC_API_KEY}`
        );
        // console.log(res.data.results[Math.floor(Math.random() * 10)]);
        if (isMounted) {
          setTrendingTV(res.data.results[Math.floor(Math.random() * 10)]);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTrendingTVData();

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  return (
    <div>
      {loading ? (
        <>
          <Skeleton
            variant="rect"
            id={trendingTVStyles["trending-tvs-loading-skeleton"]}
          />
        </>
      ) : (
        <>
          {trendingTV.id !== 0 ? (
            <>
              <TrendingTVIDContext.Provider value={trendingTV.id}>
                <TrendingTVInfo
                  backdropPath={trendingTV.backdrop_path}
                  name={trendingTV.name}
                  overview={trendingTV.overview} 
                />
              </TrendingTVIDContext.Provider>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TrendingTVs;
