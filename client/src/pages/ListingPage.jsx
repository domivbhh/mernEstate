import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';


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
                <Link to="/" className="text-center my-7 text-2xl">
                  Back to Home
                </Link>
              </div>
            )}

            {listingData && !error && !loading && (
              <>
                <Swiper navigation>
                  {listingData.imageUrls.map((item) => (
                    <SwiperSlide key={item}>
                      <div
                        className="h-[550px]"
                        style={{
                          background: `url(${item}) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
                        <p className="text-2xl font-semibold">
                          {listingData.name}-${" "}
                          {listingData.offer
                            ? listingData.discountedPrice.toLocaleString(
                                "en-US"
                              )
                            : listingData.regularPrice.toLocaleString("en-US")}
                          {listingData.type === "rent" && " /month "}
                        </p>

                        <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
                          <FaMapMarkerAlt className="text-green" />
                          {listingData.address}
                        </p>
                        <div className="flex gap-4 ">
                          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                            {listingData.type === "rent"
                              ? "For Rent"
                              : "For Sale"}
                          </p>
                          {listingData.offer && (
                            <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                              ${" "}
                              {+listingData.regularPrice -
                                +listingData.discountedPrice}
                            </p>
                          )}
                        </div>
                        <p className="text-slate-800">
                          <span className="font-semibold text-black">
                            Description-{" "}
                          </span>
                          {listingData.description}
                        </p>
                        <ul className=" text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-4">
                          <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaBed className="text-lg" />
                            {listingData.bedrooms > 1
                              ? `${listingData.bedrooms} beds`
                              : `${listingData.bedrooms} bed`}
                          </li>
                          <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaBath className="text-lg" />
                            {listingData.bathrooms > 1
                              ? `${listingData.bathrooms} baths`
                              : `${listingData.bathrooms} bath`}
                          </li>
                          <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaParking className="text-lg" />
                            {listingData.parking 
                              ? `Parking spot`
                              : 'No parking'}
                          </li>
                          <li className="flex items-center gap-1 whitespace-nowrap">
                            <FaChair className="text-lg" />
                            {listingData.furnished
                              ? `Furnished`
                              : `Unfurnished`}
                          </li>
                        </ul>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </main>
        );
  
}

export default ListingPage
