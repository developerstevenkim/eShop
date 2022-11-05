import Typography from '@mui/material/Typography/Typography';
import { useState, useEffect } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../models/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  function addProduct() {
    setProducts(prevState =>
      [...prevState, 
        {id: prevState.length + 101,
        name: 'product' + (prevState.length+1),
        description: 'some description',
        price: (prevState.length*100+100),
        pictureUrl: 'http://poicsum.photos/200',
        brand: 'some description'}
      ])
    }
  return (
    <>
      <Typography variant='h1'>E-Shop</Typography>
      <Catalog products={products} addProduct={addProduct}/>
    </>
  );
}

export default App;
