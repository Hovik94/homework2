import { useState } from 'react'

import './App.css'

function App() {
  const [products, setProducts] = useState([
    { id: 101, name: "Psychology", price: 20000, photo: "https://images.booksense.com/images/568/458/9781465458568.jpg" },
    { id: 102, name: "The Sociology", price: 40000, photo: "https://m.media-amazon.com/images/I/81z-Pj9NxjL._AC_UF1000,1000_QL80_.jpg" },
    { id: 103, name: "The Economics", price: 25000, photo: "https://m.media-amazon.com/images/I/81c6E2VdT3L._AC_UF1000,1000_QL80_.jpg" },
    { id: 104, name: "The Biology", price: 60000, photo: "https://cdn.gramedia.com/uploads/items/THE_BIOLOGY_BOOK.jpg" },
    { id: 105, name: "The Poetry", price: 35000, photo: "https://www.adrionltd.com/111216-thickbox_default/the-poetry-book-big-ideas-simply-explained.jpg" },
    { id: 106, name: "The History", price: 30000, photo: "https://m.media-amazon.com/images/I/91liAp+oaQL._AC_UF1000,1000_QL80_.jpg" },
    { id: 107, name: "The Philosophy", price: 45000, photo: "https://m.media-amazon.com/images/I/91AiNeHUoNL._AC_UF1000,1000_QL80_.jpg" },
    { id: 108, name: "The Astronomy", price: 55000, photo: "https://m.media-amazon.com/images/I/81C3hxF-5wL._AC_UF1000,1000_QL80_.jpg" }
  ]);

  const [basket, setBasket] = useState([])

  const moveToCart = prod => {
    const result = basket.find(x => x.id == prod.id)
    if (result) {
      result.count++
      setBasket([...basket])
    } else {
      setBasket([...basket, { ...prod, count: 1 }])
    }
  }

  const quantityUp = prod => {
    const result = basket.find(x => x.id == prod.id)
    if (result)
      setBasket(basket.map(elm =>
        elm.id == prod.id ? { ...elm, count: elm.count + 1 } : elm
      ))
  }

  const quantityDown = prod => {
    const result = basket.find(x => x.id == prod.id)
    if (result) {
      setBasket(basket.map(elm =>
        elm.id === prod.id ? { ...elm, count: Math.max(elm.count - 1, 1) } : elm
      ))
    }
  }


  const deleteItem = prod => {
    const result = basket.find(x => x.id == prod.id)
    if (result)
      setBasket(basket.filter(elm =>
        elm.id !== prod.id
      ))
  }


  return <>
    <h1>Online shop</h1>
    <div className='content'>
      <div>
        <h3>Products</h3>
        <div className='list'>
          {
            products.map(prod => <div key={prod.id}>
              <img src={prod.photo} />
              <p>{prod.name}</p>
              <strong>{prod.price}AMD</strong>
              <button onClick={() => moveToCart(prod)}>move</button>
            </div>)
          }
        </div>
      </div>
      <div>
        <h3>Cart</h3>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>price</th>
              <th>count</th>
              <th>subtotal</th>
              <th>actions</th>
            </tr>

          </thead>
          <tbody>
            {
              basket.map(item => <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.count}</td>
                <td>{item.count * item.price}</td>
                <td>
                  <button onClick={() => quantityUp(item)}>+</button>
                  <button onClick={() => quantityDown(item)}>-</button>
                  <button onClick={() => deleteItem(item)}>x</button>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>

    </div>
  </>
}

export default App
