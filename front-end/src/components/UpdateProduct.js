import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)

    const params = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getProductDetails()
    },[])

    const getProductDetails = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/get-product/${params.id}`)
            const result = response.data
            setName(result.name)
            setPrice(result.price)
            setCategory(result.category)
            setCompany(result.category)
        }
        catch(err){
            console.log(err)
        }
    }

    const updateProduct = async () => {
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }
        try{
            const userId = JSON.parse(localStorage.getItem('user')).data._id
            const response = await axios.put(`http://localhost:5000/update-product/${params.id}`, {
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
            <h1>Update product Page</h1>
            <input className="inputBox" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Product Name" />
            {error && !name && <span className="errorMsg">Enter Valid Name</span>}

            <input className="inputBox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Product Price" />
            {error && !price && <span className="errorMsg">Enter Valid Price</span>}

            <input className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Product Category" />
            {error && !category && <span className="errorMsg">Enter Valid Category</span>}

            <input className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Product Company" />
            {error && !company && <span className="errorMsg">Enter Valid Company</span>}

            <button className="appButton" onClick={updateProduct} type="button">Update Product</button>
        </div>
    )
}

export default UpdateProduct