import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import { toast } from "react-toastify";

function Edit() {

    const [products, setProducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        image: "",
        title: "",
        category: "",
        price: "",
        description: "",
    });
    const ChangeHandler = (e) => {
        // console.log(e.target.name,e.target.value);
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        setProduct(products.filter((p) => p.id == id)[0]);
    }, [id])


    const AddProductHandler = (e) => {
        e.preventDefault();

        if
            (
            product.title.trim().length < 5 ||
            product.image.trim().length < 5 ||
            product.category.trim().length < 5 ||
            product.price.trim().length < 1 ||
            product.description.trim().length < 5
        ) {
            alert("Each and every input must have aleast 4 chracter");
            return;
        }
        const pi= products.findIndex((p)=> p.id == id);
        const copyData = [...products];
        copyData[pi] ={...products[pi],...product}
        console.log(copyData);

        setProducts(copyData);
        localStorage.setItem(
            "products",
            JSON.stringify(copyData)
        );
        toast.success("Product Edit Success Fully")
        navigate(-1)
    }
    return (
        <>
            <form onSubmit={AddProductHandler} className="flex flex-col p-[5%] w-screen h-screen items-center">
                <h1 className="mb-3 text-3xl w-1/2">Edit Product</h1>

                <input type="url" placeholder="img url" className="text-1xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
                    name="image"
                    onChange={ChangeHandler}
                    value={product && product.image}
                />
                <input type="text" placeholder="title" className="text-1xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
                    name="title"
                    onChange={ChangeHandler}
                    value={product && product.title}
                />
                <div className="w-1/2 flex justify-between">
                    <input type="text" placeholder="category" className="text-1xl bg-zinc-100 rounded-md p-3 w-[49%] mb-3"
                        name="category"
                        onChange={ChangeHandler}
                        value={product && product.category}
                    />
                    <input type="number" placeholder="price" className="text-1xl bg-zinc-100 rounded-md p-3 w-[49%] mb-3"
                        name="price"
                        onChange={ChangeHandler}
                        value={product && product.price}
                    />

                </div>
                <textarea
                    name="description"
                    onChange={ChangeHandler}
                    value={product && product.description}
                    className="text-1xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3" placeholder="Enter product description here..." rows="10">

                </textarea>
                <div className="w-1/2 mt-2">
                    <button className='w- py-3 px-5 border rounded-md border-blue-200 text-blue-400'>Edit Product </button>

                </div>

            </form>
        </>
    )
}
export default Edit;