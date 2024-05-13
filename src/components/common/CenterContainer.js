import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

export default function CenterContainer({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}
