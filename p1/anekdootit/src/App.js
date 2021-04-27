import React, { useState } from 'react'


const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const handleAnecdoteClick = () => {
        setSelected(Math.floor(Math.random()*anecdotes.length))
    }
    const handleVoteClick = () => {
        const copy = [ ...votes]
        console.log(copy)
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        <div>
            <Header />
            {anecdotes[selected]}
            <br />
            {`has ${votes[selected]} votes`}
            <br />
            <Button handleClick={handleVoteClick} text='vote' />
            <Button handleClick={handleAnecdoteClick} text='next anecdote' />
            <Highlight anecdotes={anecdotes} votes={votes} />
        </div>
    )
}

const Highlight = ({anecdotes, votes}) => {
    const indexOfMaxValue = votes.indexOf(Math.max(...votes))
    return (
        <div>
            <h1>Anecdote with the most votes</h1>
            <p>{anecdotes[indexOfMaxValue]}</p>
            {`Has ${votes[indexOfMaxValue]} votes`}   
        </div>
    )
}

const Header = () => <h1>Anecdote of the day</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

export default App