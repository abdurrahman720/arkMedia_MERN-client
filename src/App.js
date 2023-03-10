
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';

function App() {
  return (
    <div className="max-w-[1240px] border-2 bg-red-50  mx-auto my-5 font-arkFont text-black ">
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center"
  reverseOrder={false}/>
    </div>
  );
}

export default App;
