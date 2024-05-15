import { formatDuration, getDateByDivision } from "#lib/momentTools";
import { controlSelector, updateControlWork } from "#redux/modules/control";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { workPushUpdateQueue } from "#redux/modules/work";

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-bottom: solid 0.1rem var(--gray3);

  cursor: pointer;
  user-select: none;

  ${({ $focus }) => {
    if ($focus)
      return `
    background:var(--gray1);`;
  }}}
`;

const Header = styled.div`
  width: 100%;
`;

const Status = styled.span``;

export default function WorkTaskSummary({ data }) {
  const control = useSelector(controlSelector);
  const dispatch = useDispatch();

  return (
    <Wrapper $focus={data.task_id === control.work.targetTaskId}>
      <Header
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
              targetDate: getDateByDivision(data.at),
              calendarTargetDate: getDateByDivision(data.at),
              targetTaskId: data.task_id,
              taskInsertOpen: false,
              taskDetail: {
                ...data,
              },
            })
          );
        }}
      >
        <Status
          onClick={() => {
            const _data = { ...data };
            _data["status"] = data.status === 0 ? 1 : 0;

            dispatch(
              updateControlWork({
                taskDetail: _data,
              })
            );
            dispatch(workPushUpdateQueue({ type: "task", data: _data }));
          }}
        >
          {data.status === 0 ? "○" : "●"}
        </Status>{" "}
        <span
          style={
            data.status === 0
              ? {}
              : { color: "var(--gray5)", textDecoration: "line-through" }
          }
        >
          {data.name}
        </span>
        <br />({formatDuration(data.duration)} /{" "}
        {formatDuration(data.duration_estimated)})
      </Header>
    </Wrapper>
  );
}
