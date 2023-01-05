import { useQuery } from "@apollo/client";
import { CompanyName, PhaseList } from "./company-progress.styles";
import Phase from "../phase";
import { COMPANY_QUERY } from "../../graphql/gql";
import useAllPhasesCompletionsStatus from "../../hooks/useAllPhasesCompletionStatus";
import { Button } from "../shared.styles";
import { Fragment } from "react";
import Link from "next/link";

const Company = ({ id }) => {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  const [allPhasesCompleted] = useAllPhasesCompletionsStatus({ id });

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  const { company } = data;

  return (
    <Fragment>
      <CompanyName>My Startup progress</CompanyName>
      <PhaseList>
        {company.phases?.map((phase, index) => (
          <Phase
            id={phase.id}
            companyId={id}
            key={phase.id}
            index={index + 1}
          />
        ))}
      </PhaseList>
      <Link href={"/fact"}>
        <Button
          onClick={() => {}}
          disabled={!allPhasesCompleted}
        >{`See what's next :)`}</Button>
      </Link>
    </Fragment>
  );
};

export default Company;
