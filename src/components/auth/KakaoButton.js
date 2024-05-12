import { Button } from "#components/common";
import styled from "styled-components";

const ButtonContainer = styled(Button)`
  width: 100%;
  padding: 0.75rem 1rem;

  background: #fee500;
  color: #000000 85%;

  font-weight: 700;

  border: none;
`;

export default function KakaoButton({ children, ...rest }) {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
}
