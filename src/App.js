import { Outlet } from "react-router-dom";
import MenuAppBar from './components/AppBar'
import './index.css'

function App() {
  return (
    <main>
      <MenuAppBar />
      <section>
        <Outlet />
      </section>
    </main>

  );
}

export default App