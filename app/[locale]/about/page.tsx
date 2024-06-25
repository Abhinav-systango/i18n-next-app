import { useTranslations } from 'next-intl';
import React from 'react'

const About = () => {
    const t = useTranslations("Home");
  return (
    <div>{t('navigation.about')}</div>
  )
}

export default About