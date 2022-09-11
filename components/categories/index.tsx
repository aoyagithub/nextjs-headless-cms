import Link from 'next/link'
import { FC } from 'react'
import styles from './index.style'
import { Category } from 'types'

type Props = {
  categories: Category[]
}

export const Categories: FC<Props> = ({ categories }) => {
  return (
    <>
      <section className='sidebar'>
        <h2 className='sidebar-heading'>Categories</h2>
        <ul className='sidebar-list'>
          {categories &&
            categories.map((category) => (
              <li key={category.id} className='sidebar-list-item'>
                <Link href={`/category/${category.id}/page/1`}>
                  <a className='sidebar-list-link'>{category.category}</a>
                </Link>
              </li>
            ))}
        </ul>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}
