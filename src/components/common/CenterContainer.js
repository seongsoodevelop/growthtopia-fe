import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div``;

export default function CenterContainer({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
