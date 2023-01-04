import { gql } from '@apollo/client';

export const COMPANY_QUERY = gql`
  query company($id: ID!) {
    company(id: $id) {
      id
      name
      phases {
        id
        name
        tasks {
          id
          name
          completed
        }
      }
    }
  }
`;

export const PHASE_QUERY = gql`
  query phase($id: ID!) {
    phase(id: $id){
      id
      name
      tasks {
        id
        name
        completed
      }
    }
  }
`;

export const TASK_QUERY = gql`
  query task($id: ID!) {
    task(id: $id) {
      id
      name
      completed
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $completed: Boolean!) {
    updateTask(input:{id: $id, completed: $completed}) {
      id
      completed
    }
  }
`;