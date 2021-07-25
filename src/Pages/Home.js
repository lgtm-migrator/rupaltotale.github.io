import { Col, Container, Image, Jumbotron, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
//import liraries
import React, { Component } from "react";

import ContactForm from "../Components/ContactForm";
import Heading from "../Components/Heading";
import { IconContext } from "react-icons";
import { aboutMe, profileImage } from "../Data/Information.json";

// create a component
class Home extends Component {
  constructor(props) {
    super(props);
    this.submitted = false;
  }

  componentDidUpdate() {
    if (this.submitted) {
      window.scroll({ top: 2500, left: 0, behavior: "smooth" });
    }
  }

  renderAboutMe() {
    return (
      <div>
        <Heading heading={"About Me"} type="h1" hr={true} />
        <Jumbotron className="jumbo-aboutme">
          <Container>
            <Row>
              <Col xs={12} md={3}
                   style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                   }}>
                <Image src={`${profileImage}?w=300`} roundedCircle fluid
                       style={{boxShadow: "0 2px 5px 0 black"}} />
              </Col>
              <Col xs={12} md={9}>
                <h3 style={{ color: "wheat" }}>Hi, I am Rupal.</h3>
                {aboutMe
                  .split("\n")
                  .map((para, index) =>
                    <p key={index}>{para}</p>,
                  )}
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }

  renderFormSubmitted(name, message, email, rating) {
    this.submitted = true;
    return (
      <Jumbotron
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Form submitted successfully</h3>
        <IconContext.Provider
          value={{ color: "green", className: "global-class-name" }}
        >
          <div style={{ padding: 10 }}>
            <FaCheckCircle size={100} />
          </div>
        </IconContext.Provider>
        <hr />
        <h6 style={{ textAlign: "center" }}>
          Thank you for reaching out! I will get back to you in around 1 - 2
          business days. Here is what was submitted:
        </h6>
        <br />
        <p>
          <b>Name: </b> {name}
        </p>
        <p>
          <b>Message: </b> {message}
        </p>
        <p>
          <b>Email: </b> {email}
        </p>
        <p>
          <b>Rating: </b> {rating ? rating : "Not any"}
        </p>
      </Jumbotron>
    );
  }

  render() {
    const queryString = require("query-string");
    const parsed = queryString.parse(this.props.location.search);
    return (
      <div className="container">
        {this.renderAboutMe()}

        <Heading heading={"Contact Me"} type="h2" hr={true}></Heading>

        {parsed.submit ? (
          this.renderFormSubmitted(
            parsed["?name"],
            parsed.message,
            parsed.email,
            parsed.rating,
          )
        ) : (
          <ContactForm />
        )}
      </div>
    );
  }
}

//make this component available to the app
export default Home;
