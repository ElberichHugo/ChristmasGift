
import React from 'react';
import { AppState } from '../types';

interface GiftBoxProps {
  state: AppState;
  onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ state, onOpen }) => {
  const isOpening = state === AppState.OPENING || state === AppState.OPENED;

  return (
    <div 
      className={`relative w-64 h-64 md:w-80 md:h-80 cursor-pointer perspective transition-all duration-700 ${state === AppState.OPENED ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      onClick={state === AppState.CLOSED ? onOpen : undefined}
    >
      {/* Box Shadow */}
      <div className="absolute inset-0 bg-black/30 blur-2xl rounded-full translate-y-20 scale-x-125 pointer-events-none" />

      {/* Main Box Body */}
      <div className="absolute inset-0 bg-red-600 rounded-sm border-4 border-red-700 shadow-2xl overflow-hidden flex items-center justify-center">
        {/* Ribbon Vertical */}
        <div className="absolute inset-y-0 w-12 bg-yellow-400 left-1/2 -translate-x-1/2 shadow-inner" />
        {/* Ribbon Horizontal */}
        <div className="absolute inset-x-0 h-12 bg-yellow-400 top-1/2 -translate-y-1/2 shadow-inner" />
        
        {/* Decorative Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap gap-4 p-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="text-white text-2xl">❄</div>
          ))}
        </div>
      </div>

      {/* Lid */}
      <div 
        className={`absolute -top-4 -left-2 -right-2 h-16 bg-red-500 rounded-t-md border-b-4 border-red-700 shadow-lg transition-all duration-700 ease-out z-10 flex items-center justify-center
          ${isOpening ? '-translate-y-64 -rotate-12 opacity-0' : 'translate-y-0 rotate-0'}
        `}
      >
        <div className="absolute inset-y-0 w-12 bg-yellow-400 left-1/2 -translate-x-1/2 shadow-inner" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24">
           {/* Bow */}
           <div className="absolute w-12 h-12 bg-yellow-500 rounded-full left-0 border-4 border-yellow-600 -rotate-45" />
           <div className="absolute w-12 h-12 bg-yellow-500 rounded-full right-0 border-4 border-yellow-600 rotate-45" />
        </div>
      </div>

      {/* Shake Animation for Closed State */}
      {state === AppState.CLOSED && (
        <style>{`
          @keyframes box-shake {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(-3deg) scale(1.02); }
            75% { transform: rotate(3deg) scale(1.02); }
          }
          .perspective:hover {
            animation: box-shake 0.5s infinite ease-in-out;
          }
        `}</style>
      )}
    </div>
  );
};

export default GiftBox;
