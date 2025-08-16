const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name = 'HU TAO'/>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}

export default App