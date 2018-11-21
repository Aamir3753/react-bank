import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, Alert } from 'reactstrap';
export class ViewAccountDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDepositeModal: false,
            isOpenWithdrawModal: false,
            isOpenAlert: false,
            account: this.getAccount(),
            alertMsg: '',
            col: ''
        }
    }
    getAccount = () => {
        let account ;
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        if (accounts !== null && accounts.length !== 0) {
            account = accounts.filter(
                (acc) => acc.id === Number(this.props.props.match.params.id)
            )[0]
        }
        return account;
    }
    closeModal = () => {
        this.setState({
            isOpenDepositeModal: false,
            isOpenWithdrawModal: false,
            account:this.getAccount()
        })
    }
    openDepositeModal = () => {
        this.setState({
            isOpenDepositeModal: true
        })
    }
    openWithdrawModal = () => {
        this.setState({
            isOpenWithdrawModal: true
        })
    }
    closeAlert = () => {
        this.setState(
            {
                isOpenAlert: false
            }
        )
    }
    DepositeModal = () => {

        let depositeValidation = () => {
            let cash = document.getElementById("cash");
            let depositeForm = document.getElementById("depositeForm");
            let account;
            let accounts = JSON.parse(localStorage.getItem("accounts"));
            if (accounts !== null && accounts.length !== 0) {
                account = accounts.filter(
                    (acc) => acc.id === Number(this.props.props.match.params.id)
                )[0]
            }
            if (depositeForm.checkValidity()) {
                this.props.depositeAmount(
                    cash.value,
                    {
                        id: account.id,
                        registered: new Date().toLocaleString(),
                        type: "credit",
                        balance: cash.value
                    }
                )
                this.props.totalDebits(Number(cash.value));
                this.closeModal();
                this.props.updateAlert(true, 'Amount deposited!', 'success');


            }
            else if (cash.validity.rangeUnderflow) {
                this.setState({
                    isOpenAlert: true,
                    alertMsg: 'Please enter valid amount!',
                    col: 'danger'
                })
            }
            else if (cash.validity.valueMissing) {
                this.setState({
                    isOpenAlert: true,
                    alertMsg: 'Please enter  amount!',
                    col: 'danger'
                })
            }
        }

        return (
            <Modal isOpen={this.state.isOpenDepositeModal} >
                <ModalHeader toggle={this.closeModal}>
                    Deposite Amount
                </ModalHeader>
                <ModalBody>
                    <Alert isOpen={this.state.isOpenAlert} color={this.state.col} toggle={this.closeAlert}>
                        {this.state.alertMsg}
                    </Alert>
                    <form id="depositeForm" noValidate>
                        <div className="form-group">
                            <label htmlFor="cash">Amount</label>
                            <input className="form-control" id="cash" placeholder="Enter amount" type="number" min="0" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input className="form-control" id="description" placeholder="Enter description(optional)" type="text" />
                        </div>
                        <div>
                            <button onClick={depositeValidation} type="button" className="btn btn-sm btn-dark" id="deposite">Deposite</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        )
    }



    // wtihdraw modal

    WithdrawModal = () => {

        let withdrawValidation = () => {
            let cash = document.getElementById("cash");
            let withdrawForm = document.getElementById("withdrawForm");
            let account;
            let accounts = JSON.parse(localStorage.getItem("accounts"));
            if (accounts !== null && accounts.length !== 0) {
                account = accounts.filter(
                    (acc) => acc.id === Number(this.props.props.match.params.id)
                )[0]
            }
            if (withdrawForm.checkValidity()) {
                this.props.withdrawAmount(
                    cash.value,
                    {
                        id: account.id,
                        registered: new Date().toLocaleString(),
                        type: "debit",
                        balance: cash.value
                    }
                )
                this.props.totalCredits(Number(cash.value));
                this.closeModal();
                this.props.updateAlert(true, 'Amount withdrawn!', 'success');


            }
            else if (cash.validity.rangeUnderflow || cash.validity.rangeOverflow) {
                this.setState({
                    isOpenAlert: true,
                    alertMsg: 'Please enter valid amount!',
                    col: 'danger'
                })
            }
            else if (cash.validity.valueMissing) {
                this.setState({
                    isOpenAlert: true,
                    alertMsg: 'Please enter  amount!',
                    col: 'danger'
                })
            }
        }

        return (
            <Modal isOpen={this.state.isOpenWithdrawModal} >
                <ModalHeader toggle={this.closeModal}>
                    Withdraw Amount
            </ModalHeader>
                <ModalBody>
                    <Alert isOpen={this.state.isOpenAlert} color={this.state.col} toggle={this.closeAlert}>
                        {this.state.alertMsg}
                    </Alert>
                    <form id="withdrawForm" noValidate>
                        <div className="form-group">
                            <label htmlFor="cash">Amount</label>
                            <input className="form-control" id="cash" placeholder={`Maximum amount:${this.state.account.balance}`} type="number" min="0" max={this.state.account.balance} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input className="form-control" id="description" placeholder="Enter description(optional)" type="text" />
                        </div>
                        <div>
                            <button onClick={withdrawValidation} type="button" className="btn btn-sm btn-dark" >Withdraw</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        )
    }

    render() {
        let account;
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        if (accounts !== null && accounts.length !== 0) {
            account = accounts.filter(
                (acc) => acc.id === Number(this.props.props.match.params.id)
            )[0];
        }
        let delAccount = () => {
            let confirm = window.confirm("Are you sure you want to delete account!");
            if (confirm) {
                this.props.delAccount(account.id);
                this.props.updateAlert(true, `Account# ${account.id} has been deleted!`, "danger");
                document.getElementById("navigateToBack").click()
            }

        }
        if (!account) {
            return (
                <div className="col-12 mt-2">
                    <div>
                        <Link to="/viewaccounts">
                            <button type="button" className="mb-2 btn btn-sm btn-dark">
                                Back to Accounts
                                </button>
                        </Link>
                    </div>
                    <h2 className="text-danger">No record found!</h2>
                </div>
            )
        }
        else {
            return (
                <div className="col-12 mt-2" >
                    <div>
                        {this.DepositeModal()}
                    </div>
                    <div>
                        {this.WithdrawModal()}
                    </div>
                    <h3 className="text-dark text-center">Account Detail</h3>
                    <div className="d-flex justify-content-between">
                        <Link to="/viewaccounts">
                            <button type="button" id="navigateToBack" className="mb-2 btn btn-sm btn-dark">
                                Back to Accounts
                                </button>
                        </Link>
                        <button onClick={delAccount} type="button" className="mb-2 btn btn-sm btn-danger">
                            Delete Account
                                </button>
                    </div>
                    <table className="table">
                        <tbody>

                            <tr>
                                <td>Account #</td>
                                <td>{account.id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{account.name}</td>
                            </tr>
                            <tr>
                                <td>Registered</td>
                                <td>{account.registered}</td>
                            </tr>
                            <tr>
                                <td>Account Type</td>
                                <td>{account.accountType}</td>
                            </tr>
                            <tr>
                                <td>Balance</td>
                                <td>{account.balance}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <div>
                            <button type="button" onClick={this.openDepositeModal} className="btn btn-sm btn-info">
                                Deposite
                                </button>
                            <button type="button" onClick={this.openWithdrawModal} className="ml-4 btn btn-sm btn-danger">
                                Withdraw
                                </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}