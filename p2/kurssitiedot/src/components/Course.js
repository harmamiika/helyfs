import React from 'react'

const Course = ({ course }) => {

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
        </>
    )
}

const Total = ({ parts }) => {
    const yht = parts.reduce((a,c)=> a+c.exercises, 0)
    return (
        <p><b>total of {yht} excercises</b></p>
    )
}


export default Course