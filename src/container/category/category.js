// import { Button, Modal } from 'bootstrap';
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategories, getAllCategory, updateCategories } from '../../actions';
import Layout from '../../components/Layout'
import Input from '../../components/UI/input';
import Modal from '../../components/UI/modal';
import CheckboxTree from "react-checkbox-tree"
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoArrowDownCircleSharp, IoArrowUpCircleSharp, IoArrowForwardCircleSharp, IoCheckboxOutline, IoCheckboxSharp } from "react-icons/io5";
// import Header from '../../../../flipcart-clone/src/components/Header';

export default function Category() {

    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [expandedArray, setExpandedArray] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);


    const [show, setShow] = useState(false);

    window.show = show;

    const handleClose = () => {
        setShow(false);
        const form = new FormData();
        form.append("name", categoryName);
        form.append("categoryImage", categoryImage);
        form.append("parentId", parentCategoryId);

        // const cat={
        //     categoryImage,
        //     categoryName,
        //     parentCategoryId
        // };
        // console.log(cat);
        dispatch(addCategory(form));
        setCategoryImage("");
        setCategoryName("");
        setParentCategoryId("");
    }




    const handleShow = () => setShow(true);



    const createCategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push(
                {
                    name: category.name,
                    value: category._id,
                    parentId: category.parentId
                }
            )
            if (category.children.length > 0) {
                createCategoryList(category.children, option)
            }
        }
        return option;

    }
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }


    const renderCategories = (categories) => {
        const myCategories = [];
        for (let category of categories) {
            myCategories.push(

                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)

                }

            );
        }
        return myCategories;

    }

    const addCategoryModal = () => {
        return (
            <Modal modalTitle="Category" show={show} handleClose={handleClose} >

                <Input
                    value={categoryName}
                    placeholder={"Category Name"}
                    onChange={(e) => setCategoryName(e.target.value)} />



                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}>
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option => {
                            return <option key={option.value} name={option.name} value={option.value}>{option.name}</option>
                        })
                    }
                </select>

                {/* {
                productPictures.length > 0 ?
                    productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
            } */}

                <Input type="file" name="categoryPitures" onChange={handleCategoryImage}></Input>
            </Modal>
        );
    }



    const updateCategoriesForm=()=>
    {
        console.log("form is called");
        const form=new FormData();
        
        expandedArray.forEach((item,index)=>
        {
            form.append("name",item.name);
            form.append("parentId",item.parentId ? item.parentId : "");
            form.append("_id",item.value);
            form.append("type",item.type ? item.type :"" );
            
        })
        checkedArray.forEach((item,index)=>
        {
            form.append("name",item.name);
            form.append("parentId",item.parentId ? item.parentId : "");
            form.append("_id",item.value);
            form.append("type",item.type ? item.type :"");
            
        })
        
        dispatch(updateCategories(form)).then(dispatch(getAllCategory()));
        setUpdateCategoryModal(false);

    }

    const deleteCategoriesForm=()=>
    {
        console.log("delete form is called");
        const form=new FormData();
        
        checkedArray.forEach((item,index)=>
        {
            form.append("_id",item.value);      
        })
        
        console.log(form);
        dispatch(deleteCategories(form)).then(dispatch(getAllCategory()));
        console.log("deleted category form is called");
        setDeleteCategoryModal(false);

    }





    const renderUpdateCategoryModal = () => {
        return (
            <Modal size="lg" modalTitle="Update Categories" show={updateCategoryModal} handleClose={updateCategoriesForm} >
                <Row>
                    <Col><h6>Expanded </h6> </Col>
                </Row>
                {
                    expandedArray.length>0 && expandedArray.map((item,index)=>
                    {
                        return (
                            <Row key={index}>
                                <Col >
                                    <Input
                                        value={item.name}
                                        placeholder={"Category Name"}
                                        onChange={(e) => handleCategoryInput("name",e.target.value,index,"expanded")} />
                                </Col>
                            
                                <Col style={{margin:"auto"}}>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput("parentId",e.target.value,index,"expanded")}>
                                        <option value="">Select Category</option>
                                        <option value="none" name="none">None</option>
                                        {
                                            createCategoryList(category.categories).map(option => {
                                                return <option key={option.value} name={option.name} value={option.value}>{option.name}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                                <Col   style={{margin:"auto"}}>
                                    <select className="form-control"
                                    value={item.type?item.type:""}
                                    onChange={(e) => handleCategoryInput("type",e.target.value,index,"expanded")}>
                                    
                                    
                                        <option value="">Select type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                
                             </Row>
                        );
                    })
                }

                <Row>
                    <Col>Checked Category</Col>
                </Row>
                {
                    checkedArray.length>0 && checkedArray.map((item,index)=>
                    {
                        return (
                            <Row key={index}>
                                <Col >
                                    <Input
                                        value={item.name}
                                        placeholder={"Category Name"}
                                        onChange={(e) => handleCategoryInput("name",e.target.value,index,"checked")} />
                                </Col>
                            
                                <Col >
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput("parentId",e.target.value,index,"checked")}>
                                        <option value="">Select Category</option>
                                        <option value="none" name="none">None</option>
                                        {   
                                            createCategoryList(category.categories).map(option => {
                                                return <option key={option.value} name={option.name} value={option.value}>{option.name}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                                <Col  >

                                    <select className="form-control"
                                    value={item.type?item.type:""}
                                    onChange={(e) => handleCategoryInput("type",e.target.value,index,"checked")}>
                                    
                                    
                                        <option value="">Select type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                
                             </Row>
                        );
                    })
                }
               







                {/* {
                productPictures.length > 0 ?
                    productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
            } */}

                {/* <Input type="file" name="categoryPitures" onChange={handleCategoryImage}></Input> */}
            </Modal>
        );

    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal size="lg" modalTitle="delete Categories" show={deleteCategoryModal} handleClose={deleteCategoriesForm} >
             
                {/* {
                    expandedArray.length>0 && expandedArray.map((item,index)=>
                    {
                        return (
                            <Row key={index}>
                                <Col >
                                    <Input
                                        value={item.name}
                                        placeholder={"Category Name"}
                                        onChange={(e) => handleCategoryInput("name",e.target.value,index,"expanded")} />
                                </Col>
                            
                                <Col style={{margin:"auto"}}>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput("parentId",e.target.value,index,"expanded")}>
                                        <option value="">Select Category</option>
                                        <option value="none" name="none">None</option>
                                        {
                                            createCategoryList(category.categories).map(option => {
                                                return <option key={option.value} name={option.name} value={option.value}>{option.name}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                                <Col   style={{margin:"auto"}}>
                                    <select className="form-control"
                                    value={item.type?item.type:""}
                                    onChange={(e) => handleCategoryInput("type",e.target.value,index,"expanded")}>
                                    
                                    
                                        <option value="">Select type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                
                             </Row>
                        );
                    })
                } */}

                <Row>
                    <Col>Checked Category</Col>
                </Row>
                {
                    checkedArray.length>0 && checkedArray.map((item,index)=>
                    {
                        return (
                            <Row key={index}>
                                <Col >
                                    <Input
                                        value={item.name}
                                        placeholder={"Category Name"}
                                        onChange={(e) => handleCategoryInput("name",e.target.value,index,"checked")} />
                                </Col>
                            
                                <Col >
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput("parentId",e.target.value,index,"checked")}>
                                        <option value="">Select Category</option>
                                        <option value="none" name="none">None</option>
                                        {   
                                            createCategoryList(category.categories).map(option => {
                                                return <option key={option.value} name={option.name} value={option.value}>{option.name}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                                <Col  >

                                    <select className="form-control"
                                    value={item.type?item.type:""}
                                    onChange={(e) => handleCategoryInput("type",e.target.value,index,"checked")}>
                                    
                                    
                                        <option value="">Select type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                
                             </Row>
                        );
                    })
                }
               







                {/* {
                productPictures.length > 0 ?
                    productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
            } */}

                {/* <Input type="file" name="categoryPitures" onChange={handleCategoryImage}></Input> */}
            </Modal>
        );

    }

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        const checkedArray=[];
        const expandedArray=[];
        // console.log(categories);
        checked.length >0 && checked.forEach((categoryId,index)=>
        {
            const category=categories.find((category,_index)=> {
            // {   console.log(categoryId,category._id);
               if( categoryId==category.value)
               {
                   return category;
               }
            })
            category && checkedArray.push(category);
            // console.log("inside checked");
            // console.log(category);
        });
        expanded.length >0 && expanded.forEach((categoryId,index)=>
        {
            const category=categories.find((category,_index)=> categoryId==category.value);
            category && expandedArray.push(category);
            // console.log("inside expanded");
            // console.log(category);
        });
        setExpandedArray(expandedArray);
        setCheckedArray(checkedArray);
        console.log(checked, expanded,categories, checkedArray,expandedArray);
    }
    const deleteCategory = () => {
        setDeleteCategoryModal(true);
        const categories = createCategoryList(category.categories);
        const checkedArray=[];
        const expandedArray=[];
        // console.log(categories);
        checked.length >0 && checked.forEach((categoryId,index)=>
        {
            const category=categories.find((category,_index)=> {
            // {   console.log(categoryId,category._id);
               if( categoryId==category.value)
               {
                   return category;
               }
            })
            category && checkedArray.push(category);
            // console.log("inside checked");
            // console.log(category);
        });
        expanded.length >0 && expanded.forEach((categoryId,index)=>
        {
            const category=categories.find((category,_index)=> categoryId==category.value);
            category && expandedArray.push(category);
            // console.log("inside expanded");
            // console.log(category);
        });
        setExpandedArray(expandedArray);
        setCheckedArray(checkedArray);
        console.log(checked, expanded,categories, checkedArray,expandedArray);
    }

    // handling input for updated category
    const handleCategoryInput=(key,value,index,type)=>
    {
        if(type==="checked")
        {
            const updatedCheckedArray = checkedArray.map((item,_index)=>
            
                index==_index ? {...item,[key]:value}:item
            )
            console.log("checked array is :-");
            console.log(updatedCheckedArray);
            setCheckedArray(updatedCheckedArray);
        }
        else if(type==="expanded")
        {
            const updatedExpandedArray = expandedArray.map((item,_index)=>
            
            index==_index ? {...item,[key]:value}:item
        )
        console.log("expanded array is :-");
        console.log(updatedExpandedArray);
        setExpandedArray(updatedExpandedArray);
        }
    }



    return (

        <>

            <Layout sidebar>

                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Category</h3>
                                <button onClick={handleShow}>Add</button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>

                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={
                                    {
                                        uncheck: <IoCheckboxOutline />,
                                        check: <IoCheckboxSharp />,
                                        halfCheck: <IoCheckboxOutline />,
                                        expandClose: < IoArrowForwardCircleSharp />,
                                        expandOpen: <IoArrowDownCircleSharp />
                                    }
                                }

                            />
                            <Row>
                                <Col>
                                    <button onClick={deleteCategory}>Delete</button>
                                    <button onClick={updateCategory}>Update</button>
                                </Col>
                            </Row>


                        </Col>
                    </Row>
                </Container>

                {addCategoryModal()}
                {renderUpdateCategoryModal()}
                {renderDeleteCategoryModal()}
            </Layout>

        </>



    );


}
