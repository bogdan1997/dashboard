import { ActionTypes, Action } from "./types";
import { DashboardState } from "./state";
import { isEqual } from 'lodash';

export const initialDashboadState: DashboardState = {
    jwt_token: '',
    rows:{ 
        stats:{results: {}},
        staking:{results: {}},
        tokenomics:{results: {}},
        price:{results: {}},
        treasury:{results: {}},
        platform:{results: {}},
        upgrades:{results: {}},
        allTimeHigh:{results: {}},
        },
    fields: {
        stats:{},
        staking:{},
        tokenomics:{},
        price:{},
        treasury:{},
        platform:{},
        upgrades:{},
        allTimeHigh:{},
    },
    table: {
        stats:{rows:[] , columns:[]},
        staking:{rows:[] , columns:[]},
        tokenomics:{rows:[] , columns:[]},
        price:{rows:[] , columns:[]},
        treasury:{rows:[] , columns:[]},
        platform:{rows:[] , columns:[]},
        upgrades:{rows:[] , columns:[]},
        allTimeHigh:{rows:[] , columns:[]},
    }
}

export const DashboardReducer = (state: DashboardState, action: Action) => {
    switch (action.type) {
        case ActionTypes.DASHBOARD_INIT_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case ActionTypes.DASHBOARD_INIT_SUCCESS:
            return {
                ...state,
                pending: false,
                error: false
            }
        case ActionTypes.DASHBOARD_INIT_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case ActionTypes.JWT_TOKEN_INIT_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case ActionTypes.JWT_TOKEN_INIT_SUCCESS:
            return {
                ...state,
                jwt_token: action.payload.token,
                pending: false,
                error: false
            }
        case ActionTypes.JWT_TOKEN_INIT_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case ActionTypes.GET_FIELDS_INIT_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case ActionTypes.GET_FIELDS_INIT_SUCCESS:
            return {
                ...state,
                fields:{ ...state.fields,
                     [action.payload.table]: action.payload.result
                },
                pending: false,
                error: false
            }
        case ActionTypes.GET_FIELDS_INIT_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case ActionTypes.GET_ROWS_INIT_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case ActionTypes.GET_ROWS_INIT_SUCCESS:
            return {
                ...state,
                rows:{
                    ...state.rows,
                    [action.payload.table]:action.payload.result,
                } ,
                pending: false,
                error: false
            }
        case ActionTypes.GET_ROWS_INIT_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case ActionTypes.UPDATE_ROWS_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case ActionTypes.UPDATE_ROWS_SUCCESS:
            const res = state.rows[action.payload.table].results;

            action.payload?.result.rows.forEach((elem: any, index:any)  => {
                res.forEach((e:any, i:any)=>{
                    if(isEqual(e, action.payload.result.rows_before_update[index])){
                        res[i] = elem
                    }
                })
            })
 
            return {
                ...state,
                rows: {
                    ...state.rows,
                    [action.payload.table]:{
                        ...state.rows[action.payload.table],
                        results: res,
                    }
                },
                pending: false,
                error: false
            }
        case ActionTypes.UPDATE_ROWS_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case ActionTypes.TABLE_UPDATE_SUCCESS:
            if(action.payload){
                return {
                    ...state,
                    table:{
                        ...state.table,
                        [action.payload.table]: action.payload.result,
                    },
                    pending: false,
                    error: false
                }
            }
            return {...state}
    
        case ActionTypes.TABLE_UPDATE_ERROR:
            return {
                ...state,
                pending: false,
                error: true
            }
        case ActionTypes.TABLE_UPDATE_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
            default:
                return state;
    }
}