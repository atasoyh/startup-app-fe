import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_PHASES_COMPLATIONS_QUERY } from "../graphql/gql";

const useAllPhasesCompletionsStatus = ({ id }) => {
  const { data } = useQuery(ALL_PHASES_COMPLATIONS_QUERY, { variables: { id } });
  const [allPhasesCompleted, setAllPhasesCompleted] = useState(false);

  useEffect(() => {
    if (data) {
      const completedPhases = data.company.phases.filter(
        (phase) => phase.tasks.every((task) => task.completed)
      );
      setAllPhasesCompleted(completedPhases.length === data.company.phases.length);
    }
  }, [data, data?.company, data?.company?.phases]);

  return { allPhasesCompleted };
}

export default useAllPhasesCompletionsStatus;