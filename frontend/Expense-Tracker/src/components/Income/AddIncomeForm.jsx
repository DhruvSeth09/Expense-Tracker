import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        amount: "",
        source: "",
        data:"",
        icon:"",
    });

    const handleChange=(key,value)=> setIncome({...income, [key]:value});


    return ( 
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)} 
            />
              
            <Input 
                value={income.source}
                onChange={({target})=>handleChange('source',target.value)}
                placeholder="Freelance, Salary, Stocks, etc."
                label="Income Source"
                type="text"
            />

            <Input 
                value={income.amount}
                onChange={({target})=>handleChange('amount',target.value)}
                placeholder=""
                label="Amount"
                type="number"
            />

            <Input 
                value={income.date}
                onChange={({target})=>handleChange('date',target.value)}
                placeholder=""
                label="Date"
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                className='add-btn add-btn-fill'
                onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>

        </div>
     );
}
 
export default AddIncomeForm;