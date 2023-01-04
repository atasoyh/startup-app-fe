import { useQuery } from "@apollo/client";
import { PHASE_QUERY } from "../../graphql/gql";
import { CheckMark, PhaseContainer, PhaseName, TaskList } from "./phase.styles";
import Task from "../task";

const Phase = ({id}) => {
  const { data, loading, error } = useQuery(PHASE_QUERY, {
    variables: { id },
  });
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error!</>;
  }
  const { phase } = data;
  return (
    <PhaseContainer>
      <PhaseName>{phase.name}</PhaseName>
      {phase.tasks.every((task) => task.completed) && <CheckMark>✓</CheckMark>}
      <TaskList>
        {phase.tasks.map((task) => (
          <Task key={task.id} id={task.id} />
        ))}
      </TaskList>
    </PhaseContainer>
  );
};

export default Phase;
