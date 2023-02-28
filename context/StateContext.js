import React ,{createContext,useContext,useState,useEffect} from 'react'
import {toast } from "react-hot-toast"


const Context = createContext()
 
 export  const StateContext = ({children}) => {
    

    const [showCart, setShowcart] = useState(false);
    const [cartItem, setcartItem] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty, setqty] = useState(1)


  let foundProduct;
  let index;
    const onAdd = (product,quantity) => {

      const checkProductInCart = cartItem.find((item) => item._id === product._id);
      settotalPrice((prevtotalprice)  => prevtotalprice + product.price*quantity);
      settotalQuantities((prevtotalquantities) => prevtotalquantities +quantity )
      
      if(checkProductInCart){

        const updatedCartItems =cartItem.map((cartproduct)=>{
          if(cartproduct._id===product._id) return {
                ...cartproduct,
                quantity: cartproduct.quantity + quantity
          }
        }) 
        setcartItem(updatedCartItems)
      }
      else{
        product.quantity=quantity;
        setcartItem([...cartItem,{...product}])
        
      }
      toast.success(`${qty} ${product.name} added to the cart`)
    }
       
    const onRemove = (product)=>{
      foundProduct = cartItem.find((item) => item._id === product._id);
      const newCartItems = cartItem.filter((item) => item._id !== product._id)
      settotalPrice((prevprice) => prevprice-foundProduct.price*foundProduct.quantity)
      settotalQuantities((prevquant)=> prevquant-foundProduct.quantity)
      setcartItem(newCartItems)
    }






    const toggleCartItemQuanitity = (id, value) => {
      foundProduct = cartItem.find((item) => item._id === id)
      index = cartItem.findIndex((product) => product._id === id);
      const newCartItems = cartItem.filter((item) => item._id !== id)
  
      if(value === 'inc') {
        setcartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
        settotalPrice((prevtotalPrice) => prevtotalPrice + foundProduct.price)
        settotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if(value === 'dec') {
        if (foundProduct.quantity > 1) {
          setcartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
          settotalPrice((prevtotalPrice) => prevtotalPrice - foundProduct.price)
          settotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
      }
    }


    const inQty = () => {
      setqty((prev) => prev + 1);
      
    } 
    const deQty = () => { 
      setqty((prev) => {
        if(prev -1 < 1) return prev;
        return prev -1

      });

    } 

  return (
    <Context.Provider
        value={{
            showCart,
            totalPrice,
            cartItem,
           totalQuantities,
            qty,
            setShowcart,
            inQty,
            deQty,
            onAdd,
            onRemove,
            setShowcart,
            settotalPrice,
            settotalQuantities,
            setcartItem,
            toggleCartItemQuanitity
        }
             
        }
    >
            {children}

    </Context.Provider>
  )
} 
 
export const  useStateContext = () => useContext(Context); 