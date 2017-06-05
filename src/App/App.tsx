import * as React from 'react';
import styled from 'styled-components';


export default class App extends React.Component<any, any> {
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
  background: #1fa2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const MainWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
`