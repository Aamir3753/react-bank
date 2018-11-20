import React from 'react';
import { Alert } from 'reactstrap';
import { Header } from './HeaderComponent';
import { Footer } from './FooterComponent';
import { Home } from './HomeComponents/HomeComponent';
import { CreateAccount } from './AccountComponents/CreateAccountComponent'
import { ViewAccounts } from './AccountComponents/ViewAccountsComponent';
import { ViewTransactions } from './TransactionComponents/VeiwTransactionsComponent';
import { ViewAccountDetail } from './AccountComponents/AccountDetailComponent';
// render={() => <ViewAccountDetail account={this.state.accounts.filter(account => account.id === this.state.accountDetail)[0]} />}
import { BrowserRouter, Route, Switch } from 'react-router-dom';
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: JSON.parse(localStorage.getItem("accounts")),
            transctions: JSON.parse(localStorage.getItem("transactions")),
            isAlertOpen: false,
            alertMsg: '',
            color: '',
            accountDetail: null
        }
    }
    updateState = () => {
        this.setState({
            accounts: JSON.parse(localStorage.getItem("accounts")),
            transctions: JSON.parse(localStorage.getItem("transactions"))
        })
    }
    transactionTracer = (trans) => {
        let transactions = JSON.parse(localStorage.getItem("transactions"));
        if (transactions === null) {
            transactions = [];
            transactions.push(trans);
        } else {
            transactions.push(trans);
        }


        localStorage.setItem("transactions", JSON.stringify(transactions))
        this.setState({
            transactions: transactions
        })
    }
    updateAlert = (isOpen, msg, col) => {
        this.setState({
            isAlertOpen: isOpen,
            alertMsg: msg,
            color: col
        })
    }
    onDismiss = () => {
        this.setState({
            isAlertOpen: false
        })
    }
    getId = (id) => {
        this.setState({
            accountDetail: id
        })
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <div className="container">
                        <Alert color={this.state.color} isOpen={this.state.isAlertOpen} toggle={this.onDismiss}>{this.state.alertMsg}</Alert>
                        <div className="row">
                            <Switch>
                                <Route path="/createaccount" render={() => <CreateAccount updateState={this.updateState} transactionTracer={this.transactionTracer} updateAlert={this.updateAlert} />} />
                                <Route path="/accountdetail/:id" component={ViewAccountDetail}  />
                                <Route path="/viewaccounts" render={() => <ViewAccounts accounts={this.state.accounts} getId={this.getId} />} />
                                <Route path="/viewtransactions" render={() => <ViewTransactions transactions={this.state.transctions} getId={this.getId} />} />
                                <Route path="/" render={() => <Home accounts={this.state.accounts} updateAlert={this.updateAlert} transactions={this.state.transctions} />} />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>


        );
    }
}
