import React from 'react';
import { Link } from 'react-router-dom';
export class CreateAccount extends React.Component {
    checkValidation() {
        const accountForm = document.getElementById("accountForm");
        const name = document.getElementById("name");
        const accountType = document.getElementById("accountType");
        const initDeposite = document.getElementById("initDeposite");
        if (accountForm.checkValidity() && name.value.trim() !== "" && name.value.trim() !== "") {
            let accounts = JSON.parse(localStorage.getItem("accounts"));
            let id = Math.random() * 100000000000000000;
            let registered = new Date().toLocaleString();
            if (accounts === null) {
                accounts = [];
                accounts.push(
                    {
                        id: id,
                        name: name.value,
                        accountType: accountType.value,
                        balance: initDeposite.value,
                        registered: registered
                    }
                )
                this.props.totalDebits(Number(initDeposite.value));
                localStorage.setItem("accounts", JSON.stringify(accounts));
            } else {
                accounts.push({
                    id: Math.random() * 100000000000000000,
                    name: name.value,
                    accountType: accountType.value,
                    balance: initDeposite.value,
                    registered: new Date().toLocaleString()
                });
                this.props.totalDebits(Number(initDeposite.value));
                localStorage.setItem("accounts", JSON.stringify(accounts));
            }
            this.props.transactionTracer(
                {
                    id: id,
                    balance: initDeposite.value,
                    type: 'credit',
                    registered: registered,
                    description: "Initial Credit"
                }
            );
            this.props.updateState();
            this.props.updateAlert(true, 'Account Created !', 'success');
            this.refs.navigateTo.click();
        } else {
            if (name.validity.valueMissing || name.value.trim() === "") {
                this.props.updateAlert(true, 'Please enter full name !', 'danger');
                name.focus();
            }
            else if (accountType.validity.valueMissing) {
                this.props.updateAlert(true, 'Please select account type !', 'danger');
                accountType.focus();

            }
            else if (initDeposite.validity.valueMissing) {
                this.props.updateAlert(true, 'please deposite some amount !', 'danger');
                initDeposite.focus();

            }
            else if (initDeposite.validity.rangeUnderflow) {
                this.props.updateAlert(true, 'please deposite ammout > or = 100 !', 'danger');
                initDeposite.focus();
            }
        }

    }
    render() {
        return (
            <div className="mt-2 col-12">
                <h2 className="mt-1 text-center text-dark ">Enter account details below</h2>
                <form id="accountForm" noValidate>
                    <div>
                        <Link to="/">
                            <button type="button" className="btn btn-sm btn-dark">
                                Back to Dashbord
                            </button>
                        </Link>
                    </div>
                    <div style={{ display: 'none' }}>
                        <Link to="/viewaccounts">
                            <button ref="navigateTo" type="button" className="btn btn-sm btn-dark">
                                Back to Dashbord
                            </button>
                        </Link>
                    </div>
                    <div className="form-group">
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Enter Full Name</label>
                        <input className="form-control" type="text" id="name" placeholder="Enter full name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountType">Select account type</label>
                        <select className="form-control" id="accountType" required>
                            <option value="" >Select Account Type</option>
                            <option value="current">Current</option>
                            <option value="saving">Saving</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="initDeposite">Initail Deposite</label>
                        <input className="form-control" type="number" min="100" id="initDeposite" defaultValue="1000" required />
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <button type="button" onClick={() => { this.checkValidation(this.props) }} className=" btn btn-success btn-sm">CREATE ACCOUNT</button>
                    </div>
                </form>
            </div>
        );
    }
}
