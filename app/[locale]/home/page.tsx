import { useTranslations } from "next-intl";
import React from "react";

const Home = () => {
  const t = useTranslations("Home");

  return <div>{t('navigation.home')}</div>;
};

export default Home;
