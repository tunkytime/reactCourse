import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "325548232465-d2fkafne8fmreu7uscressa38ae9a6oe.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    return (
      <>
        {this.state.isSignedIn === null && null}
        <button
          onClick={
            this.state.isSignedIn ? this.onSignOutClick : this.onSignInClick
          }
          className="ui red google button"
        >
          <i className="google icon" />
          {this.state.isSignedIn ? <>Sign Out</> : <>Sign in with Google</>}
        </button>
      </>
    );
  }

  render() {
    return <>{this.renderAuthButton()}</>;
  }
}

export default connect(null, { signIn, signOut })(GoogleAuth);
