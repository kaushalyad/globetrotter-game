import React from "react";

const GuessForm = ({ guess, setGuess, handleGuess, options }) => {
  return (
    <form onSubmit={handleGuess} className="guess-form  w-[80vw] max-w-[500px]">
      <h2>What's your guess?</h2>
      <select value={guess} onChange={(e) => setGuess(e.target.value)} required className=" mt-4">
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit" className=" ml-3 py-1" >Submit</button>
    </form>
  );
};

export default GuessForm;