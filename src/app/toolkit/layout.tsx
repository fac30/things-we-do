'use client'
import Header from '../../ui/layout/ToolkitHeader';

export default function Page({children} : {children: React.ReactNode}) {
  return (
    <div>
     <div>
      <Header />
    </div>
    <div>{children}</div>
    </div>
    
  );
}
