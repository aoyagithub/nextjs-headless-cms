import { FC } from 'react'
import styles from './index.style'
import { Body } from 'types'

type Props = {
  body: Body[]
}

export const Post: FC<Props> = ({ body }) => {
  return (
    <>
      <div className='content-post' itemProp='articleBody'>
        {body &&
          body.map((item, index) => (
            <div key={index} className='content-post-iteration'>
              {item.richEditor && item.fieldId === 'richEditor' && (
                <div
                  className='rich-editor'
                  dangerouslySetInnerHTML={{ __html: item.richEditor }}
                />
              )}
              {item.html && item.fieldId === 'html' && (
                <div className='html' dangerouslySetInnerHTML={{ __html: item.html }} />
              )}
            </div>
          ))}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
