import {  useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading"
import { ProductContext } from "./utils/Context";
import { toast } from "react-toastify";

function Details(){
    const navigate = useNavigate();
    const[products,setProducts] =useContext(ProductContext);
    const [product,setProduct] = useState(null);

    const {id} = useParams();
    
    // const getsingleproduct =async () =>{
    //     try{
    //         const {data} =await axios.get(`/products/${id}`);
    //         setProducts(data)
    //     }catch(arror){
    //         console.log("found arror");
    //     }
    // };

    useEffect(()=>{
        if(!product ){
            setProduct(products.filter((p)=>p.id==id)[0])
        }
    },[]);

    const ProductDeleteHandler = (id) =>{
        const FilterProducts = products.filter((p) => p.id !==id);
        setProducts(FilterProducts);
        localStorage.setItem("products",JSON.stringify(FilterProducts));
        toast.success("Product Delete Success Fully")
        navigate(-1)
    };

    return (product ?
        <>
        <div className="w-[70%] flex h-screen m-auto p-20 items-center">
            <div className="h-[80%] w-[40%] mx-10">
                <img src={product.image} alt="" />
            </div>
            <div className="content h-[60%] w-[50%]">
                <h1 className="text-3xl mb-5 font-bold">{product.title}</h1>
                <h2 className="opacity-75 font-semibold mb-1">{product.category}</h2>
                <h3 className="text-red-400 text-lg font-bold mb-5">{product.price}</h3>
                <p className="opacity-90 mb-5">{product.description}</p>
                <NavLink to={`/edit/${product.id}`} className="px-3 py-1 border border-blue-400  rounded-md  text-blue-400">Edit</NavLink>
                <NavLink onClick={()=>ProductDeleteHandler(product.id)} className="px-3 py-1 border border-red-400 rounded-md mx-5 text-red-400">Delete</NavLink>
            </div>
        </div>
        </>:(
        <Loading />
        )
    )
}
export default Details;