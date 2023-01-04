import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 320px;
  margin: 0 auto;
  padding: 16px;
`;

export const CompanyName = styled.h1`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const PhaseList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Button = styled.button`
  background-color: #ffc107;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #ffb300;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;