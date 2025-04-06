import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({transactions,onSeeMore}) => {
    return ( 
        <div className='card'>
            <div className='flex item-center justify-between'>
                <h5 className='text-lg'>Expense</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>
            <div className='mt-6'>
                {console.log(transactions)}
                {transactions?.slice(0,5)?.map((expense)=>(
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        amount={expense.amount}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        icon={expense.icon}
                        type="expense"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
     );
}
 
export default ExpenseTransactions;