import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
// import { eventNames } from '../../../../back-end/src/models/category';
import { addProduct } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/input';
import Modal from '../../components/UI/modal';
import { pictureUrl } from '../../urlConfig';



export default function Products() {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [productDetails,setProductDetail]=useState({});
    const [show, setShow] = useState(false);
    
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product)
    
  
    
    
    const handleShow = () => setShow(true);
    const [productDetailModal,setProductDetailModal]=useState(false);

    const createCategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push(
                {
                    name: category.name,
                    value: category._id
                }
            )
            if (category.children.length > 0) {
                createCategoryList(category.children, option)
            }
        }
        return option;

    }

    const renderProducts = () => {
        return (
            <Table style={{fontSize:12}} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {/* <th>Description</th> */}
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) =>

                                <tr onClick={()=>showProductDetailModal(product)} key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    {/* <td>{product.description}</td> */}
                                    <td>{product.category ? product.category.name:null}</td>

                                </tr>

                            ) :
                            null

                    }


                </tbody>
            </Table>
        );
    }


    const handleClose = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("price", price);
        form.append("quantity", quantity);
        form.append("description", description);
        form.append("category", categoryId);
        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }

        // console.log(product);

        dispatch(addProduct(form));
        setShow(false);
    }

    const showProductDetailModal=(product)=>
    {   setProductDetailModal(true);
        console.log(product);
        setProductDetail(product);
    }
    const handleProductImage = (e) => {
        // {   console.log(e.target.files[0]);
        setProductPictures([...productPictures, e.target.files[0]]);
        // console.log(productPictures);
    }
    // console.log(productPictures);

    const handleCloseProductDetailModal=()=>
    {
        setProductDetailModal(false);
    }

    const renderAddProductModal = () => {
        return (
            <Modal modalTitle="Products" show={show} handleClose={handleClose} >

                <Input
                    value={name}
                    placeholder={"Product Name"}
                    onChange={(e) => setName(e.target.value)} />
                <Input
                    value={price}
                    placeholder={"Price"}
                    type="Number"
                    onChange={(e) => setPrice(e.target.value)} />
                <Input
                    value={quantity}
                    type="Number"
                    placeholder={"Quantity"}
                    onChange={(e) => setQuantity(e.target.value)} />
                <Input
                    value={description}
                    placeholder={"Description"}
                    onChange={(e) => setDescription(e.target.value)} />

                <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option => {
                            return <option key={option.value} name={option.name} value={option.value}>{option.name}</option>
                        })
                    }
                </select>

                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }

                <Input type="file" name="productPitures" onChange={handleProductImage}></Input>
            </Modal>
        );
    };

   

    const renderProductDetailModal=()=>
    {
        return (
            <Modal modalTitle="Products Datail" 
            show={productDetailModal} 
            handleClose={handleCloseProductDetailModal}
            size="lg">

                <Row >
               
                <Col md="6">
                    <label  className="key">Name</label>
                    <p className="value">{productDetails.name}</p>
                </Col>
                <Col md="6">
                    <label className="key">Price</label>
                    <p className="value">{productDetails.price} </p>
                </Col>
                <Col md="6">
                    <label vlassName="key">Quantity</label>
                    <p className="value">{productDetails.quantity}</p>
                </Col>
                <Col md="6">
                    <label className="key">Category</label>
                    {productDetails.category?<p className="value">{productDetails.category.name} </p>:null}
                </Col>
                </Row> 
                <Row>
                <Col md="12">
                    <label className="key">Description</label>
                    <p className="value">{productDetails.description}</p>
                </Col>
                </Row>
                <Row>
                
                <Col md="12">
                    <label className="key">Product Picture</label>
                    {productDetails.productPicture ?<div className="productImageContainer"> {productDetails.productPicture.map(picture=><img src={pictureUrl+picture.img}></img>)} </div> :<p>false</p>}
                    
                </Col>
                </Row>

            

            </Modal>
        );

    }









    return (
        <>

            <Layout sidebar>

                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Product</h3>
                                <button onClick={handleShow}>Add</button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>


                            {renderProducts()}

                        </Col>
                    </Row>
                </Container>

                {renderAddProductModal()}
                {renderProductDetailModal()}


            </Layout>

        </>
    )
}
