import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchShots } from '../../store/actions/shots';

class Filter extends Component {

    state={
        id:'all',
        link:"/following/"
    }

    componentWillReceiveProps (nextProps){
        console.log(this.props.location.pathname,nextProps.location.pathname)
        if(this.props.location.pathname.includes('following')){
            this.setState({link:"/following/"})
        }

        if(this.props.location.pathname.includes('search')){
            this.setState({link:"/search/"})
        }

        if (this.props.location.pathname === nextProps.location.pathname && 
        this.props.location.search === nextProps.location.search
        ) {return}

        this.setState({filterText:nextProps.location.pathname.split('/')[2]})
        console.log("from filter js",this.props.match)
        this.props.onChangeFilter(nextProps.location.pathname.split('/')[2],this.props.match.path);
        
    }

   

    

    render() {
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
                                <button className="btn btn-default">
                                    <i className="fa fa-sort"></i> Filters
                                </button>
                            </div>
                        </div>
                    </div>
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
