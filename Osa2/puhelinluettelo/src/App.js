import React, { useState , useEffect} from 'react'
import axios from 'axios'

const Heading = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Contact = ({name, number}) => {
  return (
   <li>{name} {number}</li>
  )
}

const Input = ({description, value, onChange}) => {
  return (
    <div>
      {description} <input value={value} onChange={onChange}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addContact = (event) => {
    if (!persons.map(person => person.name).includes(newName)) {
      event.preventDefault()
      const personObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)  //event target value viittaa inputin syöttökenttään
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name
    .toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Heading text={"Phonebook"}/>
      <Input description={"filter shown with: "} value={newFilter} onChange={handleFilter}/>
      <Heading text={"add a new"}/>
      <form onSubmit={addContact}>
        <Input description={"name: "} value={newName} onChange={handleNewName}/>
        <Input description={"number: "} value={newNumber} onChange={handleNewNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Heading text={"Numbers"}/>
      <ul>{personsToShow.map(person => 
        <Contact key={person.name} name={person.name} number={person.number}/>)}
      </ul>
    </div>
  )

}

export default App
