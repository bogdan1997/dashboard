import axios, {AxiosError} from 'axios';

const {REACT_APP_BASEROW_URL, REACT_APP_AUTH_USERNAME, REACT_APP_AUTH_PASSWORD, REACT_APP_API_KEY} = process.env
const baserowURL= REACT_APP_BASEROW_URL
const username = REACT_APP_AUTH_USERNAME
const password = REACT_APP_AUTH_PASSWORD
const api_key = REACT_APP_API_KEY
// const table_id = REACT_APP_TABLE_ID

export const getJWTToken = async () => {
    const url = 'https://' + baserowURL+ '/api/user/token-auth/'
    try{
        const response = await axios.post(url, {
            "username": username,
            "password": password
        })
        return response.data;
    }catch (err) {
        const error = err as AxiosError;

        throw error || ''
    }
}

export const getFields = async (table_id: string) => {
    const url = 'https://' + baserowURL + '/api/database/fields/table/'+ table_id  + '/'

    try{
        const response = await axios.get(url,  { headers: {
            Authorization: "Token " + api_key
    }})
        return response.data;
    }catch (err) {
        const error = err as AxiosError;
        throw error || ''
    }
}

export const getRows = async (table_id: string) => {
    const url = 'https://' + baserowURL + '/api/database/rows/table/'+ table_id  + '/'

    try{
        const response = await axios.get(url,  { headers: {
            Authorization: "Token " + api_key
    }})
        return response.data;
    }catch (err) {
        const error = err as AxiosError;
        throw error || ''
    }
}