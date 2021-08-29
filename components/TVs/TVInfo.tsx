import React, {
  FC,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import { TVIDContext } from "./TVCarousel";
import Axios from "axios";
import Image from "next/image";
import PosterFallback from "../../assets/fallbacks/PosterFallback.jpg";
const TVModal = dynamic(() => import("../Modal/TVs/TVModal"));
import tvInfoStyles from "../../styles/Home.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

interface TVGenreProp {
  tvGenreData: {
    id: number;
    name: string;
  }[];
}

interface TVInfoProps {
  posterPath: string;
  voteAverage: number;
}

interface LanguageProps {
  languageData: {
    english_name: string;
  }[];
}

const TVInfo: FC<TVInfoProps> = ({ posterPath, voteAverage }) => {
  const [infoTV, setInfoTV] = useState({
    overview: "",
    first_air_date: 0,
    number_of_episodes: 0,
    number_of_seasons: 0,
    status: "",
    last_air_date: 0,
    name: "",
    id: 0,
  });
  const [genresTV, setGenresTV] = useState<TVGenreProp["tvGenreData"]>([]);

  const [spokenLanguages, setSpokenLanguages] = useState<
    LanguageProps["languageData"]
  >([]);

  const TVID = useContext(TVIDContext);

  const [openTVModal, setOpenTVModal] = useState(false);

  const [isMounted, setIsMounted] = useState(true);

  const handleOpenTVInfo = useCallback((): void => {
    setOpenTVModal(true);
  }, [setOpenTVModal]);

  const handleCloseTVInfo = useCallback((): void => {
    setOpenTVModal(false);
  }, [setOpenTVModal]);

  useEffect(() => {
    const displayTVInfo = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/tv/${TVID}?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        // console.log(res.data);
        if (isMounted) {
          setGenresTV(res.data.genres);
          setInfoTV(res.data);
          setSpokenLanguages(res.data.spoken_languages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTVInfo();

    return () => {
      setIsMounted(false);
    };
  }, [TVID, isMounted]);

  return useMemo(() => {
    return (
      <div>
        <TVModal
          openTVModal={openTVModal}
          handleCloseTVInfo={handleCloseTVInfo}
          overview={infoTV.overview}
          genresTV={genresTV}
          dateAired={infoTV.first_air_date}
          episodes={infoTV.number_of_episodes}
          seasons={infoTV.number_of_seasons}
          status={infoTV.status}
          lastDateAired={infoTV.last_air_date}
          name={infoTV.name}
          id={infoTV.id}
          spokenLanguages={spokenLanguages}
        />
        {posterPath !== null ? (
          <>
            {posterPath !== "" ? (
              <div className={tvInfoStyles["tv-container"]}>
                <Image
                  src={`https://image.tmdb.org/t/p/w300/${posterPath}`}
                  alt="TV Poster"
                  width={350}
                  height={500}
                  priority={true}
                />
                <div className={tvInfoStyles["tv-overlay"]}>
                  <div className={tvInfoStyles["tv-vote-average"]}>
                    {voteAverage !== 0 ? <h1>{voteAverage}</h1> : <h1>N/A</h1>}
                  </div>
                  <div
                    onClick={handleOpenTVInfo}
                    className={tvInfoStyles["tv-info-icon"]}
                  >
                    <i className="fas fa-info-circle"></i>
                  </div>
                </div>
              </div>
            ) : (
              <Image
                src={PosterFallback}
                alt="Movie Poster"
                width={350}
                height={500}
                priority={true}
              />
            )}
          </>
        ) : (
          <div className={tvInfoStyles["tv-container"]}>
            <Image
              src={PosterFallback}
              alt="Movie Poster"
              width={350}
              height={500}
              priority={true}
            />
            <div className={tvInfoStyles["tv-overlay"]}>
              <div className={tvInfoStyles["tv-vote-average"]}>
                {voteAverage !== 0 ? <h1>{voteAverage}</h1> : <h1>N/A</h1>}
              </div>
              <div
                onClick={handleOpenTVInfo}
                className={tvInfoStyles["tv-info-icon"]}
              >
                <i className="fas fa-info-circle"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }, [
    infoTV.first_air_date,
    infoTV.id,
    infoTV.last_air_date,
    infoTV.number_of_episodes,
    infoTV.number_of_seasons,
    infoTV.overview,
    infoTV.status,
    infoTV.name,
    posterPath,
    voteAverage,
    handleOpenTVInfo,
    handleCloseTVInfo,
    genresTV,
    openTVModal,
    spokenLanguages,
  ]);
};

export default TVInfo;
