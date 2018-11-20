import React from 'react';
import { Link } from 'react-router-dom';
export function ViewAccounts(props) {
    if (props.accounts === null) {
        return (
            <div className="col-12 mt-4">
                <div>
                    <Link to="/">
                        <button type="button" className="btn btn-sm btn-dark">
                            Back to Dashboard
                    </button>
                    </Link>
                </div>
                <h2 className="text-center text-dark">
                    There is no account!
                 </h2>
            </div>
        )
    }
    else {

        return (
            <div className="col-12 mt-4">
                <h2 className="text-center text-dark">Accounts</h2>
                <div className="mb-2">
                    <Link to="/">
                        <button type="button" className="btn btn-sm btn-dark">
                            Back to Dashbord
                    </button>
                    </Link>
                </div>
                <div className="table-responsive">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Account #</th>
                                <th>Name</th>
                                <th>Registered</th>
                                <th>Account Type</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.accounts.map((account) => (
                                    <tr key={account.id}>
                                        <td style={{ color: 'blue', fontFamily: 'cursive', cursor: 'pointer' }}>
                                            <Link to={"accountdetail/" + account.id}>{account.id}</Link></td>
                                        <td>{account.name}</td>
                                        <td style={{ fontFamily: 'cursive' }}>{account.registered}</td>
                                        <td>{account.accountType}</td>
                                        <td>{account.balance}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}