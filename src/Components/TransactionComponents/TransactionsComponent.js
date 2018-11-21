import React from 'react';
import {Badge} from 'reactstrap';
import { Link } from 'react-router-dom';
export function Transactions(props) {
    return (
        <div className="col-md-12 col-lg-6" >
            <div className="m-1 p-1 shadow p-3 mb-5 bg-white rounded" style={{ border: "1px solid #ccc" }}>
                <div className="container">
                    <div className="row border-bottom ">
                        <div className="mb-1 col-md-12 col-lg-5">
                            <h3 style={{ margin: "0px", padding: "0px" }}>Transactions</h3>
                        </div>
                        <div className=" mb-1 col-md-12 offset-lg-4 d-flex flex-row-reverse col-lg-3">
                            <Link to="/viewtransactions">
                                <button className="btn btn-sm btn-success">View all</button>
                            </Link>
                        </div>
                    </div>
                    <Link to="/viewtransactions" className="text-dark" style={{ textDecoration: 'none' }}>
                        <div className="row">
                            <h1 className=" col-12 text-center">{props.transctionsLength}</h1>
                        </div>
                        <div className="row">
                            <h4 className=" col-12 text-center">Transcations</h4>
                        </div>
                    </Link>
                    <div className="row">
                        <div className="col-6">
                            <h6>
                               <Badge color="secondary">Debits:{props.debits}</Badge>
                            </h6>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <h6>
                            <Badge color="secondary">Credits:{props.credits}</Badge>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}