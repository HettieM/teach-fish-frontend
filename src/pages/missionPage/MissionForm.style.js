import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  /* height: 70vh; */
  justify-content: center;
  @media (min-width: 768px) {
    // height: 50vh;
  }
  border: 2px solid black;
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export { FormContainer, FormInputWrapper };
