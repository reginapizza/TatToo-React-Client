import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Tattoos = props => {
  const [tattoos, setTattoos] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/tattoos/`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(response => {
        setTattoos(response.data.tattoos.reverse())
      })
      .then(() => props.alert({ heading: 'Success', message: 'Here are your tats!', variant: 'success' }))
      .catch(() => props.alert({ heading: 'Oops!', message: 'Sorry, something went wrong...', variant: 'danger' }))
  }, [])

  const tattoosJsx = tattoos.map(tattoo => (
    <ListGroup.Item
      key={tattoo.id}
      action
      href={`#tattoos/${tattoo.id}`}
      className="container-fluid tattoo-teaser"
    >
      <div className="row">
        {tattoo.title}
      </div>
      <div className="row">
        {<img src={tattoo.picture} alt={'Tattoo of ' + tattoo.title} height="350" width="350"></img>}
      </div>
    </ListGroup.Item>
  ))

  return (
    <div className='row'>
      <div className='col'>
        <ListGroup>
          {tattoosJsx}
        </ListGroup>
      </div>
    </div>
  )
}

export default Tattoos
