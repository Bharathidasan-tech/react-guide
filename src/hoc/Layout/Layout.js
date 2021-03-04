import React, {Component} from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {  
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false});
    }
    
    sideDrawerToggelHandler =()=>{
        this.setState( (prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer};
        })            
    }

    render () {
            return (
            <Aux>
                <ToolBar drawerToggleClicked={this.sideDrawerToggelHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

export default Layout;