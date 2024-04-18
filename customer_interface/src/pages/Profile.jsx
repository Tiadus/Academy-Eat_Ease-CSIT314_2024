import { React, useState } from 'react'
import { Sidebar } from '../components/SideBar'
import { Details } from '../components/Details'
import Orders from '../components/Orders';
import Membership from '../components/Membership';
import Payment from '../components/Payment';
import Transactions from '../components/Transactions';
import NavBar from '../components/NavBar';
const Profile = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    // Define a variable to hold the component to render based on selectedOption
    let componentToRender;

    switch (selectedOption) {
        case 'Details':
            componentToRender = <Details />;
            break;
        case 'Orders':
            componentToRender = <Orders />
            break;
        case 'Membership':
            componentToRender = <Membership />
            break;
        case 'Payment':
            componentToRender = <Payment />
            break;
        case 'Transactions':
            componentToRender = <Transactions />;
            break;


        default:
            componentToRender = <Details />;
    }


    return (
        <>
            <NavBar/>
            <div className='flex'>
                <Sidebar onOptionClick={handleOptionClick} />
                <div className='w-full'>
                    {componentToRender}

                </div>
            </div>
        </>
    )
}

export default Profile