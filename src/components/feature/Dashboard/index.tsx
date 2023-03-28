import { useEffect, useReducer } from 'react';
import { DashboardContext, DashboardReducer as reducer, getJWTTokenAction, getFieldsAction, initDashboardAction, initialDashboadState, getRowsAction, formatTableAction } from 'context/Dashboard';
import styles from './styles.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Moment from 'moment';


const { REACT_APP_STATS_TABLE_ID, REACT_APP_STAKING_TABLE_ID, REACT_APP_TOKENOMICS_TABLE_ID, REACT_APP_PRICE_TABLE_ID, REACT_APP_TREASURY_TABLE_ID, REACT_APP_PLATFORM_TABLE_ID, REACT_APP_UPGRADES_TABLE_ID, REACT_APP_ALL_TIME_HIGH_TABLE_ID} = process.env
const statsTableId = REACT_APP_STATS_TABLE_ID as string
const stakingTableId = REACT_APP_STAKING_TABLE_ID as string
const tokenomicsTableId = REACT_APP_TOKENOMICS_TABLE_ID as string
const priceTableId = REACT_APP_PRICE_TABLE_ID as string
const treasuryTableId = REACT_APP_TREASURY_TABLE_ID as string
const platformTableId = REACT_APP_PLATFORM_TABLE_ID as string
const upgradesTableId = REACT_APP_UPGRADES_TABLE_ID as string
const allTimeHighTableId = REACT_APP_ALL_TIME_HIGH_TABLE_ID as string

export const Dashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialDashboadState)


  useEffect(() =>{
    getJWTTokenAction(dispatch)();
    getFieldsAction(dispatch)(statsTableId, 'stats');
    getRowsAction(dispatch)(statsTableId , 'stats');

    getFieldsAction(dispatch)(stakingTableId, 'staking');
    getRowsAction(dispatch)(stakingTableId , 'staking');

    getFieldsAction(dispatch)(tokenomicsTableId, 'tokenomics');
    getRowsAction(dispatch)(tokenomicsTableId , 'tokenomics');

    getFieldsAction(dispatch)(priceTableId, 'price');
    getRowsAction(dispatch)(priceTableId , 'price');

    getFieldsAction(dispatch)(treasuryTableId, 'treasury');
    getRowsAction(dispatch)(treasuryTableId , 'treasury');

    getFieldsAction(dispatch)(platformTableId, 'platform');
    getRowsAction(dispatch)(platformTableId , 'platform');

    getFieldsAction(dispatch)(upgradesTableId, 'upgrades');
    getRowsAction(dispatch)(upgradesTableId , 'upgrades');

    getFieldsAction(dispatch)(allTimeHighTableId, 'allTimeHigh');
    getRowsAction(dispatch)(allTimeHighTableId , 'allTimeHigh');


  }, []);

  useEffect(() =>{
    if(state.jwt_token){      
      initDashboardAction(dispatch)(state.jwt_token, statsTableId, 'stats');
      initDashboardAction(dispatch)(state.jwt_token, stakingTableId, 'staking');
      initDashboardAction(dispatch)(state.jwt_token, tokenomicsTableId, 'tokenomics');
      initDashboardAction(dispatch)(state.jwt_token, priceTableId, 'price');
      initDashboardAction(dispatch)(state.jwt_token, treasuryTableId, 'treasury');
      initDashboardAction(dispatch)(state.jwt_token, platformTableId, 'platform');
      initDashboardAction(dispatch)(state.jwt_token, upgradesTableId, 'upgrades');
      initDashboardAction(dispatch)(state.jwt_token, allTimeHighTableId, 'allTimeHigh');
    }
  }, [state.jwt_token]);


  // logging



  // useEffect(()=>{
  //     console.log(state);
  //   },[state])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.stats, state.rows.stats, 'stats');
    },[state.fields.stats, state.rows.stats])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.staking, state.rows.staking, 'staking');
    },[state.fields.staking, state.rows.staking])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.tokenomics, state.rows.tokenomics, 'tokenomics');
    },[state.fields.tokenomics, state.rows.tokenomics])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.price, state.rows.price, 'price');
    },[state.fields.price, state.rows.price])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.treasury, state.rows.treasury, 'treasury');
    },[state.fields.treasury, state.rows.treasury])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.platform, state.rows.platform, 'platform');
    },[state.fields.platform, state.rows.platform])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.upgrades, state.rows.upgrades, 'upgrades');
    },[state.fields.upgrades, state.rows.upgrades])

    useEffect(() => {
      formatTableAction(dispatch)(state.fields.allTimeHigh, state.rows.allTimeHigh, 'allTimeHigh');
    },[state.fields.allTimeHigh, state.rows.allTimeHigh])


  return (
  <div className={styles.dashboardWrapper}>
    <DashboardContext.Provider value={{state, dispatch}}>
      <div className={styles.header}>
          {/* <img src="https://assets-global.website-files.com/62a44e0db9f96812194d6230/62a6d359caa938ede9d97887_TLC_No_Background.png" 
          loading="lazy" height="" width="75" sizes="(max-width: 479px) 100vw, 75px" 
          alt=""/> */}
          <span>TLChain Statistics</span>
      </div>
      <div className={styles.tables}>
        <div className={styles.stats}>
          <h2 className={styles.tableName}>Stats</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.stats.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.stats.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] !== 'id'){
                      return <TableCell className= {styles.animate} key={row.id + "stats" + cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.staking}>
          <h2 className={styles.tableName}>Staking</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.staking.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.staking.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] !== 'id'){
                      return <TableCell className= {styles.animate} key={row.id + "staking" + cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.tokenomics}>
          <h2 className={styles.tableName}>Tokenomics</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.tokenomics.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.tokenomics.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] !== 'id'){
                      return <TableCell className= {styles.animate} key={row.id + "tokenomics" + cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.price}>
          <h2 className={styles.tableName}>Price</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.price.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.price.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] !== 'id'){
                      return <TableCell className= {styles.animate} key={row.id + "price" + cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.treasury}>
          <h2 className={styles.tableName}>Treasury</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.treasury.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.treasury.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] !== 'id'){
                      return <TableCell className= {styles.animate} key={row.id + "treasury" + cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.platform}>
          <h2 className={styles.tableName}>Platform</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.platform.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.platform.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] !== 'id'){
                      return <TableCell className= {styles.animate} key={row.id + "platform" + cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.upgrades}>
          <h2 className={styles.tableName}>Upgrades</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.upgrades.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.upgrades.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] === 'col1'){
                      return <TableCell className= {styles.animate} key={row.id + "upgrades" +cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else if(cell[0] === 'col2') {
                      return <TableCell className= {styles.animate} key={row.id + "upgrades" +cell[1] + cell[0]} component="th" scope="row">
                                { Moment(cell[1]).format('DD-MM-yyyy').toString() }
                              </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.allTimeHigh}>
          <h2 className={styles.tableName}>All Time High</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  state.table.allTimeHigh.columns.map((column:any) => {
                    return <TableCell className= {styles.animate} key={column.field}>{column.headerName}</TableCell>
                  })}
                </TableRow>
            </TableHead>
            <TableBody>
              {state.table.allTimeHigh.rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).map((cell:any) => {
                    if(cell[0] !== 'id'){
                      return <TableCell className= {styles.animate} key={row.id + "allTimeHigh" + cell[1] + cell[0]} component="th" scope="row">
                            {cell[1]}
                        </TableCell>
                    }else{
                      return null;
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </DashboardContext.Provider>
  </div>
  );
};


