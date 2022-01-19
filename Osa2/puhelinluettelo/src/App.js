import React, { useState , useEffect} from 'react'
import contactService from './services/contacts'

const Heading = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Contact = ({person, handleClick}) => {
  return (
   <li>
     {person.name} {person.number} <button onClick={() =>handleClick(person)}>delete</button>
   </li>
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
    contactService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }
  
  useEffect(hook, [])

  const addContact = (event) => {
    const personObj = {
      name: newName,
      number: newNumber
    }
    if (!persons.map(person => person.name).includes(newName)) {
      event.preventDefault()
      contactService
        .create(personObj)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('')
            setNewNumber('')
          })
    } else {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          event.preventDefault()
          const personToUpdate = persons.find(p => p.name === newName)
          contactService
            .update(personToUpdate.id, personObj)
              .then(retPerson => {
                setPersons(persons.map(person => person.id !== personToUpdate.id ? person : retPerson))
                setNewName('')
                setNewNumber('')
              })
        event.preventDefault()
      }

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

  const deleteContact= (remove) => {
    if (window.confirm(`Delete ${remove.name}?`)) {
      contactService
      .del(remove.id)
        .then(() =>
          setPersons(persons.filter(person => person.id !== remove.id)))
    }
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
        <Contact key={person.name} person={person} handleClick={deleteContact}/>)}
      </ul>
    </div>
  )

}

export default App
