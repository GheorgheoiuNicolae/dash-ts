import * as React from 'react';
import { StateProps, DispatchProps, Props } from './FiltersContainer';
import styled from 'styled-components';

export type Props = StateProps & Props & DispatchProps;
interface OtherProps {
  // component state props here
}

export default class Filters extends React.PureComponent<Props, OtherProps> {
  componentDidMount() {
    console.log('filters');
  }

  render() {
    return  (
      <Wrap>
        Filters
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  display: flex;
  height: 250px;
  width: 100%;
  z-index: 1;
  background: #fff;
  margin-right: 20px;
  margin-top: 50px;
  background: #fff;
  position: absolute;
  box-sizing: border-box;
  display: none;
`;