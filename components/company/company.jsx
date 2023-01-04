import { useQuery } from "@apollo/client";
import { CompanyName, Container, PhaseList } from "./company.styles";
import Phase from "../phase";
import { COMPANY_QUERY } from "../../graphql/gql";

const Company = () => {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id: "company_1" },
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    console.log(error);
    return <>Error...</>;
  }

  const { company } = data;
  return (
    <Container>
      <CompanyName>{company.name}</CompanyName>
      <PhaseList>
        {company.phases?.map((phase) => (
          <Phase id={phase.id} key={phase.id} />
        ))}
      </PhaseList>
    </Container>
  );
};

export default Company;
