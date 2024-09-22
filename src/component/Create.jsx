import { useContext, useState } from "react";
import { ProductContext } from "./utils/Context";
import { nanoid } from "nanoid";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Create() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);

    const [image, setimage] = useState("");
    const [title, settitle] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");

    const AddProductHandler = (e) => {
        e.preventDefault();

        if
            (
            title.trim().length < 5 ||
            image.trim().length < 5 ||
            category.trim().length < 5 ||
            price.trim().length < 1 ||
            description.trim().length < 5
        ) {
            alert("Each and every input must have aleast 4 chracter");
            return;
        }

        const product = {
            id: nanoid(),
            image,
            title,
            category,
            price,
            description
        };
        setProducts([...products, product]);
        localStorage.setItem(
            "products",
            JSON.stringify([...products, product])
        );
        toast.success("Product Added Success Fully")

        navigate("/")
    }

    return (

        <form onSubmit={AddProductHandler} className="flex flex-col p-[5%] w-screen h-screen items-center">
            <h1 className="mb-3 text-3xl w-1/2">Add New Product</h1>

            <input type="url" placeholder="img url" className="text-1xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
                onChange={(e) => setimage(e.target.value)}
                value={image}
            />
            <input type="text" placeholder="title" className="text-1xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3"
                onChange={(e) => settitle(e.target.value)}
                value={title}
            />
            <div className="w-1/2 flex justify-between">
                <input type="text" placeholder="category" className="text-1xl bg-zinc-100 rounded-md p-3 w-[49%] mb-3"
                    onChange={(e) => setcategory(e.target.value)}
                    value={category}
                />
                <input type="number" placeholder="price" className="text-1xl bg-zinc-100 rounded-md p-3 w-[49%] mb-3"
                    onChange={(e) => setprice(e.target.value)}
                    value={price}
                />

            </div>
            <textarea
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                className="text-1xl bg-zinc-100 rounded-md p-3 w-1/2 mb-3" placeholder="Enter product description here..." rows="10">

            </textarea>
            <div className="w-1/2 mt-2">
                <button className='w- py-3 px-5 border rounded-md border-blue-200 text-blue-400'> Add New Product </button>

            </div>

        </form>

    )
}
export default Create;