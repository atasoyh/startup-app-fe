import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_PHASES_COMPLATIONS_QUERY } from "../graphql/gql";

const usePhaseEditableStatus = ({ companyId, id }) => {
  const { data } = useQuery(ALL_PHASES_COMPLATIONS_QUERY, { variables: { id: companyId } });
  const [isDisabled, setIsDisabled] = useState(true);
  const FIRST_ITEM_INDEX = 0;

  useEffect(() => {
    if (data) {
      const index = data.company.phases.findIndex(phase => phase.id === id);
      if (index === FIRST_ITEM_INDEX) {
        return setIsDisabled(false);
      }
      const prevPhaseIndex = index - 1;
      const prevPhase = data.company.phases.at(prevPhaseIndex);
      const isPrevPhaseCompleted = prevPhase.tasks.every((task) => task.completed);
      setIsDisabled(!isPrevPhaseCompleted);
    }
  }, [data, id]);

  return [ isDisabled ];
}

export default usePhaseEditableStatus;