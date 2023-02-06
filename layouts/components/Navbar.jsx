import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";




const Navbar = () => {
    {/**set functionality for nav */ }
    const [nav, setNav] = useState(false)
    const [color, setColor] = useState('transparent')
    const [textColor, setTextColor] = useState('black')
    const router = useRouter()


    const handlenav = () => {
        setNav(!nav)
    };
    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 90) {
                setColor('transparent')
                setTextColor('#00005C')
            }
            else {
                setColor('transparent')
                setTextColor('black')
            }
        }
        window.addEventListener('scroll', changeColor)
    }, [])

    return (
        <div>

            <div style={{ backgroundColor: `${color}` }} className="fixed left-0 right-0 w-[100%] z-10 mb-5">

                <div className="max-w-[1240px] m-auto flex justify-between mt-2 items-center px-4 py-1">

                    <Link href="/">
                        <img src='images/logo.png' alt='logo' className='font-bold text-4xl text-gold w-[75%] h-[30px]'></img>
                    </Link>
                    <ul className=' hidden sm:flex text-md text-black'>
                        <li className='group transition-all duration-300 ease-in-out p-4 hover:text-gold'>
                            <Link className='' href='create-order'>Create Order</Link>
                        </li>
                        <li className='group transition-all duration-300 ease-in-out p-4 hover:text-gold'>
                            <Link className='' href='update-order'>Update Order</Link>
                        </li>
                        <li className='group transition-all duration-300 ease-in-out p-4 hover:text-gold'>
                            <Link className='' href='confirm-order'>Confirm Order</Link>
                        </li>
                        <li className='group transition-all duration-300 ease-in-out p-4 hover:text-gold'>
                            <Link className='' href='orders-overview'>All Orders</Link>
                        </li>
                        {/**Button contact me */}
                        {/**<Link href="contact" className='text-gray-300 px-2 py-3 text-lg border-2 font-sm border-gold rounded-2xl hover:text-navyBlue hover:bg-gold '>Download CV</Link>*/}
                    </ul>
                    {/**mobile button and ui dropdown */}
                    <div onClick={handlenav} className="sm:block sm:hidden z-10">
                        {nav ? <AiOutlineClose size={22} style={{ color: `${textColor}` }} /> : <AiOutlineMenu size={22} style={{ color: `${textColor}` }} />}
                    </div>
                    {/**Mobile Menu */}
                    <div className={nav ?
                        'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center w-2/3 h-[115vh]  bg-blue-900 opacity-90 text-left ease-in duration-300'
                        :
                        'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex flex-col justify-center bg-blue-900 opacity-90 items-center w-2/3 h-[115vh] p-6 ease-in  duration-300'}>
                        <h1 className='py-5 mt-2 text-2xl text-bold text-start px-5'></h1>
                        <div className="my-4  pb-4">
                            <div className="flex flex-col mb-2 justify-start items-center gap-4 pl-7">
                                <ul>

                                    <li onClick={handlenav} className='group transition-all duration-300 ease-in-out p-3 text-lg font-thin hover:text-gold cursor-pointer  '>
                                        <Link className='text-white' href="#createOrder">Create Order</Link>
                                    </li>
                                    <li onClick={handlenav} className='group transition-all duration-300 ease-in-out p-3 text-lg font-thin  hover:text-gold after:under'>
                                        <Link className='text-white' href="#updateOrder">Update Order</Link>
                                    </li>
                                    <li onClick={handlenav} className='group transition-all duration-300 ease-in-out p-3 text-lg font-thin  hover:text-gold'>
                                        <Link className='text-white' href="#confirmOder">Confirm Order</Link>
                                    </li>
                                    <li onClick={handlenav} className='group transition-all duration-300 ease-in-out p-3 text-lg font-thin  hover:text-gold'>
                                        <Link className='text-white' href="#viewAllOrders">View all Orders</Link>
                                    </li>
                                </ul>
                                {/*</div>*/}
                            </div>

                        </div>
                    </div>
                    <Web3Button
                        className="p-20"
                        icon="show"
                        label="Connect Wallet"
                        balance="hide"
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar

