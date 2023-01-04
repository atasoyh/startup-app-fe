import { useQuery } from "@apollo/client";
import { PHASE_QUERY } from "../../graphql/gql";
import {
  CheckMark,
  PhaseContainer,
  PhaseIndex,
  PhaseName,
  PhaseNameContainer,
  TaskList,
} from "./phase.styles";
import Task from "../task";
import usePhaseEditableStatus from "../../hooks/usePreviousPhasesCompletionStatus";

const Phase = ({ companyId, id, index }) => {
  const { data, loading, error } = useQuery(PHASE_QUERY, {
    variables: { id },
  });
  const { isDisabled } = usePhaseEditableStatus({ companyId, id });
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error!</>;
  }
  const { phase } = data;
  return (
    <PhaseContainer>
      <PhaseNameContainer>
        <PhaseIndex>{index}</PhaseIndex>
        <PhaseName>{phase.name}</PhaseName>
        {phase.tasks.every((task) => task.completed) && (
          <CheckMark>✓</CheckMark>
        )}
      </PhaseNameContainer>
      <TaskList>
        {phase.tasks.map((task) => (
          <Task key={task.id} id={task.id} isDisabled={isDisabled} />
        ))}
      </TaskList>
    </PhaseContainer>
  );
};

export default Phase;
