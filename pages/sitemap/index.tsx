import Link from 'next/link'
import { Layout, Search, Categories, RecentPosts, Meta } from '@/components'
import { client } from 'libs/client'
import type { GetStaticProps, NextPage } from 'next'
import styles from '../../styles/pages/sitemap.style'
import { Article, Category, Tag } from 'types'

type Props = {
  categories: Category[]
  tags: Tag[]
  articles: {
    contents: Article[]
  }
  recentPosts: Article[]
}

export const Sitemap: NextPage<Props> = ({ categories, tags, articles, recentPosts }) => {
  return (
    <>
      <Meta title='Sitemap' description='Nuxt Headless CMS Sitemap' />
      <Layout categories={categories} tags={tags}>
        <div className='content'>
          <main className='main'>
            <h1>Sitemap</h1>
            <ul className='list'>
              {articles.contents.map((content: Article) => (
                <li key={content.id} className='item'>
                  <Link href={`/${content.id}`}>
                    <a className='link' title={content.title}>
                      {content.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
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
          </aside>
        </div>
      </Layout>
      <style jsx>{styles}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const limit = 5

  const articles = await client.get({
    endpoint: 'articles',
    queries: {
      limit: 9999,
    },
  })

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

  return {
    props: {
      categories: categories.contents,
      tags: tags.contents,
      contents,
      articles,
      recentPosts,
    },
  }
}
export default Sitemap
