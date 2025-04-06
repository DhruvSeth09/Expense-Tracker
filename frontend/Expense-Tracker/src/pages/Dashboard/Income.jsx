import React, { useState,useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';
import IncomeList from '../../components/Income/IncomeList';
import { useUserAuth } from '../../hooks/UseUserAuth';

const Income = () => {
    useUserAuth();
    const [incomeData,setIncomeData]= useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert,setOpenDeleteAlert] =useState({
        show:false,
        data:null,
    });    

    const [OpenAddIncomeModel, setOpenAddIncomeModel] = useState(false);

    // Get All Income Details
    const fetchIncomeDetails = async () => {
        if(loading) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
            // console.log(response.data)
            if(response.data){
                setIncomeData(response.data);
            }
        
        }catch(err){
            console.log(err);

        }finally{
            setLoading(false);
        }
    }

    //Handle Add Income
    const handleAddIncome = async (income) => {
        const {source,amount,date,icon}=income

        if(!source.trim()){
            toast.error("source is required")
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
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
                source,
                amount,
                date,
                icon,
            });
            setOpenAddIncomeModel(false);
            toast.success("Income Added Successfully")
            fetchIncomeDetails();

        } catch (error) {
            console.log("Error adding income",
                error.response?.data?.message || error.message
            );
        }
    }

    //Delete Income
    const deleteIncome = async (id) => {
        try {
        await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

        setOpenDeleteAlert({show:false, data:null})
        toast.success("Income details delete successfully")
        fetchIncomeDetails();
        } catch(err){
            "error deleting income:",
            err.response?.data?.message || err.message
        }
    }

    //handle download income details
    // const handleDownloadIncomeDetails = async () => {
    //     try {
    //         const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
    //             responseType: 'blob',
    //             }
    //         )
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.setAttribute("download","income_details.xlsx")
    //         a.click();
    //         a.parentNode.removeChild(a);
    //         window.URL.revokeObjectURL(url);
    //     }
    //     catch (error) {
    //         console.log("Error downloading income details",
    //             error.response?.data?.message || error.message
    //         );
    //         toast.error("failed to download income details, Please try again later");
    //     }
    // }

    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob',
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
    
            // ✅ Optional: dynamically add current date to filename
            const currentDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
            a.setAttribute("download", `income_details_${currentDate}.xlsx`);
    
            document.body.appendChild(a); // ⬅️ Important for safe DOM manipulation
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
    
            toast.success("Income details downloaded successfully ✅");
        } catch (error) {
            console.error(
                "Error downloading income details:",
                error.response?.data?.message || error.message
            );
            toast.error("Failed to download income details. Please try again later.");
        }
    };
    

    useEffect(() => {
        fetchIncomeDetails();
        return ()=>{}
    }, []);

    return ( 
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={()=>setOpenAddIncomeModel(true)}
                        />
                    </div>
                    <IncomeList 
                        transactions={incomeData}
                        onDelete={(id)=>{
                            setOpenDeleteAlert({show:true, data:id});
                        }}
                        onDownload={handleDownloadIncomeDetails}
                    />
                </div>

                <Modal 
                    isOpen={OpenAddIncomeModel}
                    onClose={()=> setOpenAddIncomeModel(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={()=> setOpenDeleteAlert({show:false, data:null})}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are You Sure You Want Ti Delete This Income Detail ?"
                        onDelete={()=> deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
       </DashboardLayout>
     );
}
 
export default Income;
