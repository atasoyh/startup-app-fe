import React, { useState, useEffect } from "react";
import useAllPhasesCompletionsStatus from "../hooks/useAllPhasesCompletionStatus";
import { useGeneralContext } from "../providers/general";

const RandomFact = () => {
  const [fact, setFact] = useState(null);
  const { values: { companyId } } = useGeneralContext();
  const [ allPhasesCompleted ] = useAllPhasesCompletionsStatus({ id: companyId });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://uselessfacts.jsph.pl/random.json");
      const data = await response.json();
      setFact(data.text);
    };
    if (allPhasesCompleted)
      fetchData();
  }, [allPhasesCompleted]);

  return <>
    {!!allPhasesCompleted && <div>{fact || "Loading..."}</div>}
    {!allPhasesCompleted && <div>Please complete all your tasks!</div>}
  </>
};

export default RandomFact;