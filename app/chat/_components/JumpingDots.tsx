import React from 'react'

export default function JumpingDots() {
  return (
    <div className='flex justify-center items-center rounded-xl gap-2 bg-blue-600 px-3 py-3 w-fit'>
      <div className='w-[10px] h-[10px] rounded-full bg-white animate-bounce'></div>
      <div className='w-[10px] h-[10px] rounded-full bg-white animate-bounce'></div>
      <div className='w-[10px] h-[10px] rounded-full bg-white animate-bounce'></div>
    </div>
  )
}
