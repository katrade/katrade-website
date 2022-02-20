import { Require } from './Match'

export interface Item {
  category: {
    parentCategoryEn: string
    parentCategoryTh: string
    childCategoryEn: string
    childCategoryTh: string
  }
  pictures: string[]
  favourite: string[]
  _id: string
  username: string
  owner: string
  lock: 0 | 1
  timeStamp: string
  name: string
  detail: string
  require: Require[]
  __v: number
}
