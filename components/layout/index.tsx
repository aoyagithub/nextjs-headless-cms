import { Footer, Header } from '@/components'
import { FC, ReactNode, useEffect, useState } from 'react'
import styles from './index.style'
import { Category, Tag } from 'types'

type Props = {
  children: ReactNode
  categories: Category[]
  tags: Tag[]
}

export const Layout: FC<Props> = ({ children, categories, tags }) => {
  const [scroll, setScroll] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const scrollWindow = () => {
    setScroll(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollWindow)
  }, [])
  useEffect(() => {
    const border = 50
    border <= scroll ? setScrolled(true) : setScrolled(false)
  }, [scroll])
  return (
    <>
      <div className={scrolled ? 'scrolled' : ''}>
        <Header categories={categories} tags={tags} />
        <div className='inner'>{children}</div>
        <Footer tags={tags} />
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
