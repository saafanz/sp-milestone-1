import { useHistory } from 'react-router-dom';
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
import { useMutateTransactionsUser } from "../adapters/user";



        export default function applyExternal() {




        const [ToEmail, setToEmail] = useState("");
        
        const [amount, setAmount] = useState("");
        
        const [email, setEmail] = useState("");


        //const [password, setPassword] = useState("");
        //const [confirmPassword, setConfirmPassword] = useState("");
        const [emailState, setEmailState] = useState("");

        //const [passwordState, setPasswordState] = useState("");
        //const [confirmPasswordState, setConfirmPasswordState] = useState("");
        const [ToEmailState,setToEmailState]= useState("");

        //const [GIUemailState,setGIUemailState]=useState("");
        //const [GIUidState,setGIUidState]=useState("");
        const [amountState,setAmountState]=useState("");

        //const useMutateTransactionsUser = useMutateTransactionsUser();

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

        
        const validateToEmailState = (value) => {
        let ToEmailState;
        if (ToEmail.length > 0) {
        ToEmailState = "has-success";
        } else {
          ToEmailState = "has-danger";
        }
        setToEmailState(confirmPasswordState);
        };

        

        const validateAmount= (value) => {
        let amountState;
        if (amount.length > 0) {
        amountState = "has-success";
        } else {
        amountState = "has-danger";
        }
        setAmountState(confirmPasswordState);
        };




        const handleChange = (event) => {
        const { ToEmail, value } = event.target;
        if (ToEmail === "email") {
        validateEmail(value);
        setEmail(value);
        } else if (ToEmail=== 'ToEmail'){
        validateToEmailState(value)
        setToEmail(value);
        } 
        
        else if (ToEmail=== 'amount'){
        validateAmount(value);
        setAmount(value);
        }


        };

        const handleSubmit = (event) => {
        event.preventDefault();
        validateEmail(email);


        validateToEmail(ToEmail);


        validateAmount(amount);

        if (
        emailState === "has-success" &&


        ToEmailState === "has-success"&&


        amountState=== "has-success"
        ) {
        // Call User Register Adapter
        //useRegisterMutations.mutate({email, password,name,GIUemail,GIUid,amount});
         //useRegisterMutations.mutate({ToEmail, FromEmail,Amount});

         useMutateTransactionsUser.mutate();

        }
        };

        return (
<div className={styles.App}>
<h2>External Transactions</h2>
<Form className={styles.form} onSubmit={handleSubmit}>
<FormGroup>
<Label className={styles.label} for="email">
        From Email
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
<Label className={styles.label} for="email">
        To Email
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
<Label className={styles.label} for="email">
        Bank name
</Label>

<Input
              type="text"
                      name="email"
                      id="email"
                      placeholder="Amry Bank"
                      onChange={handleChange}
                      valid={emailState === "has-success"}
                      invalid={emailState === "has-danger"}
                      />

</FormGroup>
<FormGroup>
<Label className={styles.label} for="amount">
        Amount
</Label>
<Input
              type="amount"
                      name="amount"
                      id="amount"
                      placeholder="EGP"
                      onChange={handleChange}
                      />

</FormGroup>


<Button color="primary" onClick={event =>  window.location.href='http://localhost:3000'}>Submit</Button>



</Form>
</div>


        );
        }