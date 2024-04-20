import AllShoes from "../Shoes/AllShoes";
import CategoriesIndex from "../Categories/CategoriesIndex";
import './MainPage.css'

function MainPage() {
    return (
      <>
        <div id="main-page">
          <h1>Best Sellers</h1>
          <CategoriesIndex />
          <AllShoes />
        </div>
      </>
    );
  }
  
  export default MainPage;