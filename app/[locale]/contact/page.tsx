import { useTranslations } from 'next-intl';
import React from 'react'

const Contact = () => {
    const t = useTranslations("Home");
  return (
    <div>{t('navigation.contact')}</div>
  )
}

export default Contact