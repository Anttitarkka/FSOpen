import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Display from './components/display'

const Input = ({description, value, onChange}) => {
  return (
    <div>
      {description} <input value={value} onChange={onChange}/>
    </div>
  )
}

function App() {
  const [countries, setCountry] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [selected, setSelected] = useState('') //Määrittää näytetäänkö yksi maa listan sijasta
  const [showSelected, setShow] = useState(false)

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    if (!selected.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase())) {
      //Jos filter muuttuu ei näytetä enää yhtä maata
      setShow(false)
      setSelected('')
    }
  }

  const handleShow = (name) => {
    setSelected(name)
    setShow(true)
  }

  const countriesToShow = showSelected
    ? countries.filter(country => country.name.common === selected)
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Input description={'find countries'} value={newFilter} onChange={handleFilter} />
      <Display countriesToShow={countriesToShow} handleClick={handleShow}/>
    </div>
  )
}

export default App;
