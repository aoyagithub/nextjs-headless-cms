import Link from 'next/link'
import {
  Layout,
  Search,
  Categories,
  RecentPosts,
  Meta,
  Banner,
  Loader,
  Pagination,
} from '@/components'
import { client } from 'libs/client'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dayjs from 'dayjs'
import styles from '../../../../styles/pages/category.style'
import { Article, Category as TypeCategory, Tag } from 'types'

type Props = {
  contents: Article[]
  categories: TypeCategory[]
  page: string
  tags: Tag[]
  pagination: number[]
  recentPosts: Article[]
  selectedCategory: TypeCategory
}

const Category: NextPage<Props> = ({
  contents,
  categories,
  page,
  tags,
  pagination,
  recentPosts,
  selectedCategory,
}) => {
  return (
    <>
      <Meta />
      <Layout categories={categories} tags={tags}>
        <div>
          <div className='content'>
            <main className='main'>
              {selectedCategory && (
                <div className='taxonomy-heading-area'>
                  <h1 className='taxonomy-heading'>{selectedCategory.category}の記事一覧</h1>
                </div>
              )}
              {contents === undefined && <Loader />}
              {contents && contents.length === 0 && (
                <div className='list-message'>記事がありません</div>
              )}
              <ul className='list'>
                {contents &&
                  contents.map((content) => (
                    <li key={content.id} className='item'>
                      <Link href={`/${content.id}`}>
                        <a className='link' itemProp='url' title={content.title}>
                          {content.image && (
                            <picture
                              className='picture'
                              itemScope
                              itemType='http://schema.org/ImageObject'
                            >
                              <source
                                media='(min-width: 768px)'
                                type='image/webp'
                                srcSet={`${content.image.url}?fit=crop&w=352&h=151&fm=webp, ${
                                  content.image.url
                                }?fit=crop&w=${352 * 2}&h=${151 * 2}&fm=webp 2x`}
                              />
                              <source
                                media='(max-width: 767px)'
                                type='image/webp'
                                srcSet={`${content.image.url}?fit=crop&w=350&h=200&fm=webp, ${
                                  content.image.url
                                }?fit=crop&w=${350 * 2}&h=${200 * 2}&fm=webp 2x`}
                              />
                              <img
                                src={`${content.image.url}?fit=crop&w=352&h=151&fm=webp`}
                                width={content.image.width}
                                height={content.image.height}
                                className='image lazyload'
                                alt={content.title}
                              />
                            </picture>
                          )}
                        </a>
                      </Link>
                      <dl className='item-content'>
                        <dt className='title'>
                          <Link href={`/${content.id}`}>
                            <a className='link' itemProp='url' title={content.title}>
                              {content.title}
                            </a>
                          </Link>
                        </dt>

                        <dd className='detail'>
                          <Link href={`/category/${content.category.id}/page/1`}>
                            <a className='category link'>{content.category.category}</a>
                          </Link>
                          <time
                            className={`timestamp ${
                              content.updatedAt !== content.publishedAt ? 'updated' : ''
                            } ${content.updatedAt === content.publishedAt ? 'published' : ''}
                        `}
                            dateTime={dayjs(content.updatedAt || content.publishedAt).format(
                              'YYYY-MM-DD',
                            )}
                          >
                            {dayjs(content.updatedAt || content.publishedAt).format('YYYY-MM-DD')}
                          </time>
                        </dd>
                      </dl>
                    </li>
                  ))}
              </ul>
              {contents && contents.length > 0 && (
                <Pagination
                  pagination={pagination}
                  current={Number(page)}
                  category={selectedCategory}
                />
              )}
            </main>
            <aside
              className='aside'
              role='complementary'
              itemScope
              itemType='http://schema.org/WPSideBar'
            >
              <Search />
              {categories && <Categories categories={categories} />}
              {recentPosts && <RecentPosts contents={recentPosts} />}
              <Banner />
            </aside>
          </div>
        </div>
      </Layout>
      <style jsx>{styles}</style>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const page = (context.params?.id as string) || '1'
  const categoryId = context.params?.categoryId
  const limit = 10
  const articleFilter = categoryId !== undefined ? `category[equals]${categoryId}` : undefined

  const data = await client.get({
    endpoint: 'articles',
    queries: {
      limit,
      offset: (parseInt(page) - 1) * limit,
      filters: articleFilter,
    },
  })
  const categories = await client.get({
    endpoint: 'categories',
    queries: {
      limit: 100,
    },
  })
  const tags = await client.get({
    endpoint: 'tags',
    queries: {
      limit: 1000,
    },
  })
  const recentPostsData = await client.get({
    endpoint: 'articles',
    queries: { limit: 5 },
  })

  let recentPosts: Article[] | null = []
  if (recentPostsData.contents.length < 5) {
    recentPosts = null
  } else {
    recentPosts = [...Array(5)].map((value, index) => {
      return recentPostsData.contents[index]
    })
  }
  const selectedCategory =
    categoryId !== undefined
      ? categories.contents.find((content: TypeCategory) => content.id === categoryId)
      : undefined
  return {
    props: {
      ...data,
      categories: categories.contents,
      tags: tags.contents,
      page,
      selectedCategory,
      pagination: [...Array(Math.ceil(data.totalCount / limit)).keys()],
      recentPosts,
    },
  }
}

export default Category
