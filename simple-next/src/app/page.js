/*
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
*/

import Link from 'next/link';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col'>
        HomePage
        <Link href="/login" className='mt-5'>Login Here</Link>
      </div>
    </main>
  );
}
