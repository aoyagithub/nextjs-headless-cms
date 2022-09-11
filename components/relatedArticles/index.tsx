import Link from 'next/link'
import { FC } from 'react'
import styles from './index.style'
import { Article } from 'types'

type Props = {
  articles: Article[]
}

export const RelatedArticles: FC<Props> = ({ articles }) => {
  return (
    <>
      <section className='related-articles'>
        <h2 className='section-heading'>Related Articles</h2>
        <ul className='list'>
          {articles.map((article) => (
            <li key={article.id} className='item'>
              <Link href={`/${article.id}`}>
                <a className='link' itemProp='url' title={article.title}>
                  {article.image && (
                    <picture itemScope itemType='http://schema.org/ImageObject'>
                      <source
                        type='image/webp'
                        srcSet={`${article.image.url}?fit=crop&w=339&h=165&fm=webp`}
                      />
                      <img
                        src={`${article.image.url}?fit=crop&w=339&h=165&fm=webp`}
                        alt={article.title}
                        width={article.image.width}
                        height={article.image.height}
                        className='image lazyload'
                      />
                    </picture>
                  )}
                </a>
              </Link>
              <dl className='article'>
                <dt className='title'>
                  <Link href={`/${article.id}`}>
                    <a className='link' itemProp='url' title={article.title}>
                      {article.title}
                    </a>
                  </Link>
                </dt>
                <dd>
                  <Link href={`/category/${article.category.id}/page/1`}>
                    <a className='category link'>{article.category.category}</a>
                  </Link>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}
