/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { FC } from 'react'
import styles from './index.style'
import { Category, Tag } from 'types'

type Props = {
  pagination: number[]
  current: number
  category?: Category
  tag?: Tag
}

export const Pagination: FC<Props> = ({ pagination, current, category, tag }) => {
  const getPath = (p: number) => {
    if (category !== undefined) {
      return `/category/${category.id}/page/${p}`
    } else if (tag !== undefined) {
      return `/tag/${tag.id}/page/${p}`
    } else {
      return `/page/${p}`
    }
  }
  return (
    <>
      <div className='wrapper'>
        <ul className='pagination'>
          {current > 1 && (
            <li className='page arrow'>
              <Link href={getPath(current - 1)}>
                <a className='link'>
                  <img
                    src='/images/pagination-left.svg'
                    width={24}
                    height={24}
                    alt='前のページへ'
                    className='image'
                  />
                </a>
              </Link>
            </li>
          )}
          {3 < current && (
            <li className='page'>
              <Link href={getPath(1)}>
                <a className='link'> 1 </a>
              </Link>
            </li>
          )}
          {4 < current && <li className='omission'>...</li>}
          {pagination.map((p) => {
            if (current - 3 <= p && p <= current + 1) {
              return (
                <li key={p} className={`page ${current === p + 1 ? 'active' : ''}`}>
                  {p + 1 === current && <span className='link'>{p + 1}</span>}
                  {p + 1 !== current && (
                    <Link href={getPath(p + 1)}>
                      <a className='link'>{p + 1}</a>
                    </Link>
                  )}
                </li>
              )
            }
          })}
          {current + 3 < pagination.length && <li className='omission'>...</li>}
          {current + 2 < pagination.length && (
            <li className='page'>
              <Link href={getPath(pagination.length)}>
                <a className='link'>{pagination.length}</a>
              </Link>
            </li>
          )}
          {current < pagination.length && (
            <li className='page arrow'>
              <Link href={getPath(current + 1)}>
                <a className='link'>
                  <img
                    src='/images/pagination-right.svg'
                    width={24}
                    height={24}
                    alt='次のページへ'
                    className='image'
                  />
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
