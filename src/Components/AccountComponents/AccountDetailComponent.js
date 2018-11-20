import React from 'react';
import { Link } from 'react-router-dom';
export let ViewAccountDetail = ({ match }) => {
    let account;
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    if (accounts !== null && accounts.length !== 0) {
        account = accounts.filter(
            (acc) => acc.id ===Number(match.params.id)
        )[0]
    }
    console.log(account);
    if (!account) {
        return (
            <div>
                <h2 className="text-danger">No record found!</h2>
            </div>
        )
    }
    else {

        return (
            <div className="col-12 mt-2" >
                <h3 className="text-dark text-center">Account Detail</h3>
                <div>
                    <Link to="viewaccounts">
                        <button type="button" className="mb-2 btn btn-sm btn-dark">
                            Back to Accounts
                                </button>
                    </Link>
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
            </div>
        )
    }
}