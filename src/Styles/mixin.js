import { css } from 'styled-components';

const FlexSet = (horizon, vertical, direction) => css`
  display: flex;
  justify-content: ${horizon || 'center'};
  align-items: ${vertical || 'center'};
  flex-direction: ${direction || 'row'};
`;

const DefaultFont = css`
  color: #222222;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
`;

const mixin = { FlexSet, DefaultFont };

export default mixin;
