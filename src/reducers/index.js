import { combineReducers } from 'redux'


// import AuthReducer from './AuthReducer'
const init = {
    id: '',
    name: ''
}


const authReducer = (data = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...data,
                id: action.payload.id,
                name: action.payload.name
            }
            
        
        case "LOGOUT_SUCCESS":
                return {
                ...data,
                id: '',
                name: ''
                }
        
        
        default:
            return data
    }
}




const init_annotator = {
    id: '',
    username: ''
}

const authAnnotatorReducer = (data = init_annotator,action)=>{
        switch (action.type) {
            case 'ANNOTATOR_LOGIN_SUCCESS':
                return{
                    id: action.payload.id,
                    username: action.payload.username,
                }
                
                
        
            case 'ANNOTATOR_LOGOUT_SUCCESS':
                return{
                    ...data,
                    id:'',
                    username:'',
                }
                
            default:
                
                return data;
        }
    }

export default combineReducers(
    {
        auth: authReducer,
        annotator: authAnnotatorReducer
    }
)