import AllShoes from "../Shoes/AllShoes";
import NavBar from "../NavBar/NavBar";
import './MainPage.css'

function MainPage() {
    return (
      <>
        <div id="main-page">
          <NavBar />
          <h1>Best Sellers</h1>
          <AllShoes />
        </div>
      </>
    );
  }
  
  export default MainPage;