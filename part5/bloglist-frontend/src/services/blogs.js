import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = async blogData => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, blogData, config)
  return res.data
}

export default { getAll, saveBlog, setToken }