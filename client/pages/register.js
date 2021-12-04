import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useMutateRegisterUser } from "../adapters/user";

export default function Register() {
  const [name, setName] = useState("");
  const [GIUemail,setGIUemail] = useState("");
  const [GIUid, setGIUid] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [nameState,setNAmeState]= useState("");
  const [GIUemailState,setGIUemailState]=useState("");
  const [GIUidState,setGIUidState]=useState("");
  const [phoneState,setPhoneState]=useState("");
  const useRegisterMutations=useMutateRegisterUser();

  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailState;
    if (emailRegex.test(value)) {
      emailState = "has-success";
    } else {
      emailState = "has-danger";
    }
    setEmailState(emailState);
  };

  const validatePassword = (value) => {
    let PasswordState;
    if (value.length > 5) {
      PasswordState = "has-success";
    } else {
      PasswordState = "has-danger";
    }
    setPasswordState(PasswordState);
  };

  const validateConfirmPassword = (value) => {
    let confirmPasswordState;
    if (value === password && password.length > 0) {
      confirmPasswordState = "has-success";
    } else {
      confirmPasswordState = "has-danger";
    }
    setConfirmPasswordState(confirmPasswordState);
  };

  const validateName = (value) => {
    let nameState;
    if (name.length > 0) {
      nameState = "has-success";
    } else {
      nameState = "has-danger";
    }
    setNAmeState(confirmPasswordState);
  };

  const validateGIUemail = (value) => {
    let GIUemailState;
    if (GIUemail.length > 0) {
      GIUemailState = "has-success";
    } else {
      GIUemailState = "has-danger";
    }
    setGIUemailState(confirmPasswordState);
  };

  const validateGIUid = (value) => {
    let GIUidState;
    if (GIUid.length > 0) {
      GIUidState = "has-success";
    } else {
      GIUidState = "has-danger";
    }
    setGIUidState(confirmPasswordState);
  };

  const validatePhone= (value) => {
    let phoneState;
    if (phone.length > 0) {
      phoneState = "has-success";
    } else {
      phoneState = "has-danger";
    }
    setPhoneState(confirmPasswordState);
  };




  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      validateEmail(value);
      setEmail(value);
    } else if (name === "confirm_password") {
      validateConfirmPassword(value);
      setConfirmPassword(value);
    } else if (name === 'password') {
      validatePassword(value);
      setPassword(value);
    } else if (name=== 'name'){
      validateName(value)
      setName(value);
    } else if (name=== 'GIUemail'){
      validateGIUemail(value);
      setGIUemail(value);
    } else if (name=== 'GIUid'){
      validateGIUid(value);
      setGIUid(value);
    } else if (name=== 'phone'){
      validatePhone(value);
      setPhone(value);
    }


  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);
    validateName(name);
    validateGIUemail(GIUemail);
    validateGIUid(GIUid);
    validatePhone(phone);

    if (
      emailState === "has-success" &&
      passwordState === "has-success" &&
      confirmPasswordState === "has-success"&&
      nameState === "has-success"&&
      GIUemailState === "has-success"&&
      GIUidState=== "has-success"&&
      phoneState=== "has-success"
    ) {
      // Call User Register Adapter
     useRegisterMutations.mutate({email, password,name,GIUemail,GIUid,phone});
    }
  };

  return (
    <div className={styles.App}>
      <h2>Register</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup>
          <Label className={styles.label} for="name">
            Name
          </Label>
          <Input
            type="name"
            name="name"
            id="name"
            placeholder=""
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="email">
            Username
          </Label>

          <Input
            type="text"
            name="email"
            id="email"
            placeholder="example@example.com"
            onChange={handleChange}
            valid={emailState === "has-success"}
            invalid={emailState === "has-danger"}
          />
          <FormFeedback>Please input a correct email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            valid={passwordState === "has-success"}
            invalid={passwordState === "has-danger"}
          />
          <FormFeedback>
            Password must be at least 6 characters long.
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Confirm Password
          </Label>
          <Input
            type="password"
            name="confirm_password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>Passwords don't match.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="Phone">
            phone number
          </Label>
          <Input
            type="phone"
            name="phone"
            id="phone"
            placeholder="***********"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="GIUemail">
            GIUemail
          </Label>
          <Input
            type="GIUemail"
            name="GIUemail"
            id="GIUemail"
            placeholder="example@student.giu-uni.de"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="GIUid">
            GIUid
          </Label>
          <Input
            type="GIUid"
            name="GIUid"
            id="GIUid"
            placeholder="100****"
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
}
