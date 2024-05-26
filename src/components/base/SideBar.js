import { shadowCSS } from "#lib/styleTools";
import { useState } from "react";
import styled from "styled-components";

import {
  MdAssignment,
  MdCheck,
  MdCheckBox,
  MdClose,
  MdOutlineBarChart,
} from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background: rgba(255, 255, 255, 0.75);
  opacity: 0;

  transition: opacity 0.4s ease;
  pointer-events: none;

  z-index: 20;

  padding: 0;

  &.open {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Container = styled.div`
  position: fixed;
  z-index: 100;

  left: -100%;

  width: min(100vw, 22rem);
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  background: var(--primary);

  transition: left 0.5s ease;

  user-select: none;

  border-right: solid 0.1rem var(--primaryL1);

  &.open {
    left: 0;
    ${shadowCSS}
  }
`;

const Top = styled.div`
  width: 100%;
  height: 4rem;

  text-align: left;

  color: white;

  display: flex;
  align-items: center;

  padding-left: 1rem;

  border-bottom: solid 0.1rem var(--primaryL1);
`;

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 1.25rem;

  display: flex;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  padding: 2rem;

  font-size: 1.25rem;
  font-weight: 300;

  color: var(--gray5);

  letter-spacing: 0.1px;

  strong {
    font-weight: 600;
    color: white;
  }

  line-height: 1.6;

  background: var(--primaryD1);
`;

const MenuHeader = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  padding-top: 2rem;

  border-top: solid 0.1rem var(--primaryL1);

  color: var(--gray5);
`;

const MenuItem = styled.div`
  width: calc(100% - 2rem);
  padding: 0.5rem 1rem;

  font-weight: 600;
  color: var(--gray3);

  cursor: pointer;

  display: flex;
  align-items: center;
`;

export default function SideBar({ isOpen, closeCallback }) {
  return (
    <>
      <ModalBackground
        className={isOpen ? "open" : ""}
        onClick={() => {
          if (isOpen) {
            if (closeCallback) closeCallback();
          }
        }}
      />
      <Container className={isOpen ? "open" : ""}>
        <Top>
          <CloseBtn
            onClick={() => {
              if (closeCallback) {
                closeCallback();
              }
            }}
          >
            <MdClose />
            <div style={{ fontSize: "1rem", marginLeft: "0.25rem" }}>닫기</div>
          </CloseBtn>
        </Top>
        <Header>
          <strong>체계적으로 계획</strong>하고
          <br />
          <strong>집중해서 실천</strong>하고
          <br />
          <strong>논리적으로 뿌듯</strong>해서
          <br />
          <strong>행복해지세요</strong> 💖
          <div
            style={{
              marginTop: "1rem",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--primaryL2)",
            }}
          >
            GrowthTopia 드림
          </div>
        </Header>
        <MenuHeader>워크스페이스</MenuHeader>
        <MenuItem>
          <MdAssignment style={{ marginRight: "0.5rem" }} />
          계획하기
        </MenuItem>
        <MenuItem>
          <MdCheck style={{ marginRight: "0.5rem" }} /> 실천하기
        </MenuItem>
        <MenuItem>
          <MdOutlineBarChart style={{ marginRight: "0.5rem" }} /> 분석하기
        </MenuItem>
      </Container>
    </>
  );
}
