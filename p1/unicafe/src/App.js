import React, { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    // myöhemmin tajuttu että all-muuttuja ei ehkä paras tapa tähän. En viitsi enää muuttaa, mutta noted 
    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(all + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }


    return (
        <div>
            <Header />
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </div>
    )
}

const Header = () => <h1>Give feedback man please</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad, all }) => {
    if (all === 0){
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticLine label='good' value={good} />
                    <StatisticLine label='neutral' value={neutral} />
                    <StatisticLine label='bad' value={bad} />
                    <StatisticLine label='all' value={all} />
                    <StatisticLine label='average' value={(good -bad) /all} />
                    <StatisticLine label='positive' value={`${good/all*100} %`} />
                </tbody>
            </table>
        </div>
    )
}
//pohdin myös että onko label sittenkään hyvä nimi näille propseille, en päässyt mietinnässä lopputulokseen tai jaksanut tehdä muutoksia
const StatisticLine = ({ label, value }) => {
    return (
        <tr>
            <td>{label}</td>
            <td>{value}</td>
        </tr>
    )
}
//Viimeiden pohdinta oli app-komponentin pitämisestä dokumentin ylälaidassa,
//mielestäni se näyttää kivalta, mutta esimerkeissä on alhaalla. Onko ongelma?
export default App