import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'
import {keepLogin, onAnnotatorLogout} from '../actions'
import {keepLogin_annotator} from '../actions'

import Register from './Register'
import Login from './Login'
import Item from './Item'
import DetailTask from './DetailTask'
import ManageTask from './ManageTask'

import CreateAnnotator from './CreateAnnotator'
import LoginAnnotator from './LoginAnnotator'
import ItemAnnotator from './ItemAnnotator'
import DetailTaskAnnotator from './DetailTaskAnnotator'
import BookedTasks from './BookedTasks'
import ManageAnnotator from './ManageAnnotator'


const cookie = new cookies()
var user = cookie.get('dataUser')
var annotator = cookie.get('annotator')

class App extends Component {

    componentWillMount(){
       
        console.log(user)
        if(user){
            this.props.keepLogin(user)
        }

        console.log(annotator)
        if(annotator) {
            this.props.keepLogin_annotator(annotator)
        }
    }

    render() {
    
        return (      
            <BrowserRouter>
                <div>
                <Header/>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/Item' component={Item}/>
                    <Route path='/detailtask/:id' component={DetailTask}/>
                    <Route path='/detailtaskannotator/:id' component={DetailTaskAnnotator}/>
                    <Route path="/managetask" component={ManageTask}/> 
                    <Route path='/createannotator' component={CreateAnnotator}/>
                    <Route path='/loginannotator' component={LoginAnnotator}/>
                    <Route path='/itemannotator' component={ItemAnnotator}/>
                    <Route path='/bookedtasks' component={BookedTasks}/>
                    <Route path="/manageannotator" component={ManageAnnotator}/> 
                </div>
            </BrowserRouter>
        
            )
    }
}

export default connect(null, {keepLogin, keepLogin_annotator})(App)







 // if(user){
        //     return (
        //         <BrowserRouter>
        //             <div>
        //             <Header/>
        //                 <Route path='/register' component={Register}/>
        //                 <Route path='/login' component={Login}/>
        //                 <Route path='/Item' component={Item}/>
        //                 <Route path='/detailproduct/:id' component={DetailProduct}/>
        //                 <Route path="/manageproduct" component={ManageProduct}/> 
        //                 <Route path='/createannotator' component={CreateAnnotator}/>
                       

        //             </div>
        //         </BrowserRouter>
            
        //         )
        // }
        // if(annotator) {
        //     return (
        //         <BrowserRouter>
        //             <div>
        //             <HeaderAnnotator/>
        //                 <Route path='/detailproductannotator/:id' component={DetailProductAnnotator}/>
        //                 <Route path='/loginannotator' component={LoginAnnotator}/>
        //                 <Route path='/itemannotator' component={ItemAnnotator}/>
        //             </div>
        //         </BrowserRouter>
            
        //         )
        // }

        // return (
        //     <BrowserRouter>
        //         <div>
        //         <Header/>
        //             <Route path='/register' component={Register}/>
        //             <Route path='/' exact component={Home}/>
        //             <Route path='/login' component={Login}/>
        //             <Route path='/loginannotator' component={LoginAnnotator}/>
        //             <Route path='/Item' component={Item}/>
        //             <Route path='/itemannotator' component={ItemAnnotator}/>
        //         </div>
        //     </BrowserRouter>
        
        //  )

      
        

 // return (
            
        //     <BrowserRouter>
        //         <div>
        //         <Header/>
        //             <Route path='/register' component={Register}/>
        //             <Route path='/login' component={Login}/>
        //             <Route path='/Item' component={Item}/>
        //             <Route path='/detailproduct/:id' component={DetailProduct}/>
        //             <Route path='/detailproductannotator/:id' component={DetailProductAnnotator}/>
        //             <Route path="/manageproduct" component={ManageProduct}/> {/* include() */}
        //             <Route path='/createannotator' component={CreateAnnotator}/>
        //             <Route path='/loginannotator' component={LoginAnnotator}/>
        //             <Route path='/itemannotator' component={ItemAnnotator}/>
        //         </div>
        //     </BrowserRouter>
        
        //     )