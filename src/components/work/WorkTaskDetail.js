import { Button, Input } from "#components/common";
import {
  controlInitialState,
  controlSelector,
  updateControlWork,
} from "#redux/modules/control";
import {
  workPushUpdateQueue,
  workTaskInsert,
  workTaskRemove,
} from "#redux/modules/work";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import WorkDurationEstimatedControl from "./WorkDurationEstimatedControl";
import { formatDuration } from "#lib/momentTools";
import { userSelector, userWorkEnd, userWorkStart } from "#redux/modules/user";

const Wrapper = styled.div`
  width: 50%;

  padding: 0.5rem;

  height: 30rem;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  box-sizing: border-box;
`;

export default function WorkTaskDetail() {
  const dispatch = useDispatch();
  const control = useSelector(controlSelector);
  const user = useSelector(userSelector);

  const validation = () => {
    const { name, duration_estimated } = control.work.taskDetail;
    if (!name) {
      alert("이름을 적어주세요 :)");
      return false;
    }
    if (
      isNaN(duration_estimated) ||
      Number(duration_estimated) < 0 ||
      Number(duration_estimated) > 43200
    ) {
      alert("0 이상 43200 이하의 예측소요시간을 적어주세요 :)");
      return false;
    }

    return true;
  };

  if (!control.work.taskInsertOpen && !control.work.targetTaskId) {
    return <></>;
  }

  return (
    <Wrapper>
      {control.work.taskInsertOpen ? (
        <>
          <div
            onChange={(e) => {
              const data = { ...control.work.taskDetail };
              data[e.target.id] = e.target.value;

              dispatch(
                updateControlWork({
                  taskDetail: data,
                })
              );
            }}
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <Input
              id="name"
              placeholder="이름"
              value={control.work.taskDetail.name}
              onChange={() => {}}
            />
            <Input
              id="at"
              type="datetime-local"
              value={control.work.taskDetail.at}
              onChange={() => {}}
            />
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
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              theme="gray"
              onClick={() => {
                if (
                  (control.work.taskDetail.name === "" &&
                    control.work.taskDetail.duration_estimated === "0") ||
                  window.confirm("정말로 취소하시겠습니까?")
                ) {
                  dispatch(
                    updateControlWork({
                      taskInsertOpen: false,
                      taskDetail: {
                        ...controlInitialState.work.taskDetail,
                      },
                    })
                  );
                }
              }}
            >
              취소
            </Button>
            <Button
              theme="primary"
              onClick={() => {
                if (validation()) {
                  dispatch(
                    workTaskInsert({
                      ...control.work.taskDetail,
                      at: moment(control.work.taskDetail.at).format(),
                    })
                  );
                }
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              추가하기
            </Button>
          </div>
        </>
      ) : (
        <>
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
            <Input
              id="name"
              placeholder="이름"
              value={control.work.taskDetail.name}
              onChange={() => {}}
            />
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
        </>
      )}
    </Wrapper>
  );
}
