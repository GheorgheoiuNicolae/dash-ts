import { connect } from 'react-redux';
import * as React from 'react';
import { PureComponent } from 'react';

export interface StyledComponentProps {
  style?: string;
}

// @autobind
class Register<P, S> extends PureComponent<P & StyledComponentProps, S> {
  // handleSubmit = (e:any) => {
  //   e.preventDefault()
  //   // this.props.dispatch(action.registerUser(this.email.value, this.pw.value));
  // }
  
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        {/*<form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>*/}
      </div>
    );
  }
}
export default connect((store) => {
    return {
        entries: store.entries
    };
})(Register);