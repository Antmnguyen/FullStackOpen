import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const calcAverage = (props) =>
{
  return (props.good - props.bad) / props.total
}
const calcTotal = (value) => value;
const calcPositive = (props) => {
  if (props.total === 0) return "0%"; // avoid division by zero
  const percentage = (props.good / props.total) * 100;
  return percentage.toFixed(1) + "%"; // rounds to 1 decimal place
};
const StatisticsLine = (props) =>
{
  return (
    <tr>
      
      <td>{props.text}</td> 
      <td>{props.calc()}</td>
    </tr>
  )
}

const Statistics = (props) =>
{
  console.log('current total is', props.total)
  if(props.total === 0)
  {
    return (
      <div>
       No feedback given 
      </div>
    )
  }
  return (
  <table>
    <tbody>
    <StatisticsLine text = "good" calc = {() =>calcTotal(props.good)} />
    <StatisticsLine text = "neutral" calc = {() =>calcTotal(props.neutral)} />
    <StatisticsLine text = "bad" calc = {() =>calcTotal(props.bad)} />
    <StatisticsLine text = "all" calc = {() =>calcTotal(props.total)} />    
    <StatisticsLine text = "average" calc = {() =>calcAverage(props)} />
    <StatisticsLine text = "positive" calc = {() =>calcPositive(props)} />
    </tbody>
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const setnewGood = props =>
  {
    const new_good = good + 1
    setGood(new_good)
    console.log(new_good)
    setTotal(new_good + bad + neutral)

  }
  const setnewNeutral = props =>
  {
    const new_neutral = neutral + 1
    setNeutral(new_neutral)
    setTotal(good + bad + new_neutral)

  }
  const setnewBad = props =>
  {
    const new_bad = bad + 1
    setBad(new_bad)
    setTotal(good + new_bad + neutral)

  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setnewGood() } text="good" />
      <Button onClick={() => setnewNeutral() } text="neutral" />
      <Button onClick={() => setnewBad() } text="bad" />
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total}/>
    </div>
  )
}

export default App