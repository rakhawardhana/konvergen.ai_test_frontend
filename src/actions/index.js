import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLogin = (da_email, da_password) => {

    return (dispatch) => {
        axios.post(
            '/auth/login',
            {
                email: da_email,
                password: da_password
            }
        ).then(res => {
            console.log(res.data)
            // Jika data salah, res.data berisi string
            if(typeof(res.data) == 'string'){
                // Print errornya
                console.log('Eror: ' + res.data)
                alert('email atau password salah')
            } else {
                // Simpan id dan name di cookie
                cookie.set('token', res.data.token)
                cookie.set(
                    'dataUser',
                    {
                        id: res.data.id,
                        username: res.data.username
                    }
                )

                // Kirim id dan name ke redux
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        id: res.data.id,
                        username: res.data.username // payload berisi data yang akan di state
                    }
                })
            }
        }).catch(err => {
            console.log(err)
            alert("email atau password salah")
        })
    }

}

export const keepLogin = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: user.id,
            name: user.username
        }
    }
}

export const logoutUser = () => {
    cookie.remove(`dataUser`)
    return { type: `LOGOUT_SUCCESS` }
 }

 export const onLoginAnnotator = (username,password) =>{
    return(dispatch)=>{
        if(username === '' || password === ''){
            alert('ISI USERNAME DAN PASSWORDNYA BROK!')
        }else{
            axios.post('/auth/login-annotator',
                {
                    username,
                    password
                }
            ).then(res=>{
                if(typeof(res.data) === 'string'){
                    console.log('Eror: ' + res.data)
                }else{
                    console.log(res)
                    
                    dispatch({
                        type:'ANNOTATOR_LOGIN_SUCCESS',
                        payload:{
                            id: res.data.id,
                            username: res.data.username,
                        }
                    })
                    cookie.set('token', res.data.token)
                    cookie.set('annotator',{id : res.data.id, username: res.data.username})

                   
                }
            })
        }
    }
}

export const logoutAnnotator = () =>{
    console.log('ada ann')
    cookie.remove('annotator')
    return{
        type:'ANNOTATOR_LOGOUT_SUCCESS'
    }
}

export const keepLogin_annotator = (annotator) =>{
    return{
        type:'ANNOTATOR_LOGIN_SUCCESS',
        payload:{
            id: annotator.id,
            username: annotator.username,
        }
    }
}