import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchShots } from '../../store/actions/shots';

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

    // componentWillReceiveProps (nextProps){


    //     if (this.props.location.pathname === nextProps.location.pathname && 
    //     this.props.location.search === nextProps.location.search
    //     ) {return}

    //     this.setState({filterText:nextProps.location.pathname.split('/')[2]})

    //     this.props.onChangeFilter(nextProps.location.pathname.split('/')[2],this.props.match.path);
        
    // }

    componentDidUpdate(prevProps,prevState){
        console.log(this.props.location.pathname.split('/')[2])
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

        let filterContent= this.state.showFilter ? (<div className="filter__dropdown">
        <div className="row">
            <div className="col-1-of-4">
                <div className="form__group">
                    <label htmlFor="tags" className="form__label">Tags</label>
                    <input id="tags" type="text" className="form__input " placeholder="Search by tag" />
                </div>
            </div>
            <div className="col-1-of-4">
                <div className="form__group">
                    <label htmlFor="title" className="form__label">Title</label>
                    <input id="title" type="text" className="form__input " placeholder="Search by title" />
                </div>
            </div>
            <div className="col-1-of-4">
                <div className="form__group">
                    <label htmlFor="author" className="form__label">Author</label>
                    <input id="author" type="text" className="form__input " placeholder="Search by author" />
                </div>
            </div>
            <div className="col-1-of-4">
                <div className="form__group">
                    <label htmlFor="author" className="form__label">Author</label>
                    <input id="author" type="text" className="form__input " placeholder="Search by author" />
                </div>
            </div>
        </div>
    </div>) : null;

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
