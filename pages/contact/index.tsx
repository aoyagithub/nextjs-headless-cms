import { Layout, Search, Categories, RecentPosts, Meta } from '@/components'
import { client } from 'libs/client'
import type { GetStaticProps, NextPage } from 'next'
import styles from '../../styles/pages/contact.style'
import { SyntheticEvent, useState } from 'react'
import { Category, Tag, Article } from 'types'

type Props = {
  categories: Category[]
  tags: Tag[]
  recentPosts: Article[]
}

const Contact: NextPage<Props> = ({ categories, tags, recentPosts }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [send, setSend] = useState('Send')
  const [isSubmit, setIsSubmit] = useState(false)

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setSend('Sending...')

    const params = { q: email }
    const query = new URLSearchParams(params)
    await fetch(`/api/mail?${query}`, {
      method: 'POST',
      body: `
Name
${name}

Email
${email}

Message
${message}
`,
    })
      .then(() => {
        const inputName = document.getElementById('inputName') as HTMLInputElement | null
        const inputEmail = document.getElementById('inputEmail') as HTMLInputElement | null
        const message = document.getElementById('message') as HTMLInputElement | null

        inputName!.value = ''
        inputEmail!.value = ''
        message!.value = ''

        setName('')
        setEmail('')
        setMessage('')
        setIsSubmit(true)
        setSend('Send')
        setTimeout(() => {
          setIsSubmit(false)
        }, 5000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Meta
        title='Contact'
        description='Nuxt Headless CMSへのお問い合わせはこちらよりお願いいたします。'
      />
      <Layout categories={categories} tags={tags}>
        <div className='content'>
          <main className='main'>
            <h1>Contact</h1>
            <form onSubmit={onSubmit}>
              <div className='item'>
                <input
                  id='inputName'
                  onChange={(e) => setName(e.target.value)}
                  name='name'
                  type='text'
                  className='input'
                  placeholder='Name *'
                  required
                />
              </div>
              <div className='item'>
                <input
                  id='inputEmail'
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  type='email'
                  className='input'
                  placeholder='Email *'
                  required
                />
              </div>
              <div className='item'>
                <textarea
                  id='message'
                  onChange={(e) => setMessage(e.target.value)}
                  name='message'
                  rows={6}
                  className='message'
                  placeholder='Message'
                ></textarea>
              </div>
              {isSubmit && (
                <div className='item'>
                  <p className='form-thanks'>Thanks!</p>
                </div>
              )}
              <div className='item'>
                <button className='button' type='submit'>
                  {send}
                </button>
              </div>
            </form>
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

export default Contact
