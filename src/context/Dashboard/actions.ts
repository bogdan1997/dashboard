import { Dispatch } from 'react'

import { ActionTypes, Action } from './types';
import { getJWTToken, getFields, getRows } from 'api';
import { GridColDef } from '@mui/x-data-grid';

const {REACT_APP_BASEROW_URL} = process.env
// const dbId = REACT_APP_DATABASE_ID
// const tableId= REACT_APP_TABLE_ID
const wsURL= "wss://" + REACT_APP_BASEROW_URL+ "/ws/core/?jwt_token=";

export const getFieldsAction = (dispatch:Dispatch<Action>) => async (table_id: string, table:string) => {
    dispatch ({type:ActionTypes.GET_FIELDS_INIT_PENDING});
    try{
        const result = await getFields(table_id);
        const res = {table: table, result:result};
        dispatch ({type:ActionTypes.GET_FIELDS_INIT_SUCCESS, payload: res});
    }catch (error){
        console.log("FIELDS error *- " + error);
        dispatch ({type:ActionTypes.GET_FIELDS_INIT_ERROR});
    }
}
export const getRowsAction = (dispatch:Dispatch<Action>) => async (table_id: string, table:string) => {
    dispatch ({type:ActionTypes.GET_ROWS_INIT_PENDING});
    try{
        const result = await getRows(table_id);
        const res = {table:table, result:result}
        dispatch ({type:ActionTypes.GET_ROWS_INIT_SUCCESS, payload: res});
    }catch (error){
        console.log("ROWS error *- " + error);
        dispatch ({type:ActionTypes.GET_ROWS_INIT_ERROR});
    }
}
export const getJWTTokenAction = (dispatch:Dispatch<Action>) => async () => {
    dispatch ({type:ActionTypes.JWT_TOKEN_INIT_PENDING});
    try{
        const result = await getJWTToken();
        dispatch ({type:ActionTypes.JWT_TOKEN_INIT_SUCCESS, payload: result});
    }catch (error){
        console.log("JWT TOKEN error *- " + error);
        dispatch ({type:ActionTypes.JWT_TOKEN_INIT_ERROR});
    }
}

export const formatTableAction = (dispatch:Dispatch<Action>) => async (fields: any, rows: any, table:string) => {
    dispatch ({type:ActionTypes.TABLE_UPDATE_PENDING});
    try{
        const rowsTable: {}[] = []
        const columns: GridColDef[] = []
        if(Object.keys(fields).length !== 0){
            // console.log(fields)
            fields.forEach((item: any, index: any)=>{
                const ind = index +1;
                columns.push({field:'col' + ind, headerName: item.name,  width: 150})
            })
        }
        if(Object.keys(rows).length !== 0 && Object.keys(rows.results).length !== 0){
            rows.results.forEach((item: any, index: any ) => {
                let row: any = {};
                let colNumber = 0;
                Object.entries(item).map( (elem) => {
                    if(elem[0] === 'id'){
                        row.id = elem[1] + '';
                    }else if(elem[0] === 'order'){

                    }else{
                        colNumber++;
                        row['col' + colNumber] = elem[1] + ''
                    }
                    return null;
                })
                rowsTable.push(row);
            })
        }

        const result = {rows: rowsTable, columns: columns};
        const res = {table: table, result: result};
        dispatch ({type:ActionTypes.TABLE_UPDATE_SUCCESS, payload: res});
    }catch (error){
        console.log("Table Format Error *- " + error)
        dispatch ({type:ActionTypes.TABLE_UPDATE_PENDING});

    }
}

export const initDashboardAction = (dispatch: Dispatch<Action>) => async (token: string, table_id:string, table:string) => {
    dispatch ({type:ActionTypes.DASHBOARD_INIT_PENDING});
    try{

        const socket = new WebSocket(wsURL + token);
  
        const apiCall = {
            "page": "table",
            "table_id": table_id
        }

        socket.onopen = (event) => {
            socket.send(JSON.stringify(apiCall));
        };

        socket.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
                if (json.type === "rows_updated") {
                    const res = {table:table, result:json}
                    dispatch ({type:ActionTypes.UPDATE_ROWS_PENDING});
                    dispatch ({type:ActionTypes.UPDATE_ROWS_SUCCESS, payload: res});
                    dispatch ({type:ActionTypes.UPDATE_ROWS_ERROR});
                    }
            } catch (err) {
                dispatch ({type:ActionTypes.DASHBOARD_INIT_ERROR});
                console.log("WS error *- " + err);
                }
        };

    }catch(error){
        console.log("Action error *- " + error);
        dispatch ({type:ActionTypes.DASHBOARD_INIT_ERROR});
    }
}