import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className='bg-black border-b fixed w-full top-0 z-40 backdrop-blur-lg'>

      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-center gap-8 h-full">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-100 opacity-90 transition-all">
            <div className="size-9 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Connectify</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
