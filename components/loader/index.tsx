import { FC } from 'react'
import styles from './index.style'

export const Loader: FC = () => {
  return (
    <>
      <div className='loader'>
        <div className='loading'>
          {[...Array(4)].map((value, index) => (
            <div className='loading-bar' key={index} />
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
