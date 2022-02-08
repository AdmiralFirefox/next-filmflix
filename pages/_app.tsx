import React, { FC } from "react";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import { AuthProvider } from "../provider/AuthProvider";
import createEmotionCache from "../src/createEmotionCache";
import Meta from "../components/LandingPage/Meta";
import "../styles/globals.scss";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CacheProvider value={clientSideEmotionCache}>
        <Meta />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
