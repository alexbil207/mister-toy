import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export class HeaderCmp extends React.Component {
    state = {
        isShown: false,
    }

    showMenu = () => {
        const { isShown } = this.state;
        this.setState({ isShown: !isShown })
    }
    render() {
        const { user, onLogOut } = this.props;
        const { isShown } = this.state;

        return (
            <AppBar position="static">
                <div className="header-container container flex align-center space-between">
                    <Link to="/"><h1>Mister-Toy</h1></Link>
                    {user && <div className="flex align-center"><AccountCircleIcon /> {user.fullName}</div>}
                    <div className={`nav-btns flex ${isShown ? 'show' : ''}`}>
                        <Link to="/About"
                            onClick={this.showMenu}><Button className="action-btn btn" color="inherit">About</Button></Link>
                        <Link to="/DashBoard"
                            onClick={this.showMenu}><Button className="action-btn btn" color="inherit">Dashboard</Button></Link>
                        {user && <Button className="action-btn btn" color="inherit"
                            onClick={() => {
                                this.showMenu();
                                onLogOut();
                            }}>LogOut</Button>}
                        {!user && <Link to="/login" onClick={this.showMenu}>
                            <Button className="action-btn btn" color="inherit">Login</Button></Link>}
                    </div>
                    <button className="menu-btn"
                        onClick={this.showMenu}>☰</button>
                </div>
            </AppBar>
        )
    }
}