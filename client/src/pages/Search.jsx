import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Search = () => {
    const navigate=useNavigate()
    const[sidebaarData,setSidebarData]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc'
    })

    const[loading,setLoading]=useState(false)
    const[listings,setListings]=useState([])
    console.log(listings)

    
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const searchTermFromUrl = urlParams.get("searchTerm");
      const typeFromUrl = urlParams.get("type");
      const sortFromUrl = urlParams.get("sort");
      const offerFromUrl = urlParams.get("offer");
      const furnishedFromUrl = urlParams.get("furnished");
      const orderFromUrl = urlParams.get("order");
      const parkingFromUrl = urlParams.get("parking");
      console.log(searchTermFromUrl);

      if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSidebarData({
          searchTerm: searchTermFromUrl || "",
          type: typeFromUrl || "all",
          parking: parkingFromUrl === "true" ? true : false,
          furnished: furnishedFromUrl === "true" ? true : false,
          offer: offerFromUrl === "true" ? true : false,
          sort: sortFromUrl || "created_at",
          order: orderFromUrl || "desc",
        });
      }

      const fetchListings=async ()=>{
        setLoading(true)
        
        const searchQuery=urlParams.toString()
        // console.log(searchQuery)
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data=await res.json();
        // console.log(data)
        setListings(data);
        setLoading(false);
      };

      fetchListings()
    }, [location.search]);





    // console.log(sidebaarData)

const handleSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams();
  urlParams.set("searchTerm", sidebaarData.searchTerm);
  urlParams.set("type", sidebaarData.type);
  urlParams.set("parking", sidebaarData.parking);
  urlParams.set("furnished", sidebaarData.furnished);
  urlParams.set("offer", sidebaarData.offer);
  urlParams.set("sort", sidebaarData.sort);
  urlParams.set("order", sidebaarData.order);

  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
};


const handleChange=(e)=>{
    if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale'){
        setSidebarData({...sidebaarData,type:e.target.id})
    }

    if(e.target.id==='searchTerm' ){
        setSidebarData({...sidebaarData,searchTerm:e.target.value})
    }

    if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer'){
        setSidebarData({...sidebaarData,[e.target.id]:e.target.checked || e.target.checked==='true' ? true: false})

    }

    if(e.target.id==='sort_order'){
        const sort=e.target.value.split('_')[0] || 'created_at';
        const order=e.target.value.split('_')[1]|| 'desc';

        setSidebarData({...sidebaarData,sort,order})
    }   
}






  return (
    <div className="flex flex-col md:flex-row">
      {/* left side div */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="whitespace-nowrap">
              Search Term
            </label>
            <input
              id="searchTerm"
              placeholder="search"
              type="text"
              className="border rounded-lg p-3 w-full"
              value={sidebaarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label htmlFor="" className="font-semibold">
              Type:
            </label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={sidebaarData.type === "all"}
                onChange={handleChange}
              />
              <span>Rent & Sale</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={sidebaarData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent </span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={sidebaarData.type === "sale"}
                onChange={handleChange}
              />
              <span>Sale</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={sidebaarData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label htmlFor="" className="font-semibold">
              Amenities:
            </label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={sidebaarData.parking}
                onChange={handleChange}
              />
              <span>Parking lot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={sidebaarData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Sort:
            </label>
            <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className="border rounded-lg p-3">
              <option value='regularPrice_desc' >Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      {/* right side div */}
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
      </div>
    </div>
  );
}

export default Search
