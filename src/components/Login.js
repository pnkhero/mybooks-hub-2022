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
import GoogleButton from 'react-google-button'

class LoginP extends React.Component {
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

    login() {
      userTools.checkUserDatabase(this.state.email, this.state.password);
    }

    goregister() {
        window.location.replace('/register')
    }

    logingoogle = async () => {
            await userTools.signgoogle()
    }
    
    render(){
      return (
        <div>
          <Container>
                <h1 className={styles.logintitle}> MyBook </h1>
                <h1 className={styles.logsubtit}> Login </h1>
              <form>
                  <div className={styles.emailog}>
                      <AccountCircleIcon/>
                          <TextField
                              required
                              onChange={this.email}
                              variant="outlined"
                              fullWidth
                              label="Email Address"
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
                              label="Password"
                              type="password"
                              value={this.state.password}
                          />
                  </div>
                  <div className={styles.connectbtn} >
                      <Button
                          onClick={() => this.login()}
                          fullWidth
                          variant="contained"
                          color="primary"
                          className="button-submit"
                          value="Submit"
                        >
                          Connect
                      </Button>
                  </div>
                  <div className={styles.registerbtn} >
                      <Button
                          onClick={() => this.goregister()}
                          fullWidth
                          variant="contained"
                          color="primary"
                          className="button-submit"
                          value="Submit"
                        >
                          Register
                      </Button>
                  </div>
                  <div className={styles.connectgo} >
                      <GoogleButton
                          onClick={() => this.logingoogle()}
                        >
                      </GoogleButton>
                  </div>
              </form>
          </Container>
        </div>
      );
      }
}


export default LoginP;