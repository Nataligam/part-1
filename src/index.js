import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.excercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.course.parts[0]['name']} excercises={props.course.parts[0]['exercises']}></Part>
      <Part name={props.course.parts[1]['name']} excercises={props.course.parts[1]['exercises']}></Part>
      <Part name={props.course.parts[2]['name']} excercises={props.course.parts[2]['exercises']}></Part>
    </>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.course.parts[0]['exercises'] + props.course.parts[1]['exercises'] + props.course.parts[2]['exercises']}
    </p>
  )
}


const App1 = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  let [good, neutral, bad, total, average, positive] = props.values
  if (props.values[0].value === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text={good.name} value={good.value}></Statistic>
        <Statistic text={neutral.name} value={neutral.value}></Statistic>
        <Statistic text={bad.name} value={bad.value}></Statistic>
        <Statistic text={total.name} value={total.value}></Statistic>
        <Statistic text={average.name} value={average.value}></Statistic>
        <Statistic text={positive.name} value={positive.value + '%'}></Statistic>
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App2 = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const voteforGood = () => {
    let vgood = good + 1;
    setGood(vgood)
    setTotal(vgood + neutral + bad)
    setAverage((vgood - bad) / (vgood + neutral + bad))
    setPositive(vgood * 100 / (vgood + neutral + bad))
  }

  const voteforNeutral = () => {
    let vneutral = neutral + 1;
    setNeutral(vneutral)
    setTotal(good + vneutral + bad)
    setAverage((good - bad) / (good + vneutral + bad))
    setPositive(good * 100 / (good + vneutral + bad))
  }

  const voteforBad = () => {
    let vbad = bad + 1;
    setBad(vbad)
    setTotal(good + neutral + vbad)
    setAverage((good - vbad) / (good + neutral + vbad))
    setPositive(good * 100 / (good + neutral + vbad))
  }

  let valuesStatistics = [
    { name: 'good', value: good },
    { name: 'neutral', value: neutral },
    { name: 'bad', value: bad },
    { name: 'all', value: total },
    { name: 'average', value: average },
    { name: 'positive', value: positive },
  ]

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={voteforGood} text='good' />
      <Button onClick={voteforNeutral} text='neutral' />
      <Button onClick={voteforBad} text='bad' />
      <h2>statistics</h2>
      <Statistics values={valuesStatistics}></Statistics>
    </div>
  )
}

const sortDescending = (array, property) => {
  array.sort((a, b) => {
    if (a[property] < b[property]) {
      return 1;
    }
    if (a[property] > b[property]) {
      return -1;
    }
    return 0;
  });
  return array;
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [moreVoted, setMoreVoted] = useState(0)
  const [votes, setVotes] = useState(0)

  const selectAnecdote = () => {
    const num = Math.round(Math.random() * ((props.anecdotes.length - 1) - 0) + 0)
    setSelected(num);
    setVotes(props.anecdotes[num]['vote']);
  }

  const voteForAnecdote = () => {
    const copy = [...props.anecdotes];
    copy[selected]['vote'] += 1;
    setVotes(copy[selected]['vote']);
    setMoreVoted(sortDescending(copy,'vote')[0]);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]['name']}</p>
      <p>has {votes} votes</p>
      <Button onClick={voteForAnecdote} text='vote' />
      <Button onClick={selectAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{moreVoted['name']}</p>
      <p>has {moreVoted['vote']} votes</p>
    </div>
  )
}

const anecdotes = [
  { name: 'If it hurts, do it more often', vote: 0 },
  { name: 'Adding manpower to a late software project makes it later!', vote: 0 },
  { name: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0 },
  { name: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0 },
  { name: 'Premature optimization is the root of all evil.', vote: 0 },
  { name: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0 },
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)



