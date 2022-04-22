import React, { Fragment,useEffect,useState} from "react";
import {Redirect} from "react-router-dom";
//import "./Cart.css";
import OrderDetails from "./OrderDetails";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails} from "../../actions/orderAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import moment from 'moment';
import {ListGroup} from "react-bootstrap";
import { Spinner, Row, Col, Image } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

export const Mypurchases = ({history}) =>
{
    const {user} = useSelector((state)=> state.auth);
    const {orderItems,ordersCount} = useSelector((state) => state.getorder);
    const email = user && user.length && user[0].email;
    const [resultsperpage,setResultsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const alert = useAlert();
    const {currency} = useSelector(state => state.currency);
    useEffect(() => {
      if(email)
      {
        dispatch(getOrderDetails(email,resultsperpage,currentPage));
      }
      }, [dispatch,email,resultsperpage,currentPage]);
      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
      const orderHandler = () => {
    
        history.push("/products");
      };
return (
    <Fragment>
        {orderItems && orderItems.length === 0  ?(
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No orders placed yet</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ): (<Fragment>
         {
               orderItems && orderItems.length ? orderItems.map(item =>
                        <ListGroup key={item._id} className="order_item">
                          <ListGroup.Item className="order_item_heading">Date: {moment(item.orderdate).format('DD MMM YYYY')} <span className="total">Total: {currency} {item.totalprice}</span> <span className="order_id">Order ID: {item._id}</span></ListGroup.Item>
                          {item.orderdetails && item.orderdetails.length ? <ListGroup.Item>
                                <Row style={{textAlign: 'center', fontWeight: 'bold'}}>
                                    <Col xs={2}>
                                        Image
                                    </Col>
                                    <Col xs={2}>Product Name</Col>
                                    <Col xs={4}>Gift</Col>
                                    <Col xs={2}>Product Qty</Col>
                                    <Col xs={2}>Product Total</Col>
                                    
                                </Row>
                            </ListGroup.Item> : ''
                          }
                          {item.orderdetails && item.orderdetails.map(orderdetail => 
                            <ListGroup.Item key={orderdetail.product}>
                                <Row style={{textAlign: 'center'}}>
                                    <Col xs={2}  style={{cursor: 'pointer'}}>
                                        <Image src={orderdetail.image_URL} style={{objectFit: 'cover', width: '50px', height: '50px', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />
                                    </Col>
                                    <Col xs={2}><Link style={{color:'black'}} to ={`/product/${orderdetail.product}`}>{orderdetail.productname}</Link></Col>
                                    {orderdetail && orderdetail.giftoption === true ? 
                                    <Col xs={4} style={{color:'tomato'}}>This product wrapped as a gift <br></br> Giftmessage : {orderdetail.giftdescription} </Col> :
                                    <Col xs={4} style={{color:'black'}}>This product not selected  as a gift </Col>}
                                    <Col xs={2}>{orderdetail.quantity}</Col>
                                    <Col xs={2}>{currency} {orderdetail.price * orderdetail.quantity}</Col>
                                </Row>
                            </ListGroup.Item>
                            )
                          }
                        </ListGroup>
                    ) :
                    <p>No Purchases found</p>
            }
          <div className="currency">
            <select
  value={resultsperpage}
  name='orderperpage'
  onChange={e => setResultsPerPage(e.target.value)}>
  <option value="null">Selectordersperpage</option>
  <option value="2">2</option>
  <option value="5">5</option>
  <option value="10">10</option>
</select>
</div>
         {resultsperpage < ordersCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsperpage}
                totalItemsCount={ordersCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
              <div className="checkOutBtn">
              <button type="submit" onClick={orderHandler}>Continue Shopping</button>
              </div>
              
    </Fragment>)
    }
    </Fragment>
    );
}

export default Mypurchases;