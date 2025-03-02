import React from "react";

const ClueDisplay = ({ clues }) => {
  return (
    <div className="clue-display  w-[80vw] max-w-[500px]">
      <h1 className=" text-orange-500 text-3xl font-semibold" >Clues</h1>
      <ul className=" list-disc text-black">
        {clues.map((clue, index) => (
          <li key={index}>{clue}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClueDisplay;