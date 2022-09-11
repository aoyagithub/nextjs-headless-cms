import Link from 'next/link'
import {
  Layout,
  Search,
  Categories,
  RecentPosts,
  Meta,
  Toc,
  Post,
  Share,
  Banner,
  Breadcrumb,
  RelatedArticles,
} from '@/components'
import * as cheerio from 'cheerio'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import { client } from 'libs/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import type { GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import styles from '../../styles/pages/draft.style'
import { Category, Tag, Article } from 'types'

type Props = {
  categories: Category[]
  tags: Tag[]
  recentPosts: Article[]
}

export const Draft: NextPage<Props> = ({ recentPosts, categories, tags }) => {
  const router = useRouter()
  const [draftData, setDraftData] = useState({
    id: '',
    image: {
      url: '',
    },
    body: [],
    title: '',
    createdAt: '',
    publishedAt: '',
    updatedAt: '',
    index: false,
    article_tags: [],
    category: {
      category: '',
      id: '',
      name: '',
      createdAt: '',
      publishedAt: '',
      revisedAt: '',
      updatedAt: '',
    },
    tag: {
      id: '',
      tag: '',
    },
    related_articles: [],
  })
  const [draftToc, setToc] = useState([{ text: '', id: '', name: '' }])

  useEffect(() => {
    draft()
  }, [router])

  const draft = async () => {
    const query = router.query
    if (query.id === undefined || query.draftKey === undefined) {
      return
    }

    const res: any = await axios
      .get(`/api/draft?id=${query.id}&draftKey=${query.draftKey}`)
      .catch((error) => ({ error }))

    if (res.data.data) {
      setDraftData(res.data.data)
    } else {
      return
    }

    const $ = cheerio.load(JSON.stringify(draftData.body))
    const headings = $('h1, h2, h3').toArray()

    const toc = headings.map((d: cheerio.AnyNode | any) => {
      const dId = d.attribs.id
      const dIdSlice1 = dId.slice(2)
      const dIdSlice2 = dIdSlice1.slice(0, -2)
      return {
        text: d.children[0].data,
        id: dIdSlice2,
        name: d.name,
      }
    })
    setToc(toc)
    $('pre code').each((_, elm) => {
      const res = hljs.highlightAuto($(elm).text())
      $(elm).html(res.value)
      $(elm).addClass('hljs')
    })
  }

  return (
    <>
      <Meta />
      <Layout categories={categories} tags={tags}>
        <div className='content'>
          {!draftData.id && <p className='loading'>Now Loading...</p>}
          {draftData.id && (
            <main className='main'>
              <article className='article'>
                <div className='post'>
                  {draftData.category && (
                    <ul className='taxonomy-list'>
                      <li className='taxonomy-list-item category'>
                        <Link href={`/category/${draftData.category.id}/page/1`}>
                          <a className='taxonomy-list-link'>{draftData.category.category}</a>
                        </Link>
                      </li>
                      {draftData.article_tags && (
                        <>
                          {draftData.article_tags.map((tag: { id: ''; tag: '' }) => (
                            <li key={tag.id} className='taxonomy-list-item tag'>
                              <Link href={`/tag/${tag.id}/page/1`}>
                                <a className='taxonomy-list-link'>{tag.tag}</a>
                              </Link>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  )}
                  <h1 className='title'>{draftData.title}</h1>
                  <time
                    className={`timestamp ${
                      draftData.updatedAt !== draftData.publishedAt ? 'updated' : ''
                    } ${draftData.updatedAt === draftData.publishedAt ? 'published' : ''}`}
                    dateTime={dayjs(draftData.updatedAt || draftData.publishedAt).format(
                      'YYYY-MM-DD',
                    )}
                  >
                    {dayjs(draftData.updatedAt || draftData.publishedAt).format('YYYY-MM-DD')}
                  </time>
                  <div className='post-image'>
                    {draftData.image && (
                      <picture>
                        <source
                          media='(min-width: 1160px)'
                          type='image/webp'
                          srcSet={`${draftData.image.url}?fit=crop&w=700&h=400&fm=webp, ${
                            draftData.image.url
                          }?fit=crop&w=${700 * 2}&h=${400 * 2}&fm=webp 2x`}
                        />
                        <source
                          media='(min-width: 768px)'
                          type='image/webp'
                          srcSet={`${draftData.image.url}?fit=crop&w=658&h=376&fm=webp, ${
                            draftData.image.url
                          }?fit=crop&w=${658 * 2}&h=${376 * 2}&fm=webp 2x`}
                        />
                        <source
                          media='(max-width: 767px)'
                          type='image/webp'
                          srcSet={`${draftData.image.url}?fit=crop&w=330&h=188&fm=webp, ${
                            draftData.image.url
                          }?fit=crop&w=${330 * 2}&h=${188 * 2}&fm=webp 2x`}
                        />
                        <img
                          src={`${draftData.image.url}?fit=crop&w=700&h=400&q=100`}
                          className='post-image-image'
                          alt={draftData.title}
                        />
                      </picture>
                    )}
                  </div>
                  <Toc toc={draftToc} visible={draftData.index} />
                  <Post body={draftData.body} />
                </div>
                <Share id={draftData.id} title={draftData.title} />
              </article>
              {/* <!-- Start Ad Area --> */}
              <div className='ad' />
              {/* <!-- End Ad Area --> */}
              {draftData.related_articles.length > 0 && (
                <RelatedArticles articles={draftData.related_articles} />
              )}
              <Breadcrumb category={draftData.category} title={draftData.title} />
            </main>
          )}
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

export const getStaticProps: GetStaticProps = async () => {
  const limit = 5

  const recentPostsData = await client.get({
    endpoint: 'articles',
    queries: { limit },
  })
  let recentPosts: Article[] | null = []
  if (recentPostsData.contents.length < 5) {
    recentPosts = null
  } else {
    recentPosts = [...Array(5)].map((value, index) => {
      return recentPostsData.contents[index]
    })
  }
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

  return {
    props: {
      recentPosts,

      categories: categories.contents,
      tags: tags.contents,
    },
  }
}
export default Draft
