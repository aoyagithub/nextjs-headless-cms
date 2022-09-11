import Link from 'next/link'
import { Layout, Search, Categories, RecentPosts, Meta, Banner, Pagination } from '@/components'
import { client } from 'libs/client'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dayjs from 'dayjs'
import styles from '../../styles/pages/index.style'
import { Article, Category, Tag } from 'types'

type Props = {
  contents: Article[]
  categories: Category[]
  page: string
  tags: Tag[]
  pagination: number[]
  recentPosts: Article[]
}

const Index: NextPage<Props> = ({ contents, categories, page, tags, pagination, recentPosts }) => {
  return (
    <>
      <Meta />
      <Layout categories={categories} tags={tags}>
        <div>
          <div className='content'>
            <main className='main'>
              {!contents ||
                (contents.length === 0 && <div className='list-message'>記事がありません</div>)}
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
                <Pagination pagination={pagination} current={Number(page)} />
              )}
            </main>
            <aside
              className='aside'
              role='complementary'
              itemScope
              itemType='http://schema.org/WPSideBar'
            >
              <Search />
              <Categories categories={categories} />
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
  const limit = 10
  const currentPage = 1
  const allSlugs = await client.get({
    endpoint: 'articles',
    queries: {
      limit,
      offset: (currentPage - 1) * limit,
    },
  })
  const pagination = [...Array(Math.ceil(allSlugs.totalCount / 10)).keys()]
  const paths = pagination.map((page) => {
    return { params: { id: (page + 1).toString() } }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const page = (context.params?.id as string) || '1'
  const limit = 10
  const data = await client.get({
    endpoint: 'articles',
    queries: {
      limit,
      offset: (parseInt(page) - 1) * limit,
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

  return {
    props: {
      ...data,
      categories: categories.contents,
      tags: tags.contents,
      page,
      pagination: [...Array(Math.ceil(data.totalCount / limit)).keys()],
      recentPosts,
    },
  }
}

export default Index
