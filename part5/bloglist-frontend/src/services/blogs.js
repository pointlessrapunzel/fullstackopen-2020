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

const likeBlog = async (id, blogData) => {
  blogData.likes++
  // server expects it to be ObjectId, not populated data
  blogData.user = blogData.user.id

  const res = await axios.put(`${baseUrl}/${id}`, blogData)
  return res.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, saveBlog, likeBlog, deleteBlog, setToken }