import { formatDuration, getDateByDivision } from "#lib/momentTools";
import { controlSelector, updateControlWork } from "#redux/modules/control";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { workPushUpdateQueue, workTaskRemove } from "#redux/modules/work";
import { Button, Input } from "#components/common";
import { userSelector, userWorkEnd, userWorkStart } from "#redux/modules/user";
import moment from "moment";
import WorkDurationEstimatedControl from "./WorkDurationEstimatedControl";

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

export default function WorkTaskSummary({ data, canExpand = false }) {
  const dispatch = useDispatch();
  const control = useSelector(controlSelector);
  const user = useSelector(userSelector);

  if (canExpand && control.work.targetTaskId === data.task_id) {
    return (
      <Wrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          onChange={(e) => {
            const data = { ...control.work.taskDetail };
            data[e.target.id] = e.target.value;

            dispatch(
              updateControlWork({
                taskDetail: data,
              })
            );
            dispatch(workPushUpdateQueue({ type: "task", data }));
          }}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              borderBottom: "solid 0.1rem var(--gray3)",
              marginBottom: "0.5rem",
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
            </Status>
            <Input
              id="name"
              placeholder="이름"
              value={control.work.taskDetail.name}
              onChange={() => {}}
              style={{
                border: "none",
                marginBottom: 0,
              }}
            />
          </div>
          <Input
            id="at"
            type="datetime-local"
            value={moment(control.work.taskDetail.at).format(
              "YYYY-MM-DDTHH:mm"
            )}
            onChange={() => {}}
          />
          <div>
            실제 소요시간 {formatDuration(control.work.taskDetail.duration)}
          </div>
          <WorkDurationEstimatedControl
            value={control.work.taskDetail.duration_estimated}
            onChange={(value) => {
              const data = { ...control.work.taskDetail };
              data["duration_estimated"] = value;

              dispatch(
                updateControlWork({
                  taskDetail: data,
                })
              );
              dispatch(workPushUpdateQueue({ type: "task", data }));
            }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <Button
            style={{ marginRight: "0.5rem" }}
            theme="red"
            onClick={() => {
              if (window.confirm("정말로 삭제하시겠습니까??")) {
                dispatch(
                  workTaskRemove({
                    task_id: control.work.targetTaskId,
                  })
                );
              }
            }}
          >
            삭제
          </Button>
          {user.profile.work_task_id ? (
            user.profile.work_task_id === control.work.targetTaskId ? (
              <Button
                theme="gray"
                onClick={() => {
                  dispatch(userWorkEnd({}));
                }}
              >
                중단
              </Button>
            ) : null
          ) : (
            <Button
              theme="primary"
              onClick={() => {
                dispatch(
                  userWorkStart({ work_task_id: control.work.targetTaskId })
                );
              }}
            >
              시작
            </Button>
          )}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      $focus={data.task_id === control.work.targetTaskId}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
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
