import { useMutation, useQuery } from "@apollo/client";
import {
  PHASE_QUERY,
  TASK_QUERY,
  UPDATE_TASK_MUTATION,
} from "../../graphql/gql";
import { useGeneralContext } from "../../providers/general";
import { TaskInput, TaskName, TaskContainer } from "./task.styles";

const Task = ({ id, isDisabled }) => {
  const {
    setters: { resetCompanyId },
  } = useGeneralContext();
  const { data, loading, error } = useQuery(TASK_QUERY, { variables: { id } });
  const task = data?.task;
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    variables: { id: task?.id, completed: !task?.completed },
    onError: () => {
      resetCompanyId();
    },
  });
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error!</>;
  }
  return (
    <TaskContainer
      onClick={() => {
        if (!isDisabled) {
          updateTask();
        }
      }}
    >
      <TaskInput
        type={"checkbox"}
        checked={task.completed}
        readOnly={true}
        disabled={isDisabled}
      />
      <TaskName>{task.name}</TaskName>
    </TaskContainer>
  );
};
export default Task;
