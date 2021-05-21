import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { onSignUp } from '../store/actions/user.actions';
import { UserMsg } from '../cmps/UserMsg';


class _SignUpForm extends React.Component {
    state = {
        email: '',
        fullName: '',
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
        const { onSignUp } = this.props;
        const { email, password, fullName } = this.state;
        const regexEmail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        if (!email && !password && !fullName) return
        else if (!regexEmail.test(email)) {
            const { isMsg } = this.state;
            this.setState({ isMsg: !isMsg, msg: 'Invalid eMail' })
            setTimeout(() => {
                const { isMsg } = this.state;
                this.setState({ isMsg: !isMsg })
            }
                , 2000)
            return;
        }
        const userInfo = {
            email,
            password,
            fullName
        }
        onSignUp(userInfo)
            .then(() => this.props.history.push('/'))
    }

    render() {
        const { isMsg, msg } = this.state;

        return (
            <>
                <Container component="main" className="login-container" maxWidth="xs">
                    <CssBaseline />
                    <div className="flex column align-center">
                        <Avatar className="avatar">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                    </Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="fname"
                                        name="fullName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        autoFocus
                                        onChange={this.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={this.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={this.handleChange}

                                    />
                                </Grid>
                            </Grid>
                            <Button
                                className="sign-up-btn"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.onSubmit}
                            >
                                Sign Up
                        </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to="/login">
                                        Already have an account? Sign in
                            </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
                { isMsg && < UserMsg msg={msg} />}
            </>
        );
    }
}



const mapDispatchToProps = {
    onSignUp,
}



export const SignUpForm = connect(null, mapDispatchToProps)(_SignUpForm)
