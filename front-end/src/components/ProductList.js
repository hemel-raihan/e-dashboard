import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    },[])

    const getProducts = async () => {
        try{
            const token = JSON.parse(localStorage.getItem('token'));

            let response = await axios.get('http://localhost:5000/product-list', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProducts(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const deleteProduct = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/delete-product/${id}`)
            alert('product deleted!')
            getProducts()
        }
        catch(err){
            console.log(err)
        }
    }

    const handleSearchProduct = async (event) => {
        try{
            let key = event.target.value
            if(key){
                let response = await axios.get(`http://localhost:5000/search-product/${key}`)
                if(response){
                    setProducts(response.data)
                }
            }
            else{
                getProducts()
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="productList">
            <h1>Product List</h1>
            <input type="text" className="searchBox" placeholder="Search Product" 
            onChange={handleSearchProduct}
            />
            <Table striped bordered hover size="sm"> 
                <thead> 
                    <tr> 
                    <th width="170">S. No</th> 
                    <th width="170">Name</th> 
                    <th width="170">Price</th> 
                    <th width="870">Category</th> 
                    <th width="1950">Company</th> 
                    <th width="1950">Action</th> 
                
                    </tr> 
                </thead> 
                <tbody>
                    {
                        products.length > 0 ?
                        products.map((item, index) => (  
                            <tr key={item._id}> 
                                <td>{index+1}</td> 
                                <td>{item.name}</td> 
                                <td>{item.price}</td> 
                                <td>{item.category}</td> 
                                <td>{item.company}</td>
                                <td><button><Link to={'/update-product/'+item._id}>update</Link></button></td>
                                <td><button onClick={() => deleteProduct(item._id)}>delete</button></td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td>No Product Found!</td>
                        </tr>
                    } 
                </tbody> 
            </Table> 
        </div>
    )
}

export default ProductList