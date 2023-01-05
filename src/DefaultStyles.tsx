import { css, keyframes } from "styled-components";

export const DefaultFontsStyles = css`
  font-family: 'Montserrat';
  font-style: normal;
  line-height: 140%;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`

const Shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const shimmerStyles = () => {
  return css`
    animation: ${Shimmer} 3s
      ${(props: { static?: boolean }) => !props.static && 'infinite'} linear;
    background: linear-gradient(97.5deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 51.13%, rgba(0, 0, 0, 0.1) 56.51%);
    background-size: 1000px 100%;
  `;
};