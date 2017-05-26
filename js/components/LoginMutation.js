import Relay from "react-relay";

export default class LoginMutation extends Relay.Mutation {
    static fragments = {
        user: () => Relay.QL`
      fragment on User {
        mail
        salt
        hash
      }
    `
    };

    getMutation() {
        console.log("mutation");
        return Relay.QL`mutation { searchLogin }`;
    }

    getVariables() {
        console.log("varia");
        return {
            mail: this.props.mail,
            salt: this.props.salt,
            hash: this.props.hash
        }
    }

    getFatQuery() {
        console.log("fat");
        return Relay.QL`
      fragment on AddRegisterPayload {
        user {
          mail
          salt
          hash
        }
      }
    `
    }

    getConfigs() {
        console.log("configs");
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: this.props.user,

        }];
    }

    getOptimisticResponse() {
        console.log("getOptimisticResponse");
        return {
            user: {
                mail: this.props.mail,
                salt: this.props.salt,
                hash: this.props.hash
            }
        };
    }
}