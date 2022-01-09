import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import {Button} from "reactstrap";
import styles from "../styles/Home.module.css";
import apiService from "../services/apiService";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      var id = parseJwt(localStorage.getItem("jwt")).email;
      apiService.get("/accounts/findAcc" + id).then(
        (data) =>{
          setData(data.data);
          setIsLoading(false);
        }
      );
    }, []);


  function signOut(){
    localStorage.removeItem("jwt");
    router.reload('/');
  }
  return <div>
      <div className={[styles.flex_row]}>
        <h1>DashBoard</h1>
        <Button color="primary" onClick={signOut}>Sign Out</Button> 
      </div>
      { isLoading && <div>Loading...</div> }
      { !isLoading && <div className={styles.pad_child}>
        <h2>Accounts</h2>
        {data.map(function(account, i){
          return <div className={styles.flex_row} key={i}>
          <span>Account #{account.userId}</span>
          <span>Total Amount: ${account.totalAmount}</span>
          <Button color="primary" onClick={() =>{localStorage.setItem("currentAccount", account.userId)}}><Link  href="transactions" passHref><span className={styles.white}>View Transactions</span></Link></Button>
        </div> 
        })}
      </div> }
    </div> ;
}
