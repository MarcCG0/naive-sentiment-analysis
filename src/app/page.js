import React from 'react';
import Header from '../components/Header'
import Chat from '../components/Chat'
const Home = () => {
  return (
    <div
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                 bg-cover bg-no-repeat bg-center h-screen w-screen"
      style={{
        backgroundImage: `url('/background.jpg')`
      }}
    >
      <Header></Header>
      <Chat></Chat>
    </div>
  );
};

export default Home;
