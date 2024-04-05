import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'


const ListingPage = () => {
    SwiperCore.use([Navigation])
const params=useParams()
const[listingData,setListingData]=useState()
const[loading,setLoading]=useState(false)
const [error, setError] = useState(false);

useEffect(()=>{
    const fetchData=async()=>{
        try{
        setLoading(true)
        const res=await fetch(`/api/listing/get/${params.id}`)
        const data=await res.json()
        if (data.success===false){
            setError(true)
            setLoading(false)
        }
        setListingData(data)
        setLoading(false)
        setError(false)

        }
            catch(err){
                setError(true)
                setLoading(false)

            }
        }
        fetchData()
},[params.id])
        return (
          <main>
            {loading && (
              <p className="text-center my-7 text-2xl">Loading......</p>
            )}
            {error && (
                <div>
                        <p className="text-center my-7 text-2xl">Error occured......</p>
                        <Link to='/' className='text-center my-7 text-2xl'>Back to Home</Link>
                </div>
            )}

            {listingData && !error && !loading &&(
                    <>
                    <Swiper navigation>
                        {listingData.imageUrls.map((item)=>(<SwiperSlide key={item}>
                            <div className='h-[550px]' style={{background:`url(${item}) center no-repeat` ,backgroundSize:'cover'}}>

                            </div>

                        </SwiperSlide>))}
                    </Swiper>
                    
                    </>

                )}

          </main>
        );
  
}

export default ListingPage
