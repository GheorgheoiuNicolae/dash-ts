import * as React from 'react';
import styled from 'styled-components';

export default class App extends React.Component<any, any> {
  // componentWillReceiveProps(next: any) {
  //   console.log('next', next.children);
  // }
  render() {
    return (
      <Wrapper className="app">
          <MainWrapper>
            {this.props.children}
          </MainWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  background: #1fa2ff; 
  background: -webkit-linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);
  background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);
`;

const MainWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
`;