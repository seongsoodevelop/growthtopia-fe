import styled from "styled-components";

const ContainerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 1200px) {
    padding: 0;
  }
`;

const ContainerContent = styled.div`
  width: 100%;
  max-width: 1200px;

  padding: 0 1rem;
`;

export default function Container({ children }) {
  return (
    <ContainerContainer>
      <ContainerContent>{children}</ContainerContent>
    </ContainerContainer>
  );
}
