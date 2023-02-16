
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes';

function App() {
  return (
    <div className="max-w-[1240px] mx-auto my-5 bgColor text-black ">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
