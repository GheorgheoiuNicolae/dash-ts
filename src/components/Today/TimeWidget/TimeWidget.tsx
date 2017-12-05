import * as React from 'react';
import * as moment from 'moment';
import styled from 'styled-components';

interface Props {
  user: any;
}
export default class TimeWidget extends React.Component<Props, {time: string, componentIsMountend: boolean}> {
  constructor() {
    super();
    this.state = {
      time: this.getTime(),
      componentIsMountend: false,
    };
  }
  componentDidMount() {
    const { time, componentIsMountend } = this.state;
    
    this.setState({componentIsMountend: true});

    setInterval(() => {
      if(time !== this.getTime() && componentIsMountend) {
        this.setState({
          time: this.getTime()
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.setState({componentIsMountend: false});
  }

  getTime() {
    return moment().format('HH:mm');
  }
  
  render() {
    const { user } = this.props;
    const { time } = this.state;
    return (
      <Wrapper 
        className={`time-widget`} 
      >
        <Time>{time}</Time>
        <Welcome>
          Good evening, {user.displayName ? user.displayName : user.email}
        </Welcome>
        <Quote>
          We must all suffer one of two things: the pain of discipline or the pain of regret or disappointment. 
          <Author>Jim Rohn</Author>
        </Quote>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 5;
  padding-left: 10px;
  flex-direction: column;
  justify-content: initial;
  align-items: flex-end;
`;
const Time = styled.h1`
  color: #fff;
  z-index: 1;
  font-size: 70px;
  text-shadow: 1px 1px 1px #20232a;
  margin: 0;
`;
const Welcome = styled.h1`
  color: #fff;
  z-index: 1;
  font-size: 22px;
  text-shadow: 1px 1px 1px #20232a;
`;
const Quote = styled.h3`
  color: #fff;
  z-index: 1;
  font-size: 12px;
  padding: 10px;
  background: rgba(0,0,0, .3);
  margin-left: 40px;
`;
const Author = styled.span`
  color: #fff;
  z-index: 1;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  margin: 0;
`;
