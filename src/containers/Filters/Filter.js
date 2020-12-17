import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchShots } from '../../store/actions/shots';
import Subfilter from './Subfilter';
import { Transition } from 'react-transition-group';


class Filter extends Component {

    state={
        id:'all',
        link:"/following/",
        showFilter:false
    }

    componentDidMount(){

        if(this.props.location.pathname.includes('following')){
            this.setState({link:"/following/"})
        }

        if(this.props.location.pathname.includes('search')){
            this.setState({link:"/search/"})
        }
    }

    componentDidUpdate(prevProps,prevState){

        if(prevProps.location.pathname == this.props.location.pathname){
            return;
        } else {
            this.props.onChangeFilter(this.props.location.pathname.split('/')[2],this.props.match.path);
        }

    }

    showFilter= ()=>{
        this.setState({showFilter:!this.state.showFilter})
    }

    

    render() {
        console.log("rendered")

        let filterContent= <Subfilter in={this.state.showFilter}/>

        return (
            <div className="container">
                <section className="filter__subnav margin-top-lg">
                    <div className="row">
                        <div className="col-1-of-5">
                            <div className="filter__views">
                                <button className="btn btn-default">
                                    Following <i className="fa fa-chevron-down"></i>
                                </button>
                            </div>
                        </div>

                        <div className="col-3-of-5">
                            <div className="filter__categories">
                                <ul className="category-lists">
                                    <li className='category'>
                                        <NavLink to={this.state.link+"all"}
                                        activeClassName="activeFilter"
                                        className={this.props.location.pathname==='/'? 'activeFilter':' '}
                                        >All</NavLink>
                                    </li>
                                    <li className='category'>
                                        <NavLink to={this.state.link+"animation"} activeClassName="activeFilter">Animation</NavLink>
                                    </li>
                                    <li className='category'>
                                        <NavLink to={this.state.link+"branding"} activeClassName="activeFilter">Branding</NavLink>
                                    </li>
                                    <li className='category' >
                                        <NavLink to={this.state.link+"illustration"} activeClassName="activeFilter">Illustration</NavLink>
                                    </li>
                                    <li className='category'>
                                        <NavLink to={this.state.link+"mobile"} activeClassName="activeFilter">Mobile</NavLink>
                                    </li>
                                    <li className='category'>
                                        <NavLink to={this.state.link+"print"} activeClassName="activeFilter">Print</NavLink>
                                    </li>
                                    <li className='category' >
                                        <NavLink to={this.state.link+"typography"} activeClassName="activeFilter">Typography</NavLink>
                                    </li>
                                    <li className='category'>
                                        <NavLink to={this.state.link+"web-design"} activeClassName="activeFilter">Web Design</NavLink>
                                    </li>
                                  
                                </ul>
                            </div>
                        </div>

                        <div className="col-1-of-5">
                            <div className="filter__settings">
                                <button className="btn btn-default" onClick={this.showFilter}>
                                {this.state.showFilter ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-down"></i>} Filters
                                </button>
                            </div>
                        </div>
                    </div>
                    {filterContent}
                </section>
                
            </div>
        )
    }
};

const mapDispatchToProps = dispatch=>{
    return {
        onChangeFilter: (filter,pthname)=>{dispatch(fetchShots(filter, pthname))}
    }
}

export default connect(null, mapDispatchToProps)(Filter);
