import Link from 'next/link'
import { Layout, Search, Categories, RecentPosts, Meta, Banner, Loader } from '@/components'
import { client } from 'libs/client'
import type { GetServerSideProps, NextPage } from 'next'
import dayjs from 'dayjs'
import styles from '../../styles/pages/search.style'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Article, Category, Tag } from 'types'

type Props = {
  categories: Category[]
  tags: Tag[]
  recentPosts: Article[]
  q: string
}

const Index: NextPage<Props> = ({ categories, tags, recentPosts, q }) => {
  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState<Article[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const router = useRouter()
  useEffect(() => {
    search(q)
  }, [router, q])

  const search = async (q = '') => {
    if (!q.trim()) return
    setLoading(true)
    const res: any = await axios.get(`/api/search?q=${q}`).catch((error) => ({ error }))
    setLoading(false)
    if (res.data.data) {
      setContents(res.data.data.contents)
      setTotalCount(res.data.totalCount)
    } else {
      return
    }
  }

  return (
    <>
      <Meta title='Search' />
      <Layout categories={categories} tags={tags}>
        <div className='content'>
          <main className='main'>
            <div className='taxonomy-heading-area'>
              <h1 className='taxonomy-heading'>「{q}」の検索結果</h1>
            </div>
            {(contents === undefined || loading) && <Loader />}
            {!loading && contents && (
              <div>
                {contents.length === 0 && <div className='list-message'>記事がありません</div>}
                <ul className='list'>
                  {contents.map((content) => (
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
              </div>
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
      </Layout>
      <style jsx>{styles}</style>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = context.query.q

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
      categories: categories.contents || [],
      tags: tags.contents,
      q,
      recentPosts,
    },
  }
}

export default Index
