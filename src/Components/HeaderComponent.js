import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav, NavbarToggler, Collapse } from 'reactstrap';
export class Header extends React.Component {
    state = {
        isOpenNavbar: false
    }
    render() {
        return (
            <div>
                <Navbar dark expand="md" color="dark">
                    <div className="container">
                        <NavbarBrand href="/">Bank</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.isOpenNavbar} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Link to="/" className="nav-link">
                                    Dashboard
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/viewaccounts" className="nav-link">
                                    Accounts
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/viewtransactions" className="nav-link">
                                    Transactions
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    };
    toggleNavbar = () => {
        this.setState({ isOpenNavbar: !this.state.isOpenNavbar });
    }

} 