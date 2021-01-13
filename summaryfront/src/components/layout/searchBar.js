import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,FormControl,Button} from 'react-bootstrap'

export default function Search() {
  return (
    //hi
    <Form inline >
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>

  );
}