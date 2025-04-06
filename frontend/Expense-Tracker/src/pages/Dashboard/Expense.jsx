import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/UseUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';
import toast from 'react-hot-toast';
import ExpenseList from "../../components/Expense/ExpenseList"


const Expense = () => {
    useUserAuth();
     const [expenseData,setExpenseData]= useState([]);
        const [loading, setLoading] = useState(false);
        const [openDeleteAlert,setOpenDeleteAlert] =useState({
            show:false,
            data:null,
        });    
    
        const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

// Get All Expense
        const fetchExpenseDetails = async () => {
            if(loading) return;
    
            setLoading(true);
            try {
                const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
                // console.log(response.data)
                if(response.data){
                    setExpenseData(response.data);
                }
            
            }catch(err){
                console.log(err);
    
            }finally{
                setLoading(false);
            }
        }
    
        //Handle Add Expense
        const handleAddExpense = async (expense) => {
            const {category,amount,date,icon}=expense
    
            if(!category.trim()){
                toast.error("category is required")
                return
            }
    
            if(!amount || isNaN(amount) || Number(amount) <=0){
                toast.error("Amount should be a valid number grater than 0.")
                return
            }
            if(!date){
                toast.error("Date is required")
                return
            }
    
            try {
                await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
                    category,
                    amount,
                    date,
                    icon,
                });
                setOpenAddExpenseModel(false);
                toast.success("Expense Added Successfully")
                fetchExpenseDetails();
    
            } catch (error) {
                console.log("Error adding Expense",
                    error.response?.data?.message || error.message
                );
            }
        }

            //Delete Income
    const deleteExpense = async (id) => {
        try {
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

        setOpenDeleteAlert({show:false, data:null})
        toast.success("Expense details delete successfully")
        fetchExpenseDetails();
        } catch(err){
            "error deleting expense:",
            err.response?.data?.message || err.message
        }
    }

    //handle download income details
    // const handleDownloadExpenseDetails = async () => {
    //     try {
    //         const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
    //             responseType: 'blob',
    //             }
    //         )
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.setAttribute("download","expense_details.xlsx")
    //         a.click();
    //         a.parentNode.removeChild(a);
    //         window.URL.revokeObjectURL(url);
    //     }
    //     catch (error) {
    //         console.log("Error downloading expense details",
    //             error.response?.data?.message || error.message
    //         );
    //         toast.error("failed to download expense details, Please try again later");
    //     }
    // }
    
    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob',
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(a); // ✅ ensure it's part of DOM
            a.click();
            document.body.removeChild(a); // ✅ safe removal
            window.URL.revokeObjectURL(url);
    
            toast.success("Expense details downloaded successfully ✅");
        } catch (error) {
            console.error(
                "Error downloading expense details:",
                error.response?.data?.message || error.message
            );
            toast.error("Failed to download expense details. Please try again later.");
        }
    };
    
        useEffect(()=>{
            fetchExpenseDetails();
            return ()=>{}
        },[]);
    
    return (  
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={()=>setOpenAddExpenseModel(true)}
                        />
                    </div>

                    <ExpenseList
                          transactions={expenseData}
                          onDelete={(id)=>{
                              setOpenDeleteAlert({show:true, data:id});
                          }}
                          onDownload={handleDownloadExpenseDetails}
                    />
                </div>

                <Modal 
                    isOpen={openAddExpenseModel}
                    onClick={() => setOpenAddExpenseModel(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={()=> setOpenDeleteAlert({show:false, data:null})}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are You Sure You Want To Delete This Expense Detail ?"
                        onDelete={()=> deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>        
    );
}
 
export default Expense;