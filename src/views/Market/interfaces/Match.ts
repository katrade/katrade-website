export interface Require {
  reqCat: {
    parentCategoryEn: string
    parentCategoryTh: string
    childCategoryEn: string
    childCategoryTh: string
  }
  _id: string
  detail: string
}

export interface MatchInstance {
  match: {
    category: {
      parentCategoryEn: string
      parentCategoryTh: string
      childCategoryEn: string
      childCategoryTh: string
    }
    pictures: string[]
    favourite: []
    _id: string
    username: string
    owner: string
    lock: 0 | 1
    timeStamp: string
    name: string
    detail: string
    require: Require[]
    __v: 0
  }
  matchWith: [
    {
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
      __v: 0
    }
  ]
}
