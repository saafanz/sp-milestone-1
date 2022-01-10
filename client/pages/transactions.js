import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import {Button} from "reactstrap";
import styles from "../styles/Home.module.css";
import apiService from "../services/apiService";
import Link from "next/link";

export default function transactions() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accountId, setAccountId] = useState("");

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  useEffect(
    () =>{
      var id = localStorage.getItem("currentAccount");
      setAccountId(id);
      apiService.get("/transactions/:accountId" + id).then(
        (data) =>{
          setData(data.data);
          setIsLoading(false);
        }
      );
    }, []);


  function signOut(){
    localStorage.removeItem("jwt");
    router.push('/');
  }
  return <div>
      <div className={[styles.flex_row]}>
        <h1>Transactions</h1>
        <Button color="primary" onClick={signOut}>Sign Out</Button> 
      </div>
      { isLoading && <div>Loading...</div> }
      { !isLoading && <div className={styles.pad_child}>
        <h2>Account#{accountId} </h2>
        {data.map(function(transaction, i){
          return <div className={styles.flex_row} key={i}>
          <span>Date: {transaction.date}</span> 
          <span>Transaction: {transaction.name}</span>
          <span>debit: {transaction.debit}</span>
          <span>credit: {transaction.credit}</span>
          <span>total: {transaction.totalAmount}</span>
        </div> 
        })}
      </div> }
    </div> ;
}


