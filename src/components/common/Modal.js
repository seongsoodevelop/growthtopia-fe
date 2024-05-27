import styled from "styled-components";
import { shadowCSS } from "#lib/styleTools";
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

const ModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: -100%;
  z-index: 100;

  width: 100%;
  max-width: 22rem;

  max-height: calc(100vh - 2rem);
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background: white;
  transition: 0.4s ease;

  transform: translate(-50%, 50%);

  padding: 1rem;
  padding-right: calc(1rem - 10px);
  border-radius: 0.4rem;

  &.open {
    bottom: 50%;
    ${shadowCSS}
  }
`;

export default function Modal({
  children,
  isOpen,
  closeCallback,
  style,
  styleBackground,
}) {
  return (
    <>
      <ModalBackground
        className={isOpen ? "open" : ""}
        onClick={() => {
          if (isOpen) {
            if (closeCallback) closeCallback();
          }
        }}
        style={styleBackground || {}}
      />
      <RemoveScroll enabled={isOpen}>
        <ModalWrapper className={isOpen ? "open" : ""} style={style || {}}>
          {children}
        </ModalWrapper>
      </RemoveScroll>
    </>
  );
}
