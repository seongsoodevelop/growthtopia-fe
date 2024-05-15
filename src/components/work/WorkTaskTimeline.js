import styled from "styled-components";

const Wrapper = styled.div`
  width: 33.33333%;
  border-right: solid 0.1rem var(--gray3);

  height: 30rem;
  overflow-y: scroll;

  @media only screen and (max-width: 1200px) {
    border: solid 0.1rem var(--gray3);
    border-bottom: none;
    width: 100%;
  }
`;

export default function WorkTaskTimeline() {
  return <Wrapper></Wrapper>;
}
