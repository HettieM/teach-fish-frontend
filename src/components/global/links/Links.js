import styled from "styled-components";
import { accentColour, linkColour } from "../colours";

const Links = styled.p`
  font-family: "Josefin Sans", sans-serif;
  transition: all 0.2s ease-in-out;
  color: ${linkColour};
  text-decoration: underline;
  &:hover {
    font-size: 1.2rem;
    color: ${accentColour};
  }
`;

export default Links;
