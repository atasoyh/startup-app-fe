import { useMutation, useQuery } from "@apollo/client";
import { TASK_QUERY, UPDATE_TASK_MUTATION } from "../../graphql/gql";
import { TaskInput, TaskName, TaskContainer } from "./task.styles";

const Task = ({ id, phaseId }) => {
  const { data, loading, error } = useQuery(TASK_QUERY, { variables: { id } });
  const task = data?.task;
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    refetchQueries: ["PHASE_QUERY"],
    variables: { id: data?.task.id, completed: !data?.task.completed },
  });
  if (loading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error!</>;
  }
  return (
    <TaskContainer>
      <TaskInput
        type={"checkbox"}
        checked={task.completed}
        onChange={updateTask}
      />
      <TaskName>{task.name}</TaskName>
    </TaskContainer>
  );
};
export default Task;
