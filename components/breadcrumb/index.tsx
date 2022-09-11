import Link from 'next/link'
import { FC } from 'react'
import styles from './index.style'
import { Category } from 'types'

type Props = {
  category: Category
  title: string
}

export const Breadcrumb: FC<Props> = ({ category, title }) => {
  const hasCategory = (arg: Category) => {
    return Object.keys(arg).length > 0
  }
  return (
    <>
      <ul className='breadcrumb' itemScope itemType='http://schema.org/BreadcrumbList'>
        <li
          className='breadcrumb-item breadcrumb-item-hasLink'
          itemProp='itemListElement'
          itemScope
          itemType='http://schema.org/ListItem'
        >
          <Link href='/'>
            <a itemProp='item' className='breadcrumb-link'>
              <span itemProp='name'>Home</span>
            </a>
          </Link>
          <meta itemProp='position' content='1' />
        </li>
        {hasCategory(category) && (
          <li
            className='breadcrumb-item breadcrumb-item-hasLink'
            itemProp='itemListElement'
            itemScope
            itemType='http://schema.org/ListItem'
          >
            <Link href={`/category/${category.id}/page/1`}>
              <a itemProp='item' className='breadcrumb-link'>
                <span itemProp='name'>{category.category}</span>
              </a>
            </Link>
            <meta itemProp='position' content='2' />
          </li>
        )}

        <li className='breadcrumb-item'>
          <span>{title}</span>
        </li>
      </ul>
      <style jsx>{styles}</style>
    </>
  )
}
