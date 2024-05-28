import { Button, Input } from "#components/common";
import {
  controlInitialState,
  controlSelector,
  updateControlWork,
} from "#redux/modules/control";
import { workSelector } from "#redux/modules/work";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { workTaskInsert } from "#redux/modules/work";
import styled from "styled-components";
import WorkTaskSummary from "./WorkTaskSummary";
import { checkDateTimeIsInTargetDateDivision } from "#lib/momentTools";
import WorkDurationEstimatedControl from "./WorkDurationEstimatedControl";

const Wrapper = styled.div`
  width: 50%;
  height: 30rem;
  overflow-y: scroll;

  border-right: solid 0.1rem var(--gray3);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-bottom: solid 0.1rem var(--gray3);

  cursor: pointer;
  user-select: none;
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

  return (
    <Wrapper
      onClick={() => {
        if (!control.work.taskInsertOpen && control.work.targetTaskId) {
          dispatch(
            updateControlWork({
              taskDetail: {
                ...controlInitialState.work.taskDetail,
                at: moment(control.work.targetDate).format("YYYY-MM-DDT04:00"),
              },
              targetTaskId: null,
            })
          );
        }
      }}
    >
      {work.data.tasks
        .filter((x) =>
          checkDateTimeIsInTargetDateDivision(x.at, control.work.targetDate)
        )
        .map((x) => (
          <WorkTaskSummary key={x.task_id} data={x} canExpand={true} />
        ))}
      {control.work.taskInsertOpen ? (
        <Container
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
        </Container>
      ) : (
        <InsertBtn
          onClick={(e) => {
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

            e.stopPropagation();
          }}
        >
          새로운 테스크 추가
        </InsertBtn>
      )}
    </Wrapper>
  );
}
