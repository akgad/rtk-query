import { useState } from 'react'

import { useGetGoodsQuery,useAddProductsMutation,useDeleteProductsMutation } from './redux/goodsApi'

import './App.css'

function App() {
    const [count, setCount] = useState('')
    const [text, setText] = useState('')
    const {data = [], isLoading} = useGetGoodsQuery(count)
    const [addProduct, {isError}] = useAddProductsMutation()
    const [deleteProduct] = useDeleteProductsMutation()

    const handleBtnAddProduct = async () => {
        if(text) {
            await addProduct({name: text}).unwrap()
        }
        setText('')
    }

    const handleBtnDelteProduct = async (id) => {
            await deleteProduct(id).unwrap()
    }

    if(isLoading) return <h1>Loading....</h1>
    return (
        <div className="App">
            <h1>Base use RTK Query</h1>
            <h3>CRUD on json server without PUT request</h3>
            <div>
                <input type='text' value={text} onChange={e => setText(e.target.value)}/>
                <button onClick={handleBtnAddProduct}>Add product</button>
            </div>

            <div>
                <select value={count} onChange={e => setCount(e.target.value)}>
                    <option value=''>All</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
            </div>
            <ul>
                {data.map(({id,name}) => (
                    <li key={id} className='item'>
                        {name}
                        <span className='close' onClick={() => handleBtnDelteProduct(id)}>&times;</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
