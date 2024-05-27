import { shadowCSS } from "#lib/styleTools";
import styled from "styled-components";

import {
  MdAssignment,
  MdCheck,
  MdClose,
  MdFlag,
  MdHome,
  MdOutlineBarChart,
  MdRocketLaunch,
  MdAccountBalance,
  MdWork,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RemoveScroll } from "react-remove-scroll";

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

  top: 0;
  left: -100%;

  width: min(100vw, 20rem);
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  background: var(--primary);

  transition: left 0.5s ease;

  user-select: none;

  &.open {
    left: 0;
    ${shadowCSS}
  }

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  width: 100%;
  min-height: 4rem;

  padding-left: 1rem;

  text-align: left;

  color: white;

  display: flex;
  align-items: center;

  background: var(--primaryD1);

  border-bottom: solid 0.1rem var(--primaryL1);
  margin-bottom: 0.5rem;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 1.25rem;

  display: flex;
  align-items: center;
`;

const Message = styled.div`
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
  border-top: solid 0.1rem var(--primaryL1);
`;

const MenuSpacer = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  // border-bottom: solid 0.1rem var(--primaryL1);
`;

const MenuHeader = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  color: var(--gray5);
`;

const MenuItem = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  padding-left: 2rem;

  font-size: 1rem;
  font-weight: 600;
  color: var(--gray3);

  cursor: pointer;

  display: flex;
  align-items: center;

  &:hover {
    background: var(--primaryL1);
  }

  // border-radius: 0.4rem;
  transition: background 0.2s ease;
`;

export default function SideBar({ isOpen, closeCallback }) {
  const navigate = useNavigate();

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
      <RemoveScroll enabled={isOpen}>
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
              <div style={{ fontSize: "1rem", marginLeft: "0.25rem" }}>
                닫기
              </div>
            </CloseBtn>
          </Top>

          <MenuHeader>일반</MenuHeader>
          <MenuItem
            onClick={() => {
              navigate("/");
            }}
          >
            <MdHome style={{ marginRight: "0.5rem" }} />홈
          </MenuItem>
          <MenuSpacer />
          <MenuHeader>워크스페이스</MenuHeader>
          <MenuItem>
            <MdFlag style={{ marginRight: "0.5rem" }} /> 비전과 목표
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/workspace/plan");
            }}
          >
            <MdAssignment style={{ marginRight: "0.5rem" }} />
            계획과 스케줄
          </MenuItem>
          <MenuItem>
            <MdCheck style={{ marginRight: "0.5rem" }} />
            인박스와 실행
          </MenuItem>
          <MenuItem>
            <MdOutlineBarChart style={{ marginRight: "0.5rem" }} />
            분석과 통계
          </MenuItem>
          <MenuItem>
            <MdWork style={{ marginRight: "0.5rem" }} />
            워크스페이스
          </MenuItem>
          <MenuSpacer />
          <MenuHeader>그로스토피아</MenuHeader>
          <MenuItem
            onClick={() => {
              navigate("/meta/play");
            }}
          >
            <MdRocketLaunch style={{ marginRight: "0.5rem" }} />
            메타버스
          </MenuItem>
          <MenuItem>
            <MdAccountBalance style={{ marginRight: "0.5rem" }} />
            은행
          </MenuItem>
          <div style={{ flexGrow: 1, minHeight: "5rem" }} />
          <Message>
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
          </Message>
        </Container>
      </RemoveScroll>
    </>
  );
}
