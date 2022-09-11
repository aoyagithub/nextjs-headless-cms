/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { FC } from 'react'
import styles from './index.style'
import { Article } from 'types'

type Props = {
  contents: Article[]
}

export const RecentPosts: FC<Props> = ({ contents }) => {
  return (
    <>
      <section className='sidebar'>
        <h2 className='sidebar-heading'>Recent Posts</h2>
        <ul className='sidebar-list'>
          {contents.map((content) => (
            <li key={content.id} className='sidebar-list-item'>
              <Link href={`/${content.id}`}>
                <a className='sidebar-list-link' itemProp='url' title={content.title}>
                  <img
                    src={`${content.image.url}?fit=crop&w=100&h=100&fm=webp`}
                    alt={content.title}
                    className='sidebar-list-image'
                    itemScope
                    itemType='http://schema.org/ImageObject'
                    width={100}
                    height={100}
                  />
                  <p className='sidebar-list-text'>{content.title}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}
