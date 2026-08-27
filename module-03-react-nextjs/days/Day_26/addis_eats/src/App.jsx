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
 const menu=[
  {
    id: "item-1",
    name: "Cheese Burger",
    category: "burgers",
    price: 400,
   description: "Juicy beef patty topped with melted cheddar cheese and fresh veggies.",
    ingredients: ["Beef Patty", "Cheddar Cheese", "Lettuce", "Tomato", "Burger Bun", "House Sauce"]
  },
  {
    id: "item-2",
    name: "Beef Burger",
    category: "burgers",
    price: 350,
   
  
    description: "Grilled classic beef patty served with lettuce, tomato, and house sauce.",
    ingredients: ["Beef Patty", "Lettuce", "Tomato", "Pickles", "Burger Bun", "House Sauce"]
  },
  {
    id: "item-3",
    name: "Double Bacon Cheeseburger",
    category: "burgers",
    price: 550,
   description: "Two seasoned beef patties layered with crispy bacon and double cheese.",
    ingredients: ["Beef Patties", "Crispy Bacon", "Cheddar Cheese", "Lettuce", "Burger Bun", "House Sauce"]
  },
  {
    id: "item-4",
    name: "Margherita Pizza",
    category: "pizza",
    price: 500,
   description: "Freshly baked pizza topped with savory tomato sauce and mozzarella cheese.",
    ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella Cheese", "Fresh Basil", "Olive Oil"]
  },
 
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