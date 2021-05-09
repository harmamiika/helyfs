import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteMethod = id => {
    console.log(id)
    let deleteUrl = `${baseUrl}/${id}`
    return axios.delete(deleteUrl)
}

const put = newObject => {
    console.log(newObject)
    let putUrl = `${baseUrl}/${newObject.id}`
    return axios.put(putUrl, newObject)
}

export default { create, deleteMethod, put }