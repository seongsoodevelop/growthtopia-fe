const { default: styled } = require("styled-components");

const TypoContainer = styled.span`
  ${({ as }) => {
    switch (as) {
      case "h1": {
        return `
        display: block;
        word-break: keep-all;
        font-weight: 800;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        `;
      }
      case "h2": {
        return `
        display: block;
        word-break: keep-all;
        font-weight: 800;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        `;
      }
      default:
        break;
    }
  }}
`;

export default function Typo({ children, ...rest }) {
  return <TypoContainer {...rest}>{children}</TypoContainer>;
}
