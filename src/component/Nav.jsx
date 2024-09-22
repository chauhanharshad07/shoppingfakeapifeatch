import { useContext } from "react";
import {ProductContext} from "./utils/Context"
import { NavLink } from "react-router-dom";

function Nav(){
  const [products] = useContext(ProductContext);
  let distict_category = products && products.reduce((acc,cv)=>[...acc,cv.category],[])
  distict_category =[...new Set(distict_category)];

  const color=()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`;
  }

    return(
        <>
        <nav className='w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5'>
          <a className='py-3 px-5 border rounded-md border-blue-200 text-blue-400' href="/create"> Add New Product </a>
          <hr className="w-[80%] my-3" />
          <h1 className='text-2xl w-[80%] mb-3'>Category Filter</h1>
          <ul className=' w-[80%] '>
            {distict_category.map((c,i)=>(
              <NavLink key={i} to={`/?category=${c}`} className='mb-3 p-1 flex items-center'><span style={{backgroundColor:color()}} className='mr-5 w-[30px] h-[30px] rounded-full bg-blue-100'></span>
                {c}
              </NavLink >
            ))}
          </ul>
        </nav>
        </>
    )
}
export default Nav;