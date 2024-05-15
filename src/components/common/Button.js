const { default: styled } = require("styled-components");

const ButtonContainer = styled.button`
  padding: 0.2rem 0.6rem;

  border: solid 0.1rem var(--borderGray);
  border-radius: 0.4rem;

  background: white;
  ${({ theme }) => {
    switch (theme) {
      case "none": {
        return `
          background: none;
          color: white;
          border: none;
        `;
      }
      case "gray": {
        return `
          background: var(--gray1);
          color: var(--gray7);
          border: none;
        `;
      }
      case "primary": {
        return `
          background: var(--primary);
          color: white;
          border: none;
        `;
      }
      case "red": {
        return `
          background: var(--systemRed);
          color: white;
          border: none;
        `;
      }
      default:
        break;
    }
  }}
  ${({ weight }) => {
    if (weight) {
      return `font-weight:${weight};`;
    }
  }}

  cursor: pointer;
`;

export default function Button({ children, ...rest }) {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
}
