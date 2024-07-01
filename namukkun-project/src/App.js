import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import MainPage from './Pages/MainPage';
=======
import HomePage from './Pages/HomePage';
import KaKaoLogin from './Components/Login_Components/KaKaoLogin';
>>>>>>> develop

//Pages 폴더로부터 컴포넌트를 가져와서 라우터 연결  
function App() {
  return (
    <Routes>  
<<<<<<< HEAD
      <Route path='/' element={<MainPage/>}/>
=======
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login/oauth2/code/kakao' element={<KaKaoLogin/>}/>
>>>>>>> develop
    </Routes>

  );
}

export default App;
