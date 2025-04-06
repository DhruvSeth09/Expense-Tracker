import React, { useState,useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/UseUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import {addThousandsSeparator} from '../../utils/helper'


import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from 'react-icons/io'
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData , setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async() =>{
        if(loading) return;
        setLoading(true);
        try{
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
            if(response.data){
                setDashboardData(response.data);
            }
        } catch(err){
            console.error("Something went wrong",err);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return ()=>{}
    }, []);

    return ( 
        <DashboardLayout activeMenu="Dashboard">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard 
                        icon={<IoMdCard/>}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />

                      <InfoCard 
                        icon={<LuWalletMinimal/>}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-green-500"
                    />

                      <InfoCard 
                        icon={<LuHandCoins/>}
                        label="Expense Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color="bg-red-500"
                    />

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <RecentTransactions
                        transactions={dashboardData?.recentTractions}
                        onSeeMore={()=> navigate("/expense")}
                    />

                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                        />
                    <ExpenseTransactions
                        transactions={dashboardData?.last30DaysExpenses?.transactions || [] }
                        onSeeMore={()=> navigate("/expense")}
                    />
                    <Last30DaysExpenses
                        data={dashboardData?.last30DaysExpenses?.transactions || []}
                    />

                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
                        totalIncome={dashboardData?.totalIncome ||0}
                    />

                    <RecentIncome 
                        transactions={dashboardData?.last60DaysIncome?.transactions ||[]}
                        onSeeMore={()=>navigate("/income")}
                        />
                </div>
            </div>
        </DashboardLayout>
     );
}
 
export default Home;