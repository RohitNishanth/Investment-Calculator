import { useState } from "react";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from './components/Results.jsx'

function App() {
  const [inputValue, setInputValue] = useState({
    initialInvestment: 10000,
    annualInvestment: 5000,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = inputValue.duration >= 1
  function handleInput(inputIdentifier, newValue) {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: +newValue,
      };
    });
  }
  return (
    <>
      <Header />
      <UserInput inputValue={inputValue} onChange={handleInput} />
      {!inputIsValid && <p className="center" >Please enter duration greater than 1</p>}
      { inputIsValid &&  <Results input={inputValue} />}
    </>
  );
}

export default App;
