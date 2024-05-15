import styled from "styled-components";
import WorkTaskDetail from "./WorkTaskDetail";
import WorkTaskTimeline from "./WorkTaskTimeline";
import WorkTaskList from "./WorkTaskList";
import WorkTaskProgress from "./WorkTaskProgress";

const Wrapper = styled.div`
  margin-bottom: 1rem;

  width: 100%;
  border: solid 0.1rem var(--gray3);

  display: flex;
`;

export default function WorkControl() {
  if (window.innerWidth < 1200) {
    return (
      <>
        <WorkTaskProgress />
        <WorkTaskTimeline />
        <Wrapper>
          <WorkTaskList />
          <WorkTaskDetail />
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <WorkTaskProgress />
      <Wrapper>
        <WorkTaskTimeline />
        <WorkTaskList />
        <WorkTaskDetail />
      </Wrapper>
    </>
  );
}
