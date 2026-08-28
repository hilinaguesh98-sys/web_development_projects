function Dish({name,price,discription}){
    return(
        <div className="dish">
            <p>Name:{name}</p>
            <p>price: {price}</p>
            <p>Discription: {discription}</p>
            <p>ingr: {discription}</p>
        </div>
    );}
export default Dish;