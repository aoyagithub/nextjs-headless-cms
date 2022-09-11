import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './index.style'
import { Category, Tag } from 'types'

type Props = {
  categories: Category[]
  tags: Tag[]
}

export const Header: FC<Props> = ({ categories, tags }) => {
  const input = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)

  const openMenu = () => {
    if (open) {
      if (menu) {
        setMenu(false)
        setOpen(false)
      }
      if (search) {
        setMenu(true)
        setSearch(false)
      }
    } else {
      setOpen(true)
      setMenu(true)
    }
  }

  const openSearch = () => {
    if (open) {
      if (search) {
        setOpen(false)
        setSearch(false)
      }
      if (menu) {
        setMenu(false)
        setSearch(true)
      }
    } else {
      setOpen(true)
      setSearch(true)
    }
  }
  useEffect(() => {
    open
      ? document.querySelector('body')?.classList.add('header-active')
      : document.querySelector('body')?.classList.remove('header-active')
  }, [open])
  useEffect(() => {
    if (search) input.current?.focus()
  }, [search])
  useEffect(() => {
    setMenu(false)
    setOpen(false)
  }, [router])

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.trim()) return
    if (e.key === 'Enter') router.push(`/search?q=${e.currentTarget.value}`)
  }
  return (
    <>
      <header
        className={`header 
        ${open ? 'active' : ''}
        `}
        itemScope
        itemType='http://schema.org/WPHeader'
      >
        <div className='inner header-top'>
          <Link href='/'>
            <a className='header-link'>
              <span className='header-title'> Next.js Headless CMS </span>
            </a>
          </Link>

          <div className={`header-nav ${menu ? 'open' : ''}`} onClick={() => openMenu()}>
            <span className='header-nav-line' />
            <span className='header-nav-line' />
            <span className='header-nav-line' />
          </div>
          <div className='header-search' onClick={() => openSearch()}>
            {!open && (
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='10.5' cy='10.5' r='9' stroke='#c4c4c4' strokeWidth='3' />
                <path
                  d='M17.001 17L22.2868 22.1198'
                  stroke='#c4c4c4'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
              </svg>
            )}
            {open && (
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='10.5' cy='10.5' r='9' stroke='#fff' strokeWidth='3' />
                <path
                  d='M17.001 17L22.2868 22.1198'
                  stroke='#fff'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
              </svg>
            )}
          </div>
        </div>
        <div className='inner header-bottom'>
          <ul className='header-submenu'>
            {categories &&
              categories.map((category) => (
                <li key={category.id} className='header-submenu-item'>
                  <Link href={`/category/${category.id}/page/1`}>
                    <a className='header-submenu-link'>
                      <span className='header-submenu-ja'>{category.category}</span>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {open && (
          <div className={`header-overlay ${open ? 'active' : ''}`}>
            <div className='inner'>
              {menu && (
                <div className='header-overlay-content header-overlay-content-menu'>
                  <div className='header-overlay-item category'>
                    <h2 className='header-overlay-item-title'>Categories</h2>
                    <ul className='header-overlay-item-list'>
                      {categories.map((category) => (
                        <li key={category.id} className='header-overlay-item-list-item'>
                          <Link href={`/category/${category.id}/page/1`}>
                            <a className='header-overlay-item-list-link'>{category.category}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='header-overlay-item tag'>
                    <h2 className='header-overlay-item-title'>Topics</h2>
                    <ul className='header-overlay-item-list'>
                      {tags.map((tag) => (
                        <li key={tag.id} className='header-overlay-item-list-item'>
                          <Link href={`/tag/${tag.id}/page/1`}>
                            <a className='header-overlay-item-list-link'>{tag.tag}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='header-overlay-item links'>
                    <ul className='header-overlay-item-list'>
                      <li className='header-overlay-item-list-item'>
                        <Link href='/about'>
                          <a className='header-overlay-item-list-link'>About</a>
                        </Link>
                      </li>
                      <li className='header-overlay-item-list-item'>
                        <Link href='/contact'>
                          <a className='header-overlay-item-list-link'>Contact</a>
                        </Link>
                      </li>
                      <li className='header-overlay-item-list-item'>
                        <Link href='/sitemap'>
                          <a className='header-overlay-item-list-link'>Sitemap</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {search && (
                <div className='header-overlay-content header-overlay-content-search'>
                  <input
                    ref={input}
                    className='header-overlay-content-input'
                    type='text'
                    placeholder='Search...'
                    onKeyPress={(e) => onKeyPress(e)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      <style jsx>{styles}</style>
    </>
  )
}
