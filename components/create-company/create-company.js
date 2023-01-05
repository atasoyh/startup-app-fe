import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMPANY_MUTATION } from "../../graphql/gql";
import { Form, Input } from "./create-company.styles";
import { Button } from "../shared.styles";
import { useGeneralContext } from "../../providers/general";

const CreateCompany = () => {
  const { setters: { updateCompanyId } } = useGeneralContext();
  const [name, setName] = React.useState("");
  const [createCompany, { error, loading }] = useMutation(
    CREATE_COMPANY_MUTATION,
    {
      variables: { name },
      onCompleted: (data) => {
        const companyId = data.createCompany.id;
        updateCompanyId(companyId);
      }
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    createCompany();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Company's name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button type="submit" disabled={loading}>
        Create company
      </Button>
      {error && <p>Error creating company</p>}
    </Form>
  );
};

export default CreateCompany;