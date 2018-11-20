import React from 'react';
import { Link } from 'react-router-dom';
export function Accounts(props) {
    return (
        <div className="col-md-12 col-lg-6" >
            <div className="m-1 p-1 shadow p-3 mb-5 bg-white rounded" style={{ border: "1px solid #ccc" }}>
                <div className="container">
                    <div className="row border-bottom">
                        <div className="mb-1 col-md-12 col-lg-5">
                            <h3 style={{ margin: "0px", padding: "0px" }}>Accounts</h3>
                        </div>
                        <div className=" mb-1 col-md-12 d-flex flex-row-reverse col-lg-4">
                            <Link to="/createaccount">
                                <button className=" btn btn-sm btn-dark">Add new account</button>
                            </Link>
                        </div>
                        <div className=" mb-1 col-md-12 d-flex flex-row-reverse col-lg-3">
                            <Link to="/viewaccounts">
                                <button className="btn btn-sm btn-success">View all</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <h1 className=" col-12 text-center">{props.accountsLength}</h1>
                    </div>
                    <div className="row">
                        <h4 className=" col-12 text-center">Accounts</h4>
                    </div>
                </div>

            </div>
        </div>
    )
}