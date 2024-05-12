import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 4rem;

  @media only screen and (max-width: 1200px) {
    padding: 0;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 30rem;
  padding: 4rem 2rem;
  border: solid 0.1rem var(--borderGray);
  border-radius: 0.4rem;

  @media only screen and (max-width: 1200px) {
    max-width: 1200px;
    border: none;
  }
`;

const ContentHeader = styled.div`
  margin-bottom: calc(0.5rem + 0.1875rem);

  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.5;

  border-bottom: solid 0.2rem var(--primary);
  color: var(--primary);

  user-select: none;
`;

export default function AuthContainer({ children }) {
  return (
    <Container>
      <Content>
        <ContentHeader>GrowthTopia</ContentHeader>
        {children}
      </Content>
    </Container>
  );
}
