// RandomAssignmentButton.jsx
import React from "react";

function generateRandomAssignment(farmers, buyers) {
  const assignment = [];

  const buyerIndices = [...Array(buyers.length).keys()];
  const farmerIndices = [...Array(farmers.length).keys()];

  // Shuffle buyer indices
  const shuffledBuyers = buyerIndices.sort(() => 0.5 - Math.random());

  // Assign each farmer to a buyer (1-to-1 or more farmers than buyers)
  for (let i = 0; i < farmers.length; i++) {
    const farmerIndex = i;
    const buyerIndex = shuffledBuyers[i % buyers.length]; // Loop buyers if fewer
    assignment.push([farmerIndex, buyerIndex]);
  }

  return {
    bestAssignment: assignment,
  };
}

const RandomAssignmentButton = ({ farmers, buyers, setBestAssignment }) => {
  const handleGenerate = () => {
    const randomAssignment = generateRandomAssignment(farmers, buyers);
    setBestAssignment(prev => ({
  ...prev,
  bestAssignment: [...randomAssignment.bestAssignment],
}));

    console.log("Random Assignment:", randomAssignment);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm italic text-neutral-500">Wanna try to see a random assignment? Click <button onClick={handleGenerate} className="underline-offset-0 underline">here!</button></p>

    </div>
  );
};

export default RandomAssignmentButton;
