import { useQuery } from "@apollo/client";
import { Button, CompanyName, Container, PhaseList } from "./company.styles";
import Phase from "../phase";
import { COMPANY_QUERY } from "../../graphql/gql";
import useAllPhasesCompletionsStatus from "../../hooks/useAllPhasesCompletionStatus";

const Company = ({ id }) => {
  const { data, loading, error, client } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  const { allPhasesCompleted } = useAllPhasesCompletionsStatus({ id });

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  const { company } = data;

  return (
    <Container>
      <CompanyName>My Startup progress</CompanyName>
      <PhaseList>
        {company.phases?.map((phase, index) => (
          <Phase id={phase.id} companyId={id} key={phase.id} index={index} />
        ))}
      </PhaseList>
      <Button onClick={()=>client.restore()} disabled={!allPhasesCompleted}>{`See what's next :)`}</Button>
    </Container>
  );
};

export default Company;
