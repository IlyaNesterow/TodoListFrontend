import { graphqlLink } from '../utils/serverUrl'
import headers from '../utils/headers'
import query from '../graphql/create-user'

export default (data, signal) => 
  fetch(graphqlLink, {
    headers: headers, 
    method: 'POST',
    body: JSON.stringify(query(data)),
    signal: signal
  })
    .then(res => res.json())
    .then(res => res.data.createUser || false)
    .catch(err => {
      console.log(err.message)
      return false
    })