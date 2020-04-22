import {request} from "./request"

export function getCategory() {
  return request({
    url: '/api/h8/category'
  })
}

export function getsubcategory(maitKey) {
  return request({
    url: '/api/h8/subcategory',
    params: {
      maitKey
    }
  })
}
