// app/dashboard/layout.jsx
import Header from "./_components/Header";

function Dashboardlayout({ children }) {
  return (
    <>
    <Header />
<div className='mx-5 md:mx-20 lg:mx-36'>
  {children}
</div>

    </>
  );
}

export default Dashboardlayout;
