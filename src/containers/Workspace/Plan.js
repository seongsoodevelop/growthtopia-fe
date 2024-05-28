import { Footer, Header } from "#components/base";
import { Container, Typo } from "#components/common";
import { WorkCalendar, WorkControl } from "#components/work";
import {
  workResetUpdateQueue,
  workSelector,
  workTaskUpdate,
} from "#redux/modules/work";
import useInterval from "hooks/useInterval";
import { useDispatch, useSelector } from "react-redux";

export default function Plan() {
  const work = useSelector(workSelector);
  const dispatch = useDispatch();

  useInterval(() => {
    let flag = false;
    const updateQueue = work.updateQueue;
    if (updateQueue.tasks.length > 0) {
      dispatch(
        workTaskUpdate({
          data: updateQueue.tasks,
        })
      );
      flag = true;
    }

    if (flag) {
      dispatch(workResetUpdateQueue({}));
    }
  }, 250);

  return (
    <>
      <Header />
      <Container>
        <Typo as="h2">계획과 스케줄</Typo>
        <WorkCalendar />
        <WorkControl />
      </Container>
      <Footer />
    </>
  );
}
