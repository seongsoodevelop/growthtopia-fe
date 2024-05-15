import { Footer, Header } from "#components/base";
import { Container } from "#components/common";
import { WorkCalendar, WorkControl } from "#components/work";
import {
  workResetUpdateQueue,
  workSelector,
  workTaskUpdate,
} from "#redux/modules/work";
import useInterval from "hooks/useInterval";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
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
        <WorkCalendar />
        <WorkControl />
      </Container>
      <Footer />
    </>
  );
}
