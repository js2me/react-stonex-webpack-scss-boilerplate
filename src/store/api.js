import kinka from 'kinka'

const apiPath = 'api/v1'

export const baseURL = envs.baseURL

export const getBaseUrlLink = (path = '') => `${baseURL}${path}`

export default kinka.create({
  baseURL: `${baseURL}/${apiPath}`,
})
