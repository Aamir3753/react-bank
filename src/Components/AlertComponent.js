import React from 'react';
import { Alert } from 'reactstrap';
export class AlertComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAlertOpen: false
        }
    }
    onDismiss = () => {
        this.setState({
            isAlertOpen: false
        })
    }
    render() {
        return <Alert isOpen={this.props.isAlertOpen} toggle={this.onDismiss} >{this.props.alertMsg}</Alert>
    }
}