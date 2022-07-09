import { FC } from "react";
import Head from "next/head";

interface MetaProps {
  title?: string;
  keywords?: string;
  description?: string;
}

const Meta: FC<MetaProps> = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Filmflix",
  keywords: "Filmflix, Movie Database",
  description: "Filmflix, a database of latest movies and tv shows.",
};

export default Meta;
