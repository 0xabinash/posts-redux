import { Outlet } from 'react-router-dom';
import { Suspense } from "react";
import Header from './Header';
 
const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<h2>Loading...</h2>}>
        <main className="App">
          <Outlet />
        </main>
      </Suspense>  
    </>
  );
};

export default Layout;
