import { Link } from '@/i18n.config';
import { useTranslations } from 'next-intl';
import React from 'react'

const Homepage = ({params: {locale}}: {params: {locale: string}}) => {
  const t = useTranslations("Home");
  const navigationKeys = Object.keys(t.raw("navigation"));

  return (
    <div>
        {/* navigation  */}
       <nav>
        <ul className='flex gap-10 justify-center py-10 text-xl'>
          {navigationKeys.map((key) => (
            <li key={key}>
              <Link href={`/${key}`}>{t(`navigation.${key}`)}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <div>
          <aside>
            <h2 className='bg-white/10 py-3 px-3'>{t("title")}</h2>
            <p className='mt-10'>  {t("description")}</p>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Homepage