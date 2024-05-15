import { Button, Select } from "#components/common";
import { formatDuration } from "#lib/momentTools";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 0.25rem 0;
  display: flex;

  text-align: center;

  align-items: center;
`;

export default function WorkDurationEstimatedControl({ value, onChange }) {
  const beforeOnChange = (value) => {
    if (value < 0) return onChange(0);
    if (value > 43200) return onChange(43200);
    return onChange(value);
  };

  const [unit, setUnit] = useState(1);

  if (window.innerWidth < 1200) {
    return (
      <>
        <div>예상 소요시간</div>
        <div>{formatDuration(value)}</div>
        <Wrapper>
          <Button
            style={{ marginRight: "0.5rem" }}
            onClick={() => {
              beforeOnChange(value - unit * 60);
            }}
          >
            {"<"}
          </Button>
          <Button
            style={{ marginRight: "0.5rem" }}
            onClick={() => {
              beforeOnChange(value + unit * 60);
            }}
          >
            {">"}
          </Button>
        </Wrapper>
        <Select
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
          }}
        >
          <option value={1}>1분</option>
          <option value={15}>15분</option>
          <option value={30}>30분</option>
          <option value={60}>1시간</option>
        </Select>
        <Wrapper></Wrapper>
      </>
    );
  }

  return (
    <>
      <Wrapper>
        <div>예상 소요시간</div>
        <Button
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          onClick={() => {
            beforeOnChange(value - unit * 60);
          }}
        >
          {"<"}
        </Button>
        <Button
          style={{ marginRight: "0.5rem" }}
          onClick={() => {
            beforeOnChange(value + unit * 60);
          }}
        >
          {">"}
        </Button>
        {formatDuration(value)}
      </Wrapper>
      <Select
        value={unit}
        onChange={(e) => {
          setUnit(e.target.value);
        }}
      >
        <option value={1}>1분</option>
        <option value={15}>15분</option>
        <option value={30}>30분</option>
        <option value={60}>1시간</option>
      </Select>
      <Wrapper></Wrapper>
    </>
  );
}
