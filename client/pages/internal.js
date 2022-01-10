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



        export default function Transaction() {
        const [email, setEmail] = useState("");
        const [toemail, settoemail] = useState("");
        const [amount, setAmount] = useState("");
        const [emailState, setEmailState] = useState("");
        const [toemailState,settoemailState]= useState("");
        const [amountState,setAmountState]=useState("");

        const useTransactionsMutations = useMutateTransactionsUser();

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

        
        const validatetoemail = (value) => {
        let toemailState;
        if (value.length > 0) {
            toemailState = "has-success";
        } else {
          toemailState = "has-danger";
        }
        settoemailState(toemailState);
        };

        

        const validateAmount= (value) => {
        let amountState;
        if (value.length > 0) {
          amountState = "has-success";
        } else {
          amountState = "has-danger";
        }
        setAmountState(amountState);
        };




        const handleChange = (event) => {
        const { name , value } = event.target;
        if (name === "email") {
        validateEmail(value);
        setEmail(value);
        } else if (name === "toemail"){
        validatetoemail(value)
        settoemail(value);
        } 
        
        else if (name=== "amount"){
        validateAmount(value);
        setAmount(value);
        }


        };

        const handleSubmit = (event) => {
        event.preventDefault();
        validateEmail(email);
        validatetoemail(toemail);
        validateAmount(amount);

        if (
        emailState === "has-success" && 
        toemailState === "has-success"&&
        amountState=== "has-success"
        ) {

         useTransactionsMutations.mutate({email,toemail,amount});

        }
        };

    return (
       <div className={styles.App}>
       <h2>Transactions</h2>
       <Form className={styles.form} onSubmit={handleSubmit}>
       <FormGroup>
            <Label className={styles.label} for="email">
                email
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
        <Label className={styles.label} for="toemail">
        Toemail
        </Label>

<Input
    type="text"
    name="toemail"
    id="toemail"
    placeholder="example@example.com"
    onChange={handleChange}
    valid={toemailState === "has-success"}
    invalid={toemailState === "has-danger"}
    />
<FormFeedback>Please input a correct email.</FormFeedback>
</FormGroup>

<FormGroup>
<Label className={styles.label} for="amount">
        amount
</Label>
<Input
    type="amount"
    name="amount"
    id="amount"
    placeholder="EGP"
    onChange={handleChange}
    />

    </FormGroup>

    <Button color="primary">Submit</Button>






</Form>
</div>


        );
        }

//<Button color="primary" onClick={event =>  window.location.href='http://localhost:3000'}>Submit</Button>