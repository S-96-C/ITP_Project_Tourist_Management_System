import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

//get data
function PackageUpdate() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [includes, setincludes] = useState("");
  const [description, setdescription] = useState("");
  const [MasterChefFoodsPrice, setMasterChefFoodsPrice] = useState("");
  const [HighLuxaryVechilePrice, setHighLuxaryVechilePrice] = useState("");
  const [PerExtraOneDayPrice, setPerExtraOneDayPrice] = useState("");
  const [RentCameraPrice, setRentCameraPrice] = useState("");
  const [PerExtraBedPrice, setPerExtraBedPrice] = useState("");
  const [Image, setImage] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState({ myFile: "" });
  const [packages, setPackages] = useState([]);

  let [errors_dname, seterrors_dname] = useState("");
  let [errors_location, seterrors_location] = useState("");
  let [errors_noe, seterrors_noe] = useState("");
  let [errors_since, seterrors_since] = useState("");
  let [errors_description, seterrors_description] = useState("");
  let [errors_cnumber, seterrors_cnumber] = useState("");

  const id = window.sessionStorage.getItem("packageID");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/PackageManagement/${id}`)
      .then((response) => {
        //   console.log(response.data);
        setName(response.data.CName);
        setPrice(response.data.price);
        setincludes(response.data.includes);
        setdescription(response.data.description);
        setMasterChefFoodsPrice(response.data.MasterChefFoodsPrice);
        setHighLuxaryVechilePrice(response.data.HighLuxaryVechilePrice);
        setPerExtraOneDayPrice(response.data.PerExtraOneDayPrice);
        setRentCameraPrice(response.data.RentCameraPrice);
        setPerExtraBedPrice(response.data.PerExtraBedPrice);
        setImage(response.data.Image);
        setPackages(response.data);
        console.log(response.data);
      });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: 50,
    },
    paper: {
      padding: theme.spacing(5),
      margin: "auto",
      maxWidth: 1000,
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  function updatePackage() {
  
    axios
      .patch(`http://localhost:3000/PackageManagement/${id}`, {
        name: name,
        price: price,
        includes: includes,
        description: description,
        MasterChefFoodsPrice: MasterChefFoodsPrice,
        HighLuxaryVechilePrice: HighLuxaryVechilePrice,
        PerExtraOneDayPrice: PerExtraOneDayPrice,
        RentCameraPrice: RentCameraPrice,
        PerExtraBedPrice: PerExtraBedPrice,
        Image: postImage.myFile,
      })
      .then((response) => {
        setLoading(false);
        swal(
          "Good job!",
          "Your data has been successfully Updated..!",
          "success"
        );
        // window.location.reload();
        history.push("/PackageView");
      })
      .catch((error) => {
        setLoading(false);
        alert("Sorry, Something Error...");
        swal("Sorry!", "Something Error..!", "warning");
      });
    // }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // setPostImage({ ...postImage, myFile: base64 });
    setPostImage({ myFile: base64 });
    // console.log(base64);
  };

  return (
    <div>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <div className="app-header header-shadow">
          <div className="app-header__logo">
            {/* <img src={logo} style={{ width: 110 }} /> */}
            <a href="/" className="mm-active" style={{ textDecoration: "none" }}>
            <div>
              <h3><span style={{  color: "black" }}>Travel</span><span style={{  color: "red" }}>Aspire</span> </h3>
            </div>
            </a>
            <div className="header__pane ml-auto">
              <div>
                <button
                  type="button"
                  className="hamburger close-sidebar-btn hamburger--elastic"
                  data-class="closed-sidebar"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="app-header__mobile-menu">
            <div>
              <button
                type="button"
                className="hamburger hamburger--elastic mobile-toggle-nav"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
          <div className="app-header__menu">
            <span>
              <button
                type="button"
                className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
              >
                <span className="btn-icon-wrapper">
                  <i className="fa fa-ellipsis-v fa-w-6" />
                </span>
              </button>
            </span>
          </div>
          <div className="app-header__content">
            <div className="app-header-left">
              <div className="search-wrapper">
                <div className="input-holder">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Type to search"
                  />
                  <button className="search-icon">
                    <span />
                  </button>
                </div>
                <button className="close" />
              </div>
            </div>
            <div className="app-header-right">
              <div className="header-btn-lg pr-0">
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                      <div className="btn-group">
                        <a
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          className="p-0 btn"
                        >
                          <i className="fa fa-angle-down ml-2 opacity-8" />
                        </a>
                        <div
                          tabIndex={-1}
                          role="menu"
                          aria-hidden="true"
                          className="dropdown-menu dropdown-menu-right"
                        >
                          <button
                            type="button"
                            tabIndex={0}
                            className="dropdown-item"
                          >
                            User Account
                          </button>
                          <button
                            type="button"
                            tabIndex={0}
                            className="dropdown-item"
                          >
                            Settings
                          </button>
                          <h6 tabIndex={-1} className="dropdown-header">
                            Header
                          </h6>
                          <button
                            type="button"
                            tabIndex={0}
                            className="dropdown-item"
                          >
                            Actions
                          </button>
                          <div tabIndex={-1} className="dropdown-divider" />
                          <button
                            type="button"
                            tabIndex={0}
                            className="dropdown-item"
                          >
                            Dividers
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="widget-content-left  ml-3 header-user-info">
                      <div className="widget-heading">SLIIT </div>
                      <div className="widget-subheading">
                        Gawsan Raveenthiran
                      </div>
                    </div>
                    <div className="widget-content-right header-user-info ml-3">
                      <button
                        type="button"
                        className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example"
                      >
                        <i className="fa text-white fa-calendar pr-1 pl-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="app-main">
          <div className="app-sidebar sidebar-shadow">
            <div className="app-header__logo">
              <div className="logo-src" />
              <div className="header__pane ml-auto">
                <div>
                  <button
                    type="button"
                    className="hamburger close-sidebar-btn hamburger--elastic"
                    data-class="closed-sidebar"
                  >
                    <span className="hamburger-box">
                      <span className="hamburger-inner" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="app-header__mobile-menu">
              <div>
                <button
                  type="button"
                  className="hamburger hamburger--elastic mobile-toggle-nav"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
              </div>
            </div>
            <div className="app-header__menu">
              <span>
                <button
                  type="button"
                  className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
                >
                  <span className="btn-icon-wrapper">
                    <i className="fa fa-ellipsis-v fa-w-6" />
                  </span>
                </button>
              </span>
            </div>
            <div className="scrollbar-sidebar">
              <div className="app-sidebar__inner">
                <ul className="vertical-nav-menu">
                  <li className="app-sidebar__heading">Dashboards</li>
                  <li>
                    <a href="/" className="mm-active">
                      <i className="metismenu-icon pe-7s-rocket" />
                      Dashboard
                    </a>
                  </li>
                  <li className="app-sidebar__heading">Components</li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      HOTEL
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/HotelAdd">
                          <i className="metismenu-icon" />
                          HOTEL | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/HotelView">
                          <i className="metismenu-icon"></i> HOTEL | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/HotelUpdate">
                          <i className="metismenu-icon"></i> HOTEL | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/HotelReport">
                          <i className="metismenu-icon"></i> HOTEL | REPORT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      VEHICLE
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/VehicleAdd">
                          <i className="metismenu-icon" />
                          VEHICLE | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/VehicleView">
                          <i className="metismenu-icon"></i> VEHICLE | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/VehicleUpdate">
                          <i className="metismenu-icon"></i> VEHICLE | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/VehicleReport">
                          <i className="metismenu-icon"></i> VEHICLE | REPORT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      FOOD
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/FoodAdd">
                          <i className="metismenu-icon" />
                          FOOD | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/FoodView">
                          <i className="metismenu-icon"></i> FOOD | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/FoodUpdate">
                          <i className="metismenu-icon"></i> FOOD | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/FoodReport">
                          <i className="metismenu-icon"></i> FOOD | REPORT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      PACKAGE
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/PackageAdd">
                          <i className="metismenu-icon" />
                          PACKAGE | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/PackageView">
                          <i className="metismenu-icon"></i> PACKAGE | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/PackageUpdate">
                          <i className="metismenu-icon"></i> PACKAGE | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/PackageReport">
                          <i className="metismenu-icon"></i> PACKAGE | REPORT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      EVENT
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/EventAdd">
                          <i className="metismenu-icon" />
                          EVENT | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/EventView">
                          <i className="metismenu-icon"></i> EVENT | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/EventUpdate">
                          <i className="metismenu-icon"></i> EVENT | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/EventReport">
                          <i className="metismenu-icon"></i> EVENT | REPORT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      AGENT
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/AgentAdd">
                          <i className="metismenu-icon" />
                          AGENT | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/AgentView">
                          <i className="metismenu-icon"></i> AGENT | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/AgentUpdate">
                          <i className="metismenu-icon"></i> AGENT | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/AgentReport">
                          <i className="metismenu-icon"></i> AGENT | REPORT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      FLIGHT
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/FlightAdd">
                          <i className="metismenu-icon" />
                          FLIGHT | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/FlightView">
                          <i className="metismenu-icon"></i> FLIGHT | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/FlightUpdate">
                          <i className="metismenu-icon"></i> FLIGHT | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/FlightReport">
                          <i className="metismenu-icon"></i> FLIGHT | REPORT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i className="metismenu-icon pe-7s-diamond" />
                      MANAGER
                      <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                    </a>
                    <ul>
                      <li>
                        <a href="/ManagerAdd">
                          <i className="metismenu-icon" />
                          MANAGER | ADD
                        </a>
                      </li>
                      <li>
                        <a href="/ManagerView">
                          <i className="metismenu-icon"></i> MANAGER | VIEW
                        </a>
                      </li>
                      <li>
                        <a href="/ManagerUpdate">
                          <i className="metismenu-icon"></i> MANAGER | UPDATE
                        </a>
                      </li>
                      <li>
                        <a href="/ManagerReport">
                          <i className="metismenu-icon"></i> MANAGER | REPORT
                        </a>
                      </li>
                      <li>
                        <a href="/EventBookings">
                          <i className="metismenu-icon"></i> EVENT | BOOKINGS
                        </a>
                      </li>
                      <li>
                        <a href="/FlightBookings">
                          <i className="metismenu-icon"></i> FLIGHT | BOOKINGS
                        </a>
                      </li>
                      <li>
                        <a href="/HotelBookings">
                          <i className="metismenu-icon"></i> HOTEL | BOOKINGS
                        </a>
                      </li>
                      <li>
                        <a href="/VehicleBookings">
                          <i className="metismenu-icon"></i> VEHICLE | BOOKINGS
                        </a>
                      </li>
                      <li>
                        <a href="/FoodBookings">
                          <i className="metismenu-icon"></i> FOOD | BOOKINGS
                        </a>
                      </li>
                      <li>
                        <a href="/PackageBookings">
                          <i className="metismenu-icon"></i> PACKAGE | BOOKINGS
                        </a>
                      </li>
                      <li>
                        <a href="/AgentBookings">
                          <i className="metismenu-icon"></i> AGENT | BOOKINGS
                        </a>
                      </li>
                      <li>
                        <a href="/Contactus">
                          <i className="metismenu-icon"></i> Contact_Us
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="app-page-title">
                <div className="page-title-wrapper">
                  <div className="page-title-heading">
                    <div className="page-title-icon">
                      <i className="pe-7s-car icon-gradient bg-mean-fruit"></i>
                    </div>
                    <div>
                     <h3>Update Package of Travel Aspire .</h3> 
                    
                    </div>
                  </div>
                </div>
              </div>
              {}
              <div className={classes.root}>
                <Paper className={classes.paper}>
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        Package Name
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Package Name"
                        />
                        {errors_dname && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_dname}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        Price
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Price"
                        />
                        {errors_location && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_location}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        Includes
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.includes}
                          onChange={(e) => setincludes(e.target.value)}
                          placeholder="Includes"
                        />
                        {errors_noe && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_noe}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        Description
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.description}
                          onChange={(e) => setdescription(e.target.value)}
                          placeholder="Description"
                        />
                        {errors_cnumber && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_cnumber}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        Master Chef Foods Price
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.MasterChefFoodsPrice}
                          onChange={(e) =>
                            setMasterChefFoodsPrice(e.target.value)
                          }
                          placeholder="Master Chef Foods Price"
                        />
                        {errors_cnumber && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_cnumber}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        HighLuxaryVechilePrice
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.HighLuxaryVechilePrice}
                          onChange={(e) =>
                            setHighLuxaryVechilePrice(e.target.value)
                          }
                          placeholder="HighLuxaryVechilePrice"
                        />
                        {errors_cnumber && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_cnumber}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        PerExtraOneDayPrice
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.PerExtraOneDayPrice}
                          onChange={(e) =>
                            setPerExtraOneDayPrice(e.target.value)
                          }
                          placeholder="PerExtraOneDayPrice"
                        />
                        {errors_cnumber && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_cnumber}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        RentCameraPrice
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.RentCameraPrice}
                          onChange={(e) => setRentCameraPrice(e.target.value)}
                          placeholder="RentCameraPrice"
                        />
                        {errors_cnumber && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_cnumber}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        PerExtraBedPrice
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          defaultValue={packages.PerExtraBedPrice}
                          onChange={(e) => setPerExtraBedPrice(e.target.value)}
                          placeholder="PerExtraBedPrice"
                        />
                        {errors_cnumber && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_cnumber}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Form.Label column sm={3}>
                        Image
                      </Form.Label>
                      <Col sm={9}>
                        <img
                          src={Image}
                          alt="image"
                          width={"70px"}
                          style={{ borderRadius: 1000 }}
                        />
                        <Form.Control
                          type="file"
                          label="Image"
                          name="myFile"
                          accept=".jpeg, .png, .jpg"
                          onChange={(e) => handleFileUpload(e)}
                        />
                        {errors_description && (
                          <span style={{ color: "red" }} className="errors">
                            {errors_description}
                          </span>
                        )}
                      </Col>
                    </Form.Group>
                    <center>
                      <div className="button">
                        <input
                          type="button"
                          onClick={updatePackage}
                          value={loading ? "Loading... Please Wait!" : "SUBMIT"}
                          className="btn btn-block app-sidebar__heading Login-Button"
                        />
                      </div>
                    </center>
                  </Form>
                </Paper>
              </div>
            </div>
            <div className="app-wrapper-footer">
              <div className="app-footer">
                <div className="app-footer__inner">
                  <div className="app-footer-left"></div>
                  <div className="app-footer-right">
                    <ul className="nav">
                      <li className="nav-item">
                        <a href="javascript:void(0);" className="nav-link">
                          Copyright Travel Aspire. All rights reserved
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PackageUpdate;
