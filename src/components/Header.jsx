'use client'; 
import React from 'react';
import Image from 'next/Image'
import Logo from '../../public/logo.png';
const AnimatedHeader = () => {
  return (
    <header className="chatbot-header">
        <Image src={Logo} width={50} height={50} alt='Logo'></Image>
      </header>
  );
};

export default AnimatedHeader;
