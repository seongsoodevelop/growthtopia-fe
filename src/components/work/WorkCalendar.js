import { Button, Typo } from "#components/common";
import {
  checkDateTimeIsInTargetDateDivision,
  formatWeeksOfMonth,
} from "#lib/momentTools";
import { controlSelector, updateControlWork } from "#redux/modules/control";
import { workSelector, workTaskQuery } from "#redux/modules/work";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import WorkTaskSummary from "./WorkTaskSummary";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Wrapper = styled.div`
  margin-bottom: 1rem;

  width: 100%;
  border: solid 0.1rem var(--gray3);

  overflow-x:hidden;
  overflow-y: scroll;

  transition: height 0.4s ease-out;

  ${({ $isCalendarWeek }) => {
    return `
      height:${$isCalendarWeek ? 30.1 : 60}rem;`;
  }}}
`;

const Week = styled.div`
  width: 100%;

  display: flex;

  min-height:15rem;

  &+&{
    border-top: solid 0.1rem var(--gray3);
  }

   ${({ $isCalendarWeek }) => {
     if ($isCalendarWeek) {
       return `
      min-height:100%`;
     }
   }}}
`;

const Day = styled.div`
  width: 14.28571%;

  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    border-left: solid 0.1rem var(--gray3);
  }
`;

const DayHeader = styled.div`
  padding: 0.5rem 0;
  width: 100%;

  font-weight: 700;

  text-align: center;

  border-bottom: solid 0.1rem var(--gray3);

  user-select: none;
  cursor: pointer;
`;

export default function WorkCalendar() {
  const control = useSelector(controlSelector);
  const { isCalendarWeek, targetDate, calendarTargetDate } = control.work;

  const dispatch = useDispatch();

  const work = useSelector(workSelector);

  const generateDateArray = () => {
    const arr = [];

    if (isCalendarWeek) {
      const week = [];

      let T = moment(calendarTargetDate);
      T.subtract(T.days(), "days");

      for (let i = 0; i < 7; i++) {
        week.push(T.format("YYYY-MM-DD"));
        T.add(1, "days");
      }

      arr.push(week);
    } else {
      let T = moment(calendarTargetDate);
      T.subtract(T.date() - 1, "days");
      T.subtract(T.days(), "days");
      while (1) {
        const week = [];

        for (let i = 0; i < 7; i++) {
          week.push(T.format("YYYY-MM-DD"));
          T.add(1, "days");
        }

        arr.push(week);
        if (T.month() !== moment(calendarTargetDate).month()) {
          break;
        }
      }
    }

    return arr;
  };

  const dateArray = generateDateArray();

  useEffect(() => {
    dispatch(
      workTaskQuery({
        start_at: moment(dateArray[0][0]).format("YYYY-MM-DD 00:00"),
        end_at: moment(dateArray[dateArray.length - 1][6]).format(
          "YYYY-MM-DD 23:59"
        ),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarTargetDate, isCalendarWeek]);

  return (
    <>
      <Typo as="h2" style={{ display: "flex" }}>
        {isCalendarWeek
          ? formatWeeksOfMonth(targetDate)
          : moment(calendarTargetDate).format("MM월")}
        <div style={{ flexGrow: 1 }} />
        <Button
          style={{ fontSize: "1rem", marginRight: "0.25rem" }}
          onClick={() => {
            dispatch(
              updateControlWork({
                targetDate: moment().format("YYYY-MM-DD"),
                calendarTargetDate: moment().format("YYYY-MM-DD"),
              })
            );
          }}
        >
          오늘
        </Button>
        <Button
          style={{
            fontSize: "1.5rem",
            marginRight: "0.25rem",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            const t = moment(calendarTargetDate);
            t.subtract(1, isCalendarWeek ? "week" : "month");
            dispatch(
              updateControlWork({
                targetDate: t.format("YYYY-MM-DD"),
                calendarTargetDate: t.format("YYYY-MM-DD"),
              })
            );
          }}
        >
          <MdChevronLeft />
        </Button>
        <Button
          style={{
            fontSize: "1.5rem",
            marginRight: "0.25rem",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            const t = moment(calendarTargetDate);
            t.add(1, isCalendarWeek ? "week" : "month");
            dispatch(
              updateControlWork({
                targetDate: t.format("YYYY-MM-DD"),
                calendarTargetDate: t.format("YYYY-MM-DD"),
              })
            );
          }}
        >
          <MdChevronRight />
        </Button>
        <Button
          style={{ fontSize: "1rem" }}
          onClick={() => {
            dispatch(
              updateControlWork({
                isCalendarWeek: !isCalendarWeek,
                calendarTargetDate: targetDate,
              })
            );
          }}
        >
          {isCalendarWeek ? "월간" : "주간"}
        </Button>
      </Typo>

      <Wrapper $isCalendarWeek={isCalendarWeek}>
        {dateArray.map((week) => {
          return (
            <Week key={week[0]} $isCalendarWeek={isCalendarWeek}>
              {week.map((day) => {
                return (
                  <Day key={day}>
                    <DayHeader
                      onClick={() => {
                        dispatch(updateControlWork({ targetDate: day }));
                        if (control.work.taskInsertOpen) {
                          dispatch(
                            updateControlWork({
                              taskDetail: {
                                ...control.work.taskDetail,
                                at: `${day}T${moment(
                                  control.work.taskDetail.at
                                ).format("HH:mm")}`,
                              },
                            })
                          );
                        }
                      }}
                      style={{
                        background:
                          targetDate === day
                            ? "var(--primary)"
                            : day === moment().format("YYYY-MM-DD")
                            ? `var(--gray2)`
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          color:
                            targetDate === day
                              ? "white"
                              : isCalendarWeek ||
                                moment(day).month() ===
                                  moment(calendarTargetDate).month()
                              ? "black"
                              : "var(--gray4)",
                        }}
                      >
                        {moment(day).format("DD")}
                      </span>
                    </DayHeader>
                    {work.data.tasks
                      .filter((x) =>
                        checkDateTimeIsInTargetDateDivision(x.at, day)
                      )
                      .map((x) => (
                        <WorkTaskSummary key={x.task_id} data={x} />
                      ))}
                  </Day>
                );
              })}
            </Week>
          );
        })}
      </Wrapper>
    </>
  );
}
