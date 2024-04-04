import React, { useRef, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase/firebase'
import { updateUserStart,updateUserFailure,updateUserSuccess } from '../redux/user/userSlice'
// import { UseDispatch  from 'react-redux'
import {Link} from 'react-router-dom'

const Profile = () => {
  const dispatch=useDispatch()
  const fileRef=useRef(null)
  const {currentUser}=useSelector((state)=>state.user)
  const [file,setFile]=useState(undefined)
  const[filePercent,setFilePercent]=useState(0)
  const[fileUploadError,setFileUploadError]=useState(false)
  const[formData,setFormData]=useState({})
  const {username,email}=currentUser

  // console.log(file)

  // firebase Storage
  //  allow read;
  //     allow write: if
  //     request.resource.size< 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')

  const handleFileUpload=(file)=>{
    const storage=getStorage(app)
    const fileName= new Date().getTime() + file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed',(snapshot)=>{
      const progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('upload is' + progress + '% done')
      setFilePercent(Math.round(progress))
    },

    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setFormData({...formData,avatar:downloadURL})

      })
    }
    )
  }
  

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit=async (e)=>{
      e.preventDefault()
      try{
        dispatch(updateUserStart());

        const res=awaitfetch(`/api/user/update/${currentUser._id}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formData)
        });

        const data=await res.json()

        if(data.success===false){
          dispatch(updateUserFailure(data.message));

        }

        dispatch(updateUserSuccess(data))
      }
      catch(err){
          dispatch(updateUserFailure(err.message))
      }
    }

    

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

  return (
    <div className="p-3 max-w-lg mx-auto gap-4">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/> 
        <img
          src={formData.avatar || currentUser.avatar}
          alt=""
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          onClick={()=>fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {
            fileUploadError ? (<span className='text-red-700'>Error Image Upload (Img must be less than 2MB)</span> ) : 
            filePercent>0 && filePercent<100 ? (<span className='text-green-600'>{`uploading ${filePercent}%`}</span>) :
            (filePercent===100 ? (<span className='text-green-600'>Image Successfully uploaded</span>) :'')
          }
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          defaultValue={email}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}/>

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update     </button>
        <Link to='/create-listing' className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile
