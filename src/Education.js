import React, { Component } from "react";
import PropTypes from "prop-types";
import JumboListing from "./JumboListing";

export default class Education extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const MyPhoto = require("./picture.png");
    return (
      <div className="container">
        <br></br>
        <JumboListing
          title={"CPE 357: Systems Programming"}
          description={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate."
          ]}
          tags={["abc", "xyz", "123"]}
          galleryUrl={MyPhoto}
          sourceCodeUrl={"https://github.com/rupaltotale"}
        />
      </div>
    );
  }
}
