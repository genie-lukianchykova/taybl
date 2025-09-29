'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { MdCoffeeMaker } from "react-icons/md";
import classnames from 'classnames';
import { Metadata } from 'next';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/orders", label: "Orders" },
    ]
  
    return (
        <nav className='flex space-x-6 border-b border-zinc-300 mb-5 px-5 h-14 items-center'>
            <Link href="/"><MdCoffeeMaker className='text-2xl' /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => 
                    <Link 
                        key={link.href} 
                        className={classnames({
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors': true
                        })}
                        href={link.href}>
                            {link.label}
                    </Link>
                )}
            </ul>
    </nav>
  )
}

export default NavBar