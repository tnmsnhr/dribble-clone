import React, { Component } from 'react'
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {fetchUser} from '../../store/actions/users';

class Profile extends Component {

    onClickHandler = ()=>{
        this.props.history.push('account/profile')
    }

    componentDidMount(){
        console.log(this.props.match.params.uid)
        this.props.onFetchUser(this.props.match.params.uid)
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     this.props.onFetchUser(this.props.match.params.uid)
    //     return this.props==nextProps
    // }

    // componentDidUpdate(prevProps, prevState){
    //     this.props.onFetchUser(this.props.match.params.uid)
    // }

    componentWillReceiveProps(nextProps){
        console.log(this.props.location.pathname,nextProps.location.pathname)

        if (this.props.location.pathname === nextProps.location.pathname) 
            {return} 

        else {
                this.props.onFetchUser(this.props.match.params.uid)
            }
    }
    
    render() {
        return (
            <>
                <div className="profile__area margin-bottom-lg">
                    <div className="profile__header">
                        <div className="profile__header-left">
                            <div className="row">
                                {this.props.userDetails.profileImageUrl ?
                                <img src={this.props.userDetails.profileImageUrl}/> :
                                <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" /> }
                                <h1 className="display-name">{this.props.userDetails.name}</h1>
                                <h1 className="designation">{this.props.userDetails.introduction}</h1>
                                <h1 className="email-id">{this.props.userDetails.email}</h1>
                                <div className="header__button-area margin-top-md">
                                    {this.props.authDetails.uid === this.props.match.params.uid ?
                                    <button className="btn btn-default" onClick={this.onClickHandler}><i className="fa fa-pencil-square-o"></i> Edit Profile</button>:null}
                                    <button className="btn btn-primary"><i className="fa fa-envelope"></i> Hire Me</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="profile__nav">
                        <ul className="profile__nav-items">
                            <li className="nav-item"><NavLink to="/">Shots</NavLink> <span className="count">17</span></li>
                            <li className="nav-item"><NavLink to="/">Liked Shots</NavLink> <span className="count">{this.props.userDetails.likedShots ? this.props.userDetails.likedShots.length:'0'}</span></li>
                            <li className="nav-item"><NavLink to="/">About</NavLink></li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
};

const mapStateToProps = state =>{
    return {
        userDetails: state.userState,
        authDetails:state.authState
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onFetchUser: (uid=>{dispatch(fetchUser(uid))})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
