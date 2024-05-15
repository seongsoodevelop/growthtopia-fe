import { Button, Typo } from "#components/common";
import { formatDuration, getDateByDivision } from "#lib/momentTools";
import { controlSelector, updateControlWork } from "#redux/modules/control";
import { userSelector } from "#redux/modules/user";
import useInterval from "hooks/useInterval";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;

  border: solid 0.1rem var(--gray3);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function WorkTaskProgress() {
  const user = useSelector(userSelector);
  const control = useSelector(controlSelector);
  const dispatch = useDispatch();

  const [duration, setDuration] = useState(NaN);

  useEffect(() => {
    updateDuration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.profile.work_task_id]);

  const updateDuration = () => {
    if (!user.profile.work_task_id) {
      return;
    }
    setDuration(
      Math.floor(
        moment
          .duration(moment().diff(moment(user.profile.work_task_start_at)))
          .asSeconds()
      )
    );
  };

  useInterval(() => {
    updateDuration();
  }, [1000]);

  if (
    !user.profile.work_task_id ||
    !user.profile.work_task ||
    isNaN(duration)
  ) {
    return null;
  }

  return (
    <Wrapper>
      <div>진행 중입니다</div>
      <Typo as="h2" style={{ margin: "1rem 0    " }}>
        {user.profile.work_task.name}
      </Typo>
      <div style={{ marginBottom: "1rem" }}>{formatDuration(duration)}</div>
      <Button
        onClick={() => {
          if (
            control.work.taskInsertOpen &&
            control.work.taskDetail.name !== "" &&
            control.work.taskDetail.duration_estimated !== "0"
          ) {
            if (
              !window.confirm(
                "정말로 이 테스크를 자세히 보시겠습니까? 신규 테스크 추가 기록은 삭제됩니다."
              )
            ) {
              return;
            }
          }
          dispatch(
            updateControlWork({
              targetDate: getDateByDivision(user.profile.work_task.at),
              calendarTargetDate: getDateByDivision(user.profile.work_task.at),
              targetTaskId: user.profile.work_task.task_id,
              taskInsertOpen: false,
              taskDetail: {
                ...user.profile.work_task,
              },
            })
          );
        }}
      >
        바로가기
      </Button>
    </Wrapper>
  );
}
