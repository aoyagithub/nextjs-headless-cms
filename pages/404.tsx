import { Layout, Search, Categories, RecentPosts, Meta } from '@/components'
import { client } from 'libs/client'
import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/pages/index.style'
import { Category, Tag, Article } from 'types'

type Props = {
  categories: Category[]
  tags: Tag[]
  recentPosts: Article[]
}

const Page404: NextPage<Props> = ({ categories, tags, recentPosts }) => {
  return (
    <>
      <Meta title='404 Page Not Found' />
      <Layout categories={categories} tags={tags}>
        <div className='content'>
          <main className='main'>
            <h1>404 Page Not Found</h1>
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
      categories: categories.contents,
      tags: tags.contents,
      recentPosts,
    },
  }
}

export default Page404
