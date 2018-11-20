import React from 'react';
import { Accounts } from '../AccountComponents/AccountsComponent';
import { Transactions } from '../TransactionComponents/TransactionsComponent';
export function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <Accounts accountsLength={props.accounts === null ? '0' : props.accounts.length} />
                <Transactions transctionsLength={props.transactions === null ? '0' : props.transactions.length} />
            </div>
        </div>
    );
}