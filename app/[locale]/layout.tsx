import LocaleSwitcher from '@/component/ChangeLanguages'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <LocaleSwitcher />
    {children}</>
  )
}

export default layout