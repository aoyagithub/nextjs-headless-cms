import { FC } from 'react'
import { useRouter } from 'next/router'
import styles from './index.style'

export const Search: FC = () => {
  const router = useRouter()
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.trim()) return
    if (e.key === 'Enter') router.push(`/search?q=${e.currentTarget.value}`)
  }
  return (
    <>
      <section className='sidebar'>
        <label className='label'>
          <h2 className='sidebar-heading'>Search</h2>
          <input
            className='input'
            type='text'
            placeholder='Search...'
            onKeyPress={(e) => onKeyPress(e)}
          />
        </label>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}
