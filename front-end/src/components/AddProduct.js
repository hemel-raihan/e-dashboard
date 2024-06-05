import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const addProduct = async () => {
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        try{
            const userId = JSON.parse(localStorage.getItem('user')).data._id
            const response = await axios.post('http://localhost:5000/add-product', {
                name, price, category, company, userId
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response){
                navigate('/')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="addProduct">
            <h1>Add product Page</h1>
            <input className="inputBox" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Product Name" />
            {error && !name && <span className="errorMsg">Enter Valid Name</span>}

            <input className="inputBox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Product Price" />
            {error && !price && <span className="errorMsg">Enter Valid Price</span>}

            <input className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Product Category" />
            {error && !category && <span className="errorMsg">Enter Valid Category</span>}

            <input className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Product Company" />
            {error && !company && <span className="errorMsg">Enter Valid Company</span>}

            <button className="appButton" onClick={addProduct} type="button">Add Product</button>
        </div>
    )
}

export default AddProduct