import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styles from './index.style'
import { Tag } from 'types'

type Props = {
  tags: Tag[]
}

export const Footer: FC<Props> = ({ tags }) => {
  const [year, setYear] = useState('')
  useEffect(() => {
    const d = new Date()
    setYear(d.getFullYear().toString())
  }, [])
  return (
    <>
      <footer className='footer' role='contentinfo' itemScope itemType='http://schema.org/WPFooter'>
        <div className='inner'>
          <div className='footer-content'>
            <div className='footer-item'>
              <div className='footer-item-item'>
                <h1 className='footer-title'>Next.js Headless CMS</h1>
                <p className='footer-text'>Next.js Headless CMS</p>
              </div>
              <p className='footer-copyright footer-item-item pc'>© {year} Next.js Headless CMS</p>
            </div>
            <div className='footer-item'>
              <h2 className='footer-heading'>Topics</h2>
              <ul className='tags-list'>
                {tags &&
                  tags.map((tag) => (
                    <li key={tag.id} className='tags-list-item'>
                      <Link href={`/tag/${tag.id}/page/1`}>
                        <a className='tags-list-link'>{tag.tag}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='footer-item'>
              <ul className='footer-link-list'>
                <li className='footer-link-item'>
                  <Link href='/about'>
                    <a className='footer-link-link'>About</a>
                  </Link>
                </li>
                <li className='footer-link-item'>
                  <Link href='/contact'>
                    <a className='footer-link-link'>Contact</a>
                  </Link>
                </li>

                <li className='footer-link-item'>
                  <Link href='/sitemap'>
                    <a className='footer-link-link'>Sitemap</a>
                  </Link>
                </li>
              </ul>
              <p className='footer-copyright footer-item-item sp'>© {year} Next.js Headless CMS</p>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>{styles}</style>
    </>
  )
}
