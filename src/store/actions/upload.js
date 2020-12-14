
import * as actionTypes from '../actions/actionTypes';
import {projectStorage, projectFirestore, timeStamp} from '../../firebase/config';

export const uploadStart = ()=>{
    return {
        type: actionTypes.UPLOAD_SHOTS_START
    }
}

export const uploadSuccess = (shotDetails, imageUrl)=> {
    return {
        type: actionTypes.UPLOAD_SHOTS_SUCCESS,
        shotDetails:shotDetails,
        imageUrl:imageUrl
    }
}

export const UploadShot = ({file, shotDetails})=>{

    let imageUrl='', progress=0, error='';

    return dispatch=>{
        dispatch(uploadStart());
        const storageRef= projectStorage.ref(file.name)
        const collectionRef = projectFirestore.collection('shots');

        storageRef.put(file).on('state_changed', (snap)=>{
            let percentage = (snap.bytesTransferred / snap.totalBytes)*100;
            progress=percentage;
        }, (err)=>{
            console.log(err);
        }, async ()=>{
            const url= await storageRef.getDownloadURL();
            imageUrl=url;
            const createdAt= timeStamp()
            collectionRef.add({
                imageUrl,
                shotDetails,
                createdAt,
                comments:[]
            })

            dispatch(uploadSuccess(shotDetails,imageUrl))
        })
    }
}