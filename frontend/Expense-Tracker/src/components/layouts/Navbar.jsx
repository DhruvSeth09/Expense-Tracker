import React, { useState } from 'react';
import { HiOutlineMenu , HiOutlineX} from "react-icons/hi";
import SideMenu from './SideMenu';

// const Navbar = ({activeMenu}) => {
//     const [openSideMenu, setOpenSideMenu] = useState(false);
//     return ( 
//         <div className='flex bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 gap-4'>
//             <button 
//                 className="block lg:hidden text-black"
//                 onClick={()=>{
//                     setOpenSideMenu(!openSideMenu);
//                 }}
//             >
//                 {openSideMenu ? (
//                     <HiOutlineX className='text-2xl'/>
//                 ):(
//                     <HiOutlineMenu className='text-2xl'/>
//                 )}
//             </button>

//             <h2 className='text-xl font-bold text-black'>Expense Tracker</h2>

//             {openSideMenu && (
//                 <div className='fixed top-[61px] -ml-4 bg-white'>
//                     <SideMenu activeMenu={activeMenu} />
//                 </div>
//             )}
//         </div>
//      );
// }

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return ( 
        <header className='flex bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm py-4 px-6 sticky top-0 z-40 items-center justify-between'>
            <div className="flex items-center gap-4">
                <button 
                    className="block lg:hidden text-gray-800"
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                >
                    {openSideMenu ? <HiOutlineX className='text-2xl'/> : <HiOutlineMenu className='text-2xl'/>}
                </button>
                <h2 className='text-xl font-bold text-black tracking-wide'>
                    💸 Expense Tracker
                </h2>
            </div>

            {/* Mobile Sidebar */}
            {openSideMenu && (
                <div className='fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white shadow-lg animate-slide-in z-50'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </header>
    );
};

 
export default Navbar;