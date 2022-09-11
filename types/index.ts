import { MicroCMSImage } from 'microcms-js-sdk'

export type Article = {
  id: string
  title: string
  category: Category
  article_tags?: Tag[]
  index: boolean
  body: Body[]
  excerpt?: string
  image: MicroCMSImage
  related_articles?: Article[]
  modified_date?: string
  description?: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
}

export type Body = {
  fieldId: string
  html?: string
  richEditor?: string
}

export type Category = {
  category: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
  id: string
}

export type Tag = {
  tag: string
  createdAt: string
  publishedAt: string
  revisedAt: string
  updatedAt: string
  id: string
}
export type Toc = {
  id: string
  name: string
  text: string
}
