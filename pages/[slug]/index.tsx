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
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import styles from '../../styles/pages/slug.style'
import { Article, Category, Tag, Toc as TypeToc } from 'types'

interface IParams extends ParsedUrlQuery {
  slug: string
}

type Props = {
  data: Article
  recentPosts: Article[]
  toc: TypeToc[]
  categories: Category[]
  tags: Tag[]
}

export const Slug: NextPage<Props> = ({ data, recentPosts, toc, categories, tags }) => {
  return (
    <>
      <Meta title={data.title} description={data.description} />
      <Layout categories={categories} tags={tags}>
        <div className='content'>
          <main className='main' role='main' itemProp='articleBody'>
            <article className='article'>
              <div className='post'>
                <ul className='taxonomy-list' itemProp='keywords'>
                  <li className='taxonomy-list-item category'>
                    <Link href={`/category/${data.category.id}/page/1`}>
                      <a className='taxonomy-list-link'>{data.category.category}</a>
                    </Link>
                  </li>

                  {data.article_tags && (
                    <>
                      {data.article_tags.map((tag) => (
                        <li key={tag.id} className='taxonomy-list-item tag'>
                          <Link href={`/tag/${tag.id}/page/1`}>
                            <a className='taxonomy-list-link'>{tag.tag}</a>
                          </Link>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
                <h1 className='title' itemProp='headline'>
                  {data.title}
                </h1>
                <time
                  className={`timestamp ${data.updatedAt !== data.publishedAt ? 'updated' : ''} ${
                    data.updatedAt === data.publishedAt ? 'published' : ''
                  }`}
                  dateTime={dayjs(data.updatedAt || data.publishedAt).format('YYYY-MM-DD')}
                >
                  {dayjs(data.updatedAt || data.publishedAt).format('YYYY-MM-DD')}
                </time>
                <div className='post-image' itemProp='image'>
                  {data.image && (
                    <picture>
                      <source
                        media='(min-width: 1160px)'
                        type='image/webp'
                        srcSet={`${data.image.url}?fit=crop&w=780&h=500&fm=webp, ${
                          data.image.url
                        }?fit=crop&w=${780 * 2}&h=${500 * 2}&fm=webp 2x`}
                      />
                      <source
                        media='(min-width: 768px)'
                        type='image/webp'
                        srcSet={`${data.image.url}?fit=crop&w=691&h=460&fm=webp, ${
                          data.image.url
                        }?fit=crop&w=${691 * 2}&h=${460 * 2}&fm=webp 2x`}
                      />
                      <source
                        media='(max-width: 767px)'
                        type='image/webp'
                        srcSet={`${data.image.url}?fit=crop&w=330&h=240&fm=webp, ${
                          data.image.url
                        }?fit=crop&w=${330 * 2}&h=${240 * 2}&fm=webp 2x`}
                      />
                      <img
                        src={`${data.image.url}?fit=crop&w=780&h=500&q=100`}
                        className='post-image-image'
                        itemProp='image'
                        alt={data.title}
                      />
                    </picture>
                  )}
                </div>
                <Toc toc={toc} visible={data.index} />
                <Post body={data.body} />
              </div>
              <Share id={data.id} title={data.title} />
            </article>
            {/* <!-- Start Ad Area --> */}
            <div className='ad' />
            {/* <!-- End Ad Area --> */}
            {data.related_articles && data.related_articles.length > 0 && (
              <RelatedArticles articles={data.related_articles} />
            )}
            <Breadcrumb category={data.category} title={data.title} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await client.get({
    endpoint: 'articles',
    queries: { depth: 2 },
  })
  return {
    paths: allSlugs.contents.map((content: { id: string }) => `/${content.id}`),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const limit = 5
  const { slug } = context.params as IParams
  const data = await client
    .get({
      endpoint: 'articles',
      contentId: slug,
      queries: { depth: 2 },
    })
    .catch(() => {
      return null
    })
  if (!data) {
    return { notFound: true }
  }

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
  const { contents } = await client.get({
    endpoint: 'articles',
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
  const $ = cheerio.load(JSON.stringify(data.body))
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
  $('pre code').each((_, elm) => {
    const res = hljs.highlightAuto($(elm).text())
    $(elm).html(res.value)
    $(elm).addClass('hljs')
  })
  $('img').each((_, elm) => {
    $(elm).attr('class', 'lazyload')
    $(elm).attr('data-src', elm.attribs.src)
    $(elm).removeAttr('src')
  })

  return {
    props: {
      data,
      recentPosts,
      toc,
      categories: categories.contents,
      tags: tags.contents,
      contents,
    },
  }
}
export default Slug
