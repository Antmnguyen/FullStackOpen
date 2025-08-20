import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const PrintMax = (props) =>
{
    return (
      <div>
        {props.max_anecdote} has {props.max_votes} votes
      </div>
    )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const setnewPhrase = (index) =>
  {
    const randInt = Math.floor(Math.random() * (index));
    //const new_phrase = anecdotes[randInt]//random number via random# generator 
    setSelected(randInt)
  }
  const vote = (index,size) =>
  {
    //const newArray = new Array(size).fill(0);
    const newArray = [...votes];
    newArray[index] += 1;
    console.log(newArray[index])
    console.log("Votes array:", newArray);
    setVotes(newArray)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>votes: {votes[selected]}</p>
      <Button onClick={() => vote(selected,anecdotes.length) } text = "vote" />
      <Button onClick={() => setnewPhrase(anecdotes.length) } text = "next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <PrintMax 
      max_votes = {Math.max(...votes)}
      max_index = {votes.indexOf(Math.max(...votes))}
      max_anecdote = {anecdotes[votes.indexOf(Math.max(...votes))]}
      />
    </div>
  )
}

export default App