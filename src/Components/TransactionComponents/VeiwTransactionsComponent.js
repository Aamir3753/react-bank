import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
export class ViewTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            transactionDetail: null
        }

    }

    TransactionDetail =
        () => {
            if (this.state.transactionDetail === null) {
                return <div></div>
            } else {
                return (
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Account #</td>
                                    <td>{this.state.transactionDetail.id}</td>
                                </tr>
                                <tr>
                                    <td>Registered</td>
                                    <td>{this.state.transactionDetail.registered}</td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td>{this.state.transactionDetail.type}</td>
                                </tr>
                                <tr>
                                    <td>Balance</td>
                                    <td>{this.state.transactionDetail.balance}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{this.state.transactionDetail.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            }
        }
    toggleModal = () => {
        this.setState({
            isModalOpen: false
        })
    }
    render() {
        if (this.props.transactions === null) {
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
                        There is no transaction!
                    </h2>
                </div>
            );
        }
        else {
            return (
                <div className="col-12 mt-4">
                    <Modal isOpen={this.state.isModalOpen}>
                        <ModalHeader toggle={this.toggleModal}>
                            Transaction
                                    </ModalHeader>
                        <ModalBody>
                            {this.TransactionDetail(this.state.transactionDetail)}
                        </ModalBody>
                    </Modal>
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
                                    <th>Registered</th>
                                    <th>Type</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td style={{ color: 'blue', fontFamily: 'cursive', cursor: 'pointer' }}>
                                                <a href="void:javascript:(0)" onClick={() => { this.setState({ isModalOpen: true, transactionDetail: transaction }) }}>{transaction.id}</a></td>
                                            <td style={{ fontFamily: 'cursive' }}>{transaction.registered}</td>
                                            <td>{transaction.type}</td>
                                            <td>{transaction.balance}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}