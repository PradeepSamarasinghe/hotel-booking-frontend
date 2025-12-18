// src/components/BookingOverlay.jsx
import { useState } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';

export default function BookingOverlay({ isOpen, onClose }) {
  // Prevent clicks inside the panel from closing it
  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`fixed inset-0 z-[60] overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* 1. Backdrop (Darkens the background) */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 2. Sliding Panel (Slides from Right) */}
      <div 
        className={`absolute top-0 right-0 h-full w-full md:w-[500px] bg-zinc-900 text-white shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={handlePanelClick}
      >
        <div className="h-full flex flex-col p-8 md:p-12 overflow-y-auto">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Header */}
          <div className="mt-8 mb-12">
            <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase">Reservations</span>
            <h2 className="font-['Playfair_Display'] text-4xl text-white mt-2">Book Your Stay</h2>
          </div>

          {/* Booking Form */}
          <form className="space-y-8 flex-grow" onSubmit={(e) => e.preventDefault()}>
            
            {/* Dates */}
            <div className="space-y-6">
              <div className="group relative border-b border-gray-700 hover:border-[#C5A059] transition-colors pb-2">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1 group-hover:text-[#C5A059] transition-colors">Check In</label>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="date" 
                    className="w-full bg-transparent text-xl text-white focus:outline-none placeholder-transparent calendar-white"
                  />
                </div>
              </div>

              <div className="group relative border-b border-gray-700 hover:border-[#C5A059] transition-colors pb-2">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1 group-hover:text-[#C5A059] transition-colors">Check Out</label>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="date" 
                    className="w-full bg-transparent text-xl text-white focus:outline-none calendar-white"
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="grid grid-cols-2 gap-6">
              <div className="group relative border-b border-gray-700 hover:border-[#C5A059] transition-colors pb-2">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1 group-hover:text-[#C5A059] transition-colors">Adults</label>
                <div className="flex items-center justify-between">
                  <span className="text-xl">2</span>
                  <div className="flex flex-col">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                {/* Invisible select overlay for custom style */}
                <select className="absolute inset-0 opacity-0 cursor-pointer">
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className="group relative border-b border-gray-700 hover:border-[#C5A059] transition-colors pb-2">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1 group-hover:text-[#C5A059] transition-colors">Children</label>
                <div className="flex items-center justify-between">
                  <span className="text-xl">0</span>
                  <div className="flex flex-col">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <select className="absolute inset-0 opacity-0 cursor-pointer">
                  {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {/* Promo Code */}
            <div className="group relative border-b border-gray-700 hover:border-[#C5A059] transition-colors pb-2 pt-4">
               <input 
                 type="text" 
                 placeholder="HAVE A PROMO CODE?" 
                 className="w-full bg-transparent text-sm text-white focus:outline-none tracking-wider placeholder-gray-500"
               />
            </div>

          </form>

          {/* Footer / Action */}
          <div className="mt-auto pt-8">
            <button className="w-full bg-[#C5A059] text-white py-5 px-6 font-semibold tracking-[0.2em] uppercase hover:bg-[#b08d4b] transition-all duration-300">
              Check Availability
            </button>
            <p className="text-center text-gray-500 text-xs mt-4">
              Best Rate Guaranteed • No Booking Fees
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}