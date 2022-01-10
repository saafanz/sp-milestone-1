import {
    Button,
    FormGroup
  } from "reactstrap";


  export default function ExternalAndInternal() {


return(
    <FormGroup>
<Button color="primary" onClick={event =>  window.location.href='http://localhost:3000/internal'}>Apply Internal</Button>


<Button color="primary" onClick={event =>  window.location.href='http://localhost:3000/applyExternal'}>Apply External</Button>


</FormGroup>


);
  }