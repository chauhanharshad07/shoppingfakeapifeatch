import { NavLink, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./utils/Context";
import Loading from "./Loading";
import axios from "./utils/axios";

function Home() {
    const [products] = useContext(ProductContext);
    const {search} = useLocation();
    const category =decodeURIComponent(search.split("=")[1]);

    const [filteredProduct,setfilteredProduct] = useState(null);

    const getproductcategory =async ()=>{
        try{
            const {data} = await axios.get(`/products/category/${category}`);
            setfilteredProduct(data);
        }catch(arror){
            console.log("found arror");
        }
    }
    useEffect(()=>{
        if (!filteredProduct || category == "undefined") setfilteredProduct(products);
        if(category != "undefined") {
            setfilteredProduct(products.filter((p)=>p.category == category));
        }
    },[category,products]);

    return products ? (
        <>
            <Nav />

            <div className='h-screen w-[85%]  p-10 flex flex-wrap overflow-x-hidden overflow-y-auto'>
                {filteredProduct &&
                 filteredProduct.map((p, i) =>
                    <NavLink to={`/details/${p.id}`} key={i} className='card w-[23%] mr-3 mb-3 shadow border h-[50vh] p-5 rounded-md flex flex-col justify-center items-center'>
                        <div className='h-[50%]  mb-5 bg-center'>
                            <img className='hover:scale-110 ease-in-out duration-300 w-full h-full object-container rounded-md' src={p.image} alt="" />
                        </div>
                        <h1 className='hover:text-blue-600 font-bold'>{p.title}</h1>
                    </NavLink>

                )}
            </div>
        </>
    ) : (
        <Loading />
    )
}
export default Home;
