import React, { Component } from "react";
import SlideView from "./SlideView";
import Categories from "./Categories";

export class Landing extends Component {
  render() {
    return (
      <div>
        <SlideView></SlideView>
        <Categories></Categories>
      </div>
    );
  }
}

export default Landing;
