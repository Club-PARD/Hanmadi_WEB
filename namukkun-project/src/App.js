import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import KaKaoLogin from './Components/Login_Components/KaKaoLogin';
import ListPage from './Pages/ListPage';
import SelectRegionPage from './Pages/SelectRegionPage';
import Header from './Components/Layout_Components/Header';
import NotFound from './Pages/NotFound';

//Pages 폴더로부터 컴포넌트를 가져와서 라우터 연결  
function App() {
  return (
    <Routes>  
      <Route element={<Header/>}>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/list' element={<ListPage/>}/>
      </Route>
      <Route path='/login/oauth2/code/kakao' element={<KaKaoLogin/>}/>
      <Route path='/selectregion' element={<SelectRegionPage/>}/>
      <Route path="/*" element={<NotFound/>} />
    </Routes>

  );
}

export default App;
