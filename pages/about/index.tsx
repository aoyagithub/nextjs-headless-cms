import Link from 'next/link'
import { Layout, Search, Categories, RecentPosts, Meta } from '@/components'
import { client } from 'libs/client'
import type { GetStaticProps, NextPage } from 'next'
import styles from '../../styles/pages/about.style'
import { Category, Tag, Article } from 'types'

type Props = {
  categories: Category[]
  tags: Tag[]
  recentPosts: Article[]
}

const About: NextPage<Props> = ({ categories, tags, recentPosts }) => {
  return (
    <>
      <Meta title='About Nuxt Headless CMS' description='description text' />
      <Layout categories={categories} tags={tags}>
        <div className='content'>
          <main className='main'>
            <h1>About Next.js Headless CMS</h1>
            <p>Next.js Headless CMS</p>
            <h2>お問い合わせ</h2>
            <p>
              お問い合わせは
              <Link href='/contact'>
                <a className='tags-list-link'>こちら</a>
              </Link>
              よりどうぞ。
            </p>
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
      categories: categories.contents,
      tags: tags.contents,
      recentPosts,
    },
  }
}

export default About
