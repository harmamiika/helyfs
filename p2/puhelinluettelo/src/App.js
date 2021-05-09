import React, { useState, useEffect } from 'react'
import axios from 'axios'
import numberService from './services/phoneNumbers'
import phoneNumbers from './services/phoneNumbers'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [actionTrigger, setActiontrigger] = useState(true)
    const [fakeAlertText, setFakeAlertText] = useState('jou jou')
    const [activeId, setActiveId] = useState(null)

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [actionTrigger])

    const peopleToShow = (filterValue === '')
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()
        const names = persons.map((person) => person.name)
        let newObject = { name: newName, number: newNumber }
        if (names.includes(newName)) {
            let idJoke = persons.find(pleb => pleb.name === newName).id
            newObject = { ...newObject, id: idJoke }
            console.log(newObject, 'tättädädää')
            phoneNumbers
                .put(newObject)
                .then((response) => {
                    setActiontrigger(!actionTrigger)
                    setNewName('')
                    setNewNumber('')
                    setActiveId(response.data.id)
                    setFakeAlertText('Changed number')
                    setTimeout(() => {
                        setActiveId(null)
                    }, 5000)
                })


        } else {
            numberService
                .create(newObject)
                .then(response => {
                    console.log(response.data.id, 'SWAG BOI')
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                    let dataId = response.data.id
                    console.log(dataId, 'saatana mikä homo')
                    setActiveId(dataId)
                    setFakeAlertText('Added')
                    setTimeout(() => {
                        setActiveId(null)
                    }, 5000)
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification fakeAlertText={fakeAlertText} activeId={activeId} setActiveId={setActiveId} persons={persons} />
            <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PhonebookForm addPerson={addPerson} newName={newName}
                handleNameChange={handleNameChange} newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <BookPage people={peopleToShow} actionTrigger={actionTrigger} setActiontrigger={setActiontrigger} activeId={activeId} setActiveId={setActiveId} setFakeAlertText={setFakeAlertText} />
        </div>
    )

}

const Notification = ({ fakeAlertText, activeId, persons }) => {

    if (activeId) {
        return (
            <div className='error'>
                {fakeAlertText} {persons.find(person => person.id === activeId).name}
            </div>
        )
    }
    return <></>
}

const Filter = ({ filterValue, handleFilterChange }) => {
    return (
        <div>Filter: <input value={filterValue} onChange={handleFilterChange} /></div>
    )
}

const PhonebookForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const BookPage = ({ people, actionTrigger, setActiontrigger, activeId, setActiveId, setFakeAlertText }) => {

    console.log(people)
    return (
        <div>
            <h2>Numbers</h2>
            {people.map(person => <BookPageElement person={person} key={person.id} actionTrigger={actionTrigger} setActiontrigger={setActiontrigger} activeId={activeId} setActiveId={setActiveId} setFakeAlertText={setFakeAlertText}/>
            )}
        </div>
    )
}

const BookPageElement = ({ person, actionTrigger, setActiontrigger, activeId, setActiveId, setFakeAlertText }) => {

    const handleDeleteClick = () => {
        console.log(person.id)
        setActiveId(person.id)
        setFakeAlertText('deleting')
        setTimeout(() => {
            setActiveId(null)
            phoneNumbers
                .deleteMethod(person.id)
                .then(response => {
                    console.log(response)
                    setActiontrigger(!actionTrigger)
                })
        }, 3000)
    }
    return (
        <p>
            {person.name} {person.number}
            <button onClick={handleDeleteClick}>delete</button>
        </p>)
}

export default App