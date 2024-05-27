import { Button } from "#components/common";
import {
  controlInitialState,
  controlSelector,
  updateControlWork,
} from "#redux/modules/control";
import { workSelector } from "#redux/modules/work";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import WorkTaskSummary from "./WorkTaskSummary";
import { checkDateTimeIsInTargetDateDivision } from "#lib/momentTools";

const Wrapper = styled.div`
  width: 50%;
  height: 30rem;
  overflow-y: scroll;

  border-right: solid 0.1rem var(--gray3);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InsertBtn = styled(Button)`
  margin: 0.5rem;

  background: var(--gray1);
  color: var(--gray7);
  border: none;
`;

export default function WorkTaskList() {
  const dispatch = useDispatch();
  const work = useSelector(workSelector);
  const control = useSelector(controlSelector);

  return (
    <Wrapper>
      {work.data.tasks
        .filter((x) =>
          checkDateTimeIsInTargetDateDivision(x.at, control.work.targetDate)
        )
        .map((x) => (
          <WorkTaskSummary key={x.task_id} data={x} />
        ))}
      <InsertBtn
        onClick={() => {
          if (!control.taskInsertOpen) {
            dispatch(
              updateControlWork({
                taskInsertOpen: true,
                taskDetail: {
                  ...controlInitialState.work.taskDetail,
                  at: moment(control.work.targetDate).format(
                    "YYYY-MM-DDT04:00"
                  ),
                },
                targetTaskId: null,
              })
            );
          }
        }}
      >
        새로운 테스크 추가
      </InsertBtn>
    </Wrapper>
  );
}
