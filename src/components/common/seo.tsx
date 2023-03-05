import Head from "next/head";
import { FC } from "react";

type SeoProps = {
  title: string;
  description?: string;
};

const Seo: FC<SeoProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default Seo;
