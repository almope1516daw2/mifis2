import Relay from "react-relay";
import React from "react";
import {Register} from "./Register.js";
import {Login} from "./Login.js";
//<Register user={null}/>
class User extends React.Component {
    render() {
        return (
            <div>

                <Login user={null}/>

            </div>
        );
    }
}

export default Relay.createContainer(User, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        mail
      }
    `
    }
});