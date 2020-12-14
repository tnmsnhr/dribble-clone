import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../../store/actions/auth';

class Navbar extends Component{

    onSearchHandler=(e)=>{
       
        if(e.key==="Enter"){
            this.props.history.push('/search/'+e.target.value)
        }
    }

    submitHandler=e=>{
        e.preventDefault()
    }
    

    render(){
        return (
            <div className="navbar margin-bottom-xl">
            <div className="container">
                <div className="navbar__content">
                    <div className="navbar__brand">
                        <NavLink to="/"><span className="navbar__logo">terribbble</span></NavLink>
                    </div>
                    <div className="navbar__left">
                        <li className="navbar__menu-item"><a href="#">Explore &nbsp;<i className="fa fa-chevron-down"></i></a></li>
                        <li className="navbar__menu-item"><a href="#">For Designers  &nbsp;<i className="fa fa-chevron-down"></i></a></li>
                        <li className="navbar__menu-item"><a href="#">Hiring Designers?  &nbsp;<i className="fa fa-chevron-down"></i></a></li>
                    </div>
                    <div className="navbar__right">
                        <ul className="navbar__menu">
                            <li className="navbar__menu-item">
                                <form action="" className="form" onSubmit={this.submitHandler}>
                                    <div className="form__group">
                                        <i className="fa fa-search"></i>
                                        <input id="search" type="text" className="form__input" onKeyDown={this.onSearchHandler}/>
                                    </div>
                                </form>
                            </li>
                            {this.props.name && 
                            <li className="navbar__menu-item">
                                <div className="navbar__user">
                                    { this.props.authData.profileImageUrl ?
                                    <img src={this.props.authData.profileImageUrl} alt="" /> :
                                    <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" />}
                                    <div className="action__container">
                                        <ul className="action__items">
                                            <li className="action__item"><NavLink to={"/my-profile/"+this.props.authData.userId}>{this.props.authData.name}</NavLink></li>
                                            <li className="action__item"><NavLink to="/"><i className="fa fa-heart"></i> My Likes</NavLink></li>
                                            <li className="action__item"><NavLink to="/"><i className="fa fa-folder"></i> My Shots</NavLink></li>
                                            <li className="action__item" onClick={this.props.onLogout}><a><i className="fa fa-power-off"></i> Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>}
                            <li className="navbar__menu-item">
                                {!this.props.name && <>
                                    <NavLink to="/auth/sign-in" >
                                        <button className="btn btn-default">Sign in</button>
                                    </NavLink>
                                    <NavLink to="/auth/sign-up" >
                                        <button className="btn btn-primary">Sign Up</button>
                                    </NavLink>
                                </>}
                                {this.props.name && <NavLink to="/shots/new" >
                                    <button className="btn btn-primary">Upload</button>
                                </NavLink>}
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )
    }
};

const mapStateToProps = state=>{
    return {
        name: state.authState.name,
        authData:state.authState
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        onLogout: ()=>{dispatch(logout())}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));