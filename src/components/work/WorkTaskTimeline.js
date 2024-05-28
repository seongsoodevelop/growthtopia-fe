import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
  border-right: solid 0.1rem var(--gray3);

  height: 30rem;
  overflow-y: scroll;
`;

export default function WorkTaskTimeline() {
  return <Wrapper></Wrapper>;
}
