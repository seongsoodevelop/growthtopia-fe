import styled from "styled-components";
import WorkTaskList from "./WorkTaskList";
import WorkTaskProgress from "./WorkTaskProgress";
import WorkTaskTimeline from "./WorkTaskTimeline";

const Wrapper = styled.div`
  margin-bottom: 1rem;

  width: 100%;
  border: solid 0.1rem var(--gray3);

  display: flex;
`;

export default function WorkControl() {
  return (
    <>
      <WorkTaskProgress />
      <Wrapper>
        <WorkTaskTimeline />
        <WorkTaskList />
      </Wrapper>
    </>
  );
}
