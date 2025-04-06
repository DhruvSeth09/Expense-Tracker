import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';


// const DashboardLayout = ({children, activeMenu}) => {
//     const {user} = useContext(UserContext)
//     return ( 
//         <div>
//             <Navbar activeMenu={activeMenu} />
//             {user && (
//                 <div className="flex">
//                     <div className="max-[1080px]:hidden">
//                         <SideMenu activeMenu={activeMenu}/>
//                     </div>
//                     <div className='grow mx-5'>
//                         {children}
//                     </div>
//                 </div>
//             )}
//         </div>
//      );
// }

const DashboardLayout = ({children, activeMenu}) => {
    const { user } = useContext(UserContext);
    return ( 
        <div className="bg-gray-50 min-h-screen">
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="flex">
                    {/* Desktop Sidebar */}
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <main className='grow px-4 py-6'>
                        {children}
                    </main>
                </div>
            )}
        </div>
    );
};

 
export default DashboardLayout;