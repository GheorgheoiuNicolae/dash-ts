import * as React from 'react';
import styled from 'styled-components';

export default class App extends React.Component<{}, {}> {
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
  background-image: url(https://www.meistertask.com/images/wallpapers/RHwFy48z-blurred.jpg);
  background-size: cover;
  background-position: center center;
`;

const MainWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
`;