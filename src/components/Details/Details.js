import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import { Transition } from 'react-transition-group';

const Details = (props) => {
    console.log(props)
    let date=new Date(props.shotItem.createdAt.toDate());
    return (
        <>
        <Transition in={props.show} timeout={1000}>
            {state=>(
                <div className="details__container" style={{opacity:state==="entered"? 1:0.8, transition:'all 2s'}}>
                <h2 className="details__heading margin-bottom-sm">Shot Details</h2>
                <p className="date__section margin-bottom-md">Posted on {date.getDate()+'/'+date.getMonth() + '/' + date.getFullYear()}</p>
                <div className="stat__area margin-bottom-md">
                    <table className="stat__area-table">
                        <thead>
                            <tr>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>50374</td>
                                <td>{props.shotItem.shotDetails.userLiked.length}</td>
                                <td>{props.shotItem.comments.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="tag__area">
                    <p className="margin-bottom-sm">Tags</p>
                    <ul className="tag__lists">
                        {props.shotItem.shotDetails.tags.map(tag=>(
                            <li className="tag" key={Math.random()}>{tag}</li>
                        ))}
                    </ul>
                </div>
            </div>
            )}
        </Transition>
        
        <Backdrop show={props.show} clicked={props.clicked}/>
        </>
    )
}

export default Details;
