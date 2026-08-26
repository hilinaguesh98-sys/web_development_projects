import Dish from "./Dish";
import "./App.css"
function Header(){
  return(
    <div className="header">
      <div className="header-text">
      <h1>Addis Eats</h1>
      <p>welcome to addis eats </p></div>
      <nav className="nav-link">
        <a href="#home">home</a>
        <a href="#about">about</a>
        <a href="#order">order</a>
      </nav>
    </div>
  )
}
function App(){
 const menu=[{id:1,name:"kitfo", price:300 ,discription:"good food" },
    {id:2,name:"kitfo",price:300 ,discription:"good food" },
    {id:3,name:"kitfo",price:300 ,discription:"good food" }
  ];
return(
  <>
  <Header/>
   <div className="menu">
        {menu.map((dish) => (
          <Dish key={dish.id}  name={dish.name} price={dish.price} discription={dish.discription}/>
        ))}
      </div>
  </>
 )}
 export default App;