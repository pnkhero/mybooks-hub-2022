import Container from '@material-ui/core/Container';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import userTools from './Firebase/Firebase'
import styles from './mystyle.module.css';

class RegisterP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: "",
        };
        this.password = this.password.bind(this);
        this.email = this.email.bind(this);
    };

    email(event) {
        this.setState({email: event.target.value})
    }

    password(event) {
        this.setState({password: event.target.value})
    }

    register() {
        userTools.addUserDatabase(this.state.email, this.state.password)
    }

    render(){
      return (
        <div>
          <Container minWidth="xs">
                <h1 className={styles.logintitle}> MyBook </h1>
                <h1 className={styles.logsubtit}> Register </h1>
                              <form>
                                  <div className={styles.emailog}>
                                      <AccountCircleIcon/>
                                      <TextField
                                          required
                                          onChange={this.email}
                                          variant="outlined"
                                          fullWidth
                                          label="email"
                                          value={this.state.email}
                                      />
                                  </div>
                                  <div className={styles.passlog}>
                                      <VpnKeyIcon/>
                                      <TextField
                                          required
                                          onChange={this.password}
                                          variant="outlined"
                                          fullWidth
                                          label="password"
                                          type="password"
                                          value={this.state.password}
                                      />
                                  </div>
                                  <div className={styles.connectbtn}>
                                      <Button
                                      onClick={() => this.register()}
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      className="button-submit"
                                      value="Submit"
                                      >
                                          Register
                                      </Button>
                                  </div>
                              </form>
          </Container>
        </div>
      );
      }
}

export default RegisterP;