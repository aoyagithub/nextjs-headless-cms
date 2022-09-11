/* eslint-disable @next/next/no-img-element */
import { FC, useState } from 'react'
import styles from './index.style'

type Props = {
  id: string
  title: string
}

export const Share: FC<Props> = ({ id, title }) => {
  const [clipboard, setClipboard] = useState(false)

  const copyToClipboard = () => {
    setClipboard(true)
    navigator.clipboard
      .writeText(`https://your-domain.com/${id}`)
      .then(() => {})
      .catch((e) => {
        console.error(e)
      })
    setTimeout(() => {
      setClipboard(false)
    }, 5000)
  }
  return (
    <>
      <div className='share'>
        <ul className='share-list'>
          <li className='share-list-item'>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title,
              )}&url=https://your-domain.com/${id}`}
              target='_blank'
              rel='noopener noreferrer'
              className='share-list-link twitter'
            >
              <img
                src='/images/twitter.svg'
                alt='Twitter'
                className='share-list-img share-list-img-twitter'
              />
            </a>
          </li>
          <li className='share-list-item'>
            <a
              href={`https://www.facebook.com/sharer.php?u=https://your-domain.com/${id}`}
              target='_blank'
              rel='noopener noreferrer'
              className='share-list-link facebook'
            >
              <img
                src='/images/facebook.svg'
                alt='Facebook'
                className='share-list-img share-list-img-facebook'
              />
            </a>
          </li>
          <li className='share-list-item'>
            <span className='share-list-link clipboard' onClick={() => copyToClipboard()}>
              <img
                src='/images/clipboard.svg'
                alt='Copy to clipboard'
                className='share-list-img share-list-img-clipboard'
              />
            </span>
          </li>
        </ul>
        {clipboard && <p className='clipboard-text'>記事のURLをコピーしました！</p>}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
