import React from 'react';
import { Alert } from 'reactstrap';
import { Header } from './HeaderComponent';
import { Footer } from './FooterComponent';
import { Home } from './HomeComponents/HomeComponent';
import { CreateAccount } from './AccountComponents/CreateAccountComponent'
import { ViewAccounts } from './AccountComponents/ViewAccountsComponent';
import { ViewTransactions } from './TransactionComponents/VeiwTransactionsComponent';
import { ViewAccountDetail } from './AccountComponents/AccountDetailComponent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: JSON.parse(localStorage.getItem("accounts")),
            transctions: JSON.parse(localStorage.getItem("transactions")),
            debts: JSON.parse(localStorage.getItem("debits")) === null ? 0 : JSON.parse(localStorage.getItem("debits")),
            credits: JSON.parse(localStorage.getItem("credits")) === null ? 0 : JSON.parse(localStorage.getItem("credits")),
            isAlertOpen: false,
            alertMsg: '',
            color: '',
        }
    }
    updateState = () => {
        this.setState({
            accounts: JSON.parse(localStorage.getItem("accounts")),
            transctions: JSON.parse(localStorage.getItem("transactions"))
        })
    }
    totalDebits = (deb) => {
        let debts = JSON.parse(localStorage.getItem("debits"));
        if (debts === null) {
            debts = deb;
        }
        else {
            debts += deb
        }
        this.setState({
            debts: debts
        })
        localStorage.setItem("debits", JSON.stringify(debts));
    }
    totalCredits = (crd) => {
        let credits = JSON.parse(localStorage.getItem("credits"));
        if (credits === null) {
            credits = crd;
        }
        else {
            credits += crd
        }
        this.setState({
            credits: credits
        })
        localStorage.setItem("credits", JSON.stringify(credits));
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
    delAccount = (id) => {
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let accountToDelIndex;
        accounts.filter((account, index) => {
            if (account.id === id) {
                accountToDelIndex = index;
                console.log(index);
            }
            return index;
        });
        accounts.splice(accountToDelIndex, 1);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        this.updateState();
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
    depositeAmount = (amount, trans) => {
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let indexToUpdateAmount;
        accounts.filter((account, index) => {
            if (account.id === trans.id) {
                indexToUpdateAmount = index;
            }
            return index;
        });
        accounts[indexToUpdateAmount].balance = Number(accounts[indexToUpdateAmount].balance) + Number(amount);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        this.transactionTracer(trans);
        this.updateState();
    }
    withdrawAmount = (amount, trans) => {
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let indexToUpdateAmount;
        accounts.filter((account, index) => {
            if (account.id === trans.id) {
                indexToUpdateAmount = index;
            }
            return index;
        });
        accounts[indexToUpdateAmount].balance -= amount;
        localStorage.setItem("accounts", JSON.stringify(accounts));
        this.transactionTracer(trans);
        this.updateState();
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
                                <Route path="/createaccount" render={() => <CreateAccount updateState={this.updateState} totalDebits={this.totalDebits} transactionTracer={this.transactionTracer} updateAlert={this.updateAlert} />} />
                                <Route path="/accountdetail/:id" render={(p) => <ViewAccountDetail props={p} delAccount={this.delAccount} totalCredits={this.totalCredits} totalDebits={this.totalDebits} depositeAmount={this.depositeAmount} withdrawAmount={this.withdrawAmount} updateAlert={this.updateAlert} />} />
                                <Route path="/viewaccounts" render={() => <ViewAccounts accounts={this.state.accounts} />} />
                                <Route path="/viewtransactions" render={() => <ViewTransactions transactions={this.state.transctions} />} />
                                <Route path="/" render={() => <Home accounts={this.state.accounts} credits={this.state.credits} debits={this.state.debts} updateAlert={this.updateAlert} transactions={this.state.transctions} />} />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}
