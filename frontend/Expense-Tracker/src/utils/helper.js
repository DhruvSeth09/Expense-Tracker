import moment from "moment";

export const validateEmail=(email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (fullName) =>{
    if(!fullName) return "";

    const words = fullName.split(" ");
    let initials = "";

    for(let i=0 ; i<Math.min(words.length , 2); i++){
        initials += words[i][0];
    }
    return initials.toUpperCase();
}

export const addThousandsSeparator = (num)=>{
    if(num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart
     ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData=(data=[])=>{
    const chartData=data.map((item)=>({
        category: item?.category,
        amount: item?.amount
    }));
    return chartData;
}

export const prepareIncomeBarChartData =(data=[])=>{
   const sortData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date));
   const chartData = sortData.map((item)=>({
    month:moment(item?.date).format("Do MMM"),
    source: item?.source,
    amount: item?.amount
    }));
    return chartData;
}

export const prepareExpenseLineChartData=(data=[])=>{
    const sortData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date));
   const chartData = sortData.map((item)=>({
    month:moment(item?.date).format("Do MMM"),
    category: item?.category,
    amount: item?.amount
    }));
    return chartData;
}