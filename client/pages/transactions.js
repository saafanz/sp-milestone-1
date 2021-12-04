//import logo from './logo.svg';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { install } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect , useState} from "react";
import axios from 'axios';



const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,

  }
}));




function createData(date, name, from, to, amount , type) {
  return { date, name, from, to, amount , type };
}
// function tr(){
//   axios.get('http://localhost:3000/transaction').then(response => {

//   console.log(response);
//   });
// }

const rows = [//date             name         from    to        amount    type
  createData('12/04/2021', 'Initial Transaction' , 'Bank' , 'My Account' , '100' , 'Credit'),
];

 
















function App() {
const [users,setUsers]=React.useState([]);
const [Transactions, setTransactions] = useState([]);
 
  useEffect(() => {
    axios.get("http://localhost:5000/users/list").then((response) => {
      setTransactions(response.data);
      console.log(response.data)
    });
    }, []);



  const classes = useStyles();
  return (
    
    <div className="App">


      
{


 
       
      <Container maxWidth = "g"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant = "h2" align = "center">

            </Typography>  
         </AppBar>
        <Grow in>
          <Container>


          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Date</TableCell>
            <TableCell align="right"> Name</TableCell>
            <TableCell align="right"> Balance</TableCell>
            <TableCell align="right">User's phone</TableCell>
            <TableCell align="right">User's ID</TableCell>
            <TableCell align="right">Type</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>

          {Transactions.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
                
              </TableCell>

              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.phone}</TableCell> 
               <TableCell align="right">{row.giu_id}</TableCell>
              <TableCell align="right">{row.type}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



            
            <Grid container justify = "space-between" alignItems = "stretch">
              <Grid item xs = {12} sm = {7}>
                  <appBar className = {classes.appBar} position="static" color="inherit">
                    
                  </appBar>
              </Grid>
            </Grid>
              <Grid item xs = {12} sm = {4}>
              <appBar className = {classes.appBar} position="static" color="inherit">
                    
                  </appBar>
              </Grid>
          </Container>

        </Grow>
      </Container> 
  
  
  }


    </div>
  

  
  );
}
 
export default App;