import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;

  margin-top: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--gray2);
  color: var(--gray5);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;

  user-select: none;
`;

export default function Header() {
  return (
    <>
      <FooterContainer>
        <FooterContent>
          <div>
            <strong style={{ fontWeight: 800 }}>
              인콰이어리스트(INQUIRIST)
            </strong>
          </div>
        </FooterContent>
      </FooterContainer>
    </>
  );
}
