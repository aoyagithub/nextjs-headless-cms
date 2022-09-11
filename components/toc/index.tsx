import Link from 'next/link'
import { FC } from 'react'
import styles from './index.style'
import { Toc as TypeToc } from 'types'

type Props = {
  toc: TypeToc[]
  visible: boolean
}

export const Toc: FC<Props> = ({ toc, visible }) => {
  return (
    <>
      {visible && (
        <div className='toc'>
          <h4 className='title'>目次</h4>
          <ul className='list'>
            {toc.map((item) => (
              <li key={item.id} className={`item ${item.name}`}>
                <Link href={`#${item.id}`}>
                  <a className='link'>{item.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  )
}
