import menu from "./Data"
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
 
return(
  <>
  <Header/>
  <h1>our menu</h1>
      <menu category="Main" />
  </>
 );}
 export default App;