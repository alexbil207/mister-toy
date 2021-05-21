import React from 'react';
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { onLoadUser } from '../store/actions/user.actions'
import { UserMsg } from '../cmps/UserMsg.jsx';



class _LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        isMsg: false,
        msg: '',
    }


    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({ ...prevState, [name]: value }))

    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { onLoadUser } = this.props;
        const { email, password } = this.state;
        if (!email && !password) return
        const credentials = {
            email,
            password,
        }

        onLoadUser(credentials)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(err => {
                const { isMsg } = this.state;
                this.setState({ isMsg: !isMsg, msg: 'Invalid Mail / Password' })
                setTimeout(() => {
                    const { isMsg } = this.state;
                    this.setState({ isMsg: !isMsg })
                }
                    , 2000)
            })


    }


    render() {
        const { isMsg, msg } = this.state;
        return (
            <>
                <Container component="main" className="login-container" maxWidth="xs">
                    <CssBaseline />
                    <div className="flex column align-center">
                        <Avatar className="avatar" >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.onSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/signup" >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>

                </Container>
                {isMsg && < UserMsg msg={msg} />}
            </>
        );
    }
}



const mapDispatchToProps = {
    onLoadUser,

}



export const LoginForm = connect(null, mapDispatchToProps)(_LoginForm)
