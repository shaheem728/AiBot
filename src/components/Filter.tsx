import Range from "@/components/Range";
import ColorSelector from "./Colorselector";
import { useState } from "react";
// Define the props type
interface FilterProps {
  handleChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectSize: (size: string) => void;
  onSelectColor: (color: string) => void;
  onSelectCategory: (category: string) => void;
  handleRemoveFilter:()=>void;
}
export default function Filter({handleChanges,onSelectSize,onSelectColor,onSelectCategory,handleRemoveFilter}:FilterProps){
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedcategory, setSelectedCategory] = useState<string | null>(null);
    const handleColorSelect = (color: string) => {
      setSelectedColor(color);
      onSelectColor(color)
  };
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
    const toggleAccordion1 = () => {
      setIsOpen1(!isOpen1);
    };
    const toggleAccordion2 = () => {
      setIsOpen2(!isOpen2);
    };
    const toggleAccordion3 = () => {
      setIsOpen3(!isOpen3);
    };
    const subCategories = [  
        { name: "T-Shirts" },
        { name: "Shorts" },
        { name: "Shirts" },
        { name: "Hoodie"},   
        { name: "Jeans" },
      ];
      const dressStyle = [
        { name: "Casual" },
        { name: "Formal" },
        { name: "Party" },
        { name: "Gym" },
      ];
      type Size ={
        name: string;
      }
      const Sizes:Size[] = [
        { name: "Small" },
        { name: "XX-Small" },
        { name: "X-Small" },
        { name: "Medium" },
        { name: "Large" },
        { name: "X-Large" },
        { name: "XX-Large" },
        { name: "3X-Large" },
        { name: "4X-Large" },
      ];
      type Color ={
        name: string;
        value:string;
      }
      const Colors : Color[] = [
      
        {
            name:'red',value: '#ff0000',
        },
        {
            name:'yellow',value: '#ffff00',
        },
        {
            name:'navy',value: '#000080'
        },
        {
            name:'fuchsia',value: '#ff007f'
        },
        {
            name:'green',value: '#008000'
        },
        {
            name:'gray',value: '#808080'
        },
        {
            name:'black',value: '#000'
        },
        {
            name:'blue',value: '#3F83F8'
        },
        {
            name:'brown',value: '#8E4B10'
        },
        {
            name:'white',value: '#fffafa'
        },
    ]; 
    
    return (
        <form className=" lg:border  lg:rounded-xl h-auto">
        <div className="flex my-3 justify-between px-4">
          <h1 className="text-lg font-bold  text-gray-900">Filters</h1>
          <svg
            className=" text-gray-500 dark:text-white hidden lg:block"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
          </svg>
        </div>
        <hr className="mx-4" />
        <h3 className="sr-only">Categories</h3>
        <ul
          role="list"
          className="space-y-4 px-3 mt-2  border-gray-200 pb-6 text-sm font-medium  text-gray-500"
        >
          {subCategories.map((category) => (
            <li key={category.name} className="flex justify-between">
              <input className={`hover:text-blue-500${selectedcategory === category.name?'text-blue-600':''}`} type='button'  onClick={()=>{onSelectCategory(category.name),setSelectedCategory(category.name)}} value={category.name}  name={category.name}  />
              <svg
                className={`w-[19px] h-[19px] text-gray-400 dark:text-white${selectedcategory === category.name?'text-blue-600':''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </li>
          ))}
        </ul>
        <hr className="mx-4" />
        <div id="accordion-collapse" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded={isOpen}
              onClick={toggleAccordion}
              aria-controls="accordion-collapse-body-1"
            >
              <h1 className="text-lg font-bold  text-gray-900">
                Price
              </h1>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className={`${isOpen ? '' : 'hidden'} h-[100px]`}
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5   border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <Range
                min={0}
                max={500}
                initialOne={100}
                initialTwo={500}
                handleChanges={handleChanges}
              />
            </div>
          </div>
          <hr className="mx-4" />
          <h2 id="accordion-collapse-heading-2">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
              data-accordion-target="#accordion-collapse-body-2"
              aria-expanded={isOpen1}
              onClick={toggleAccordion1}
              aria-controls="accordion-collapse-body-2"
            >
              <h1 className="text-lg font-bold  text-gray-900">
                Colours
              </h1>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-2"
            className={`${isOpen1? '' : 'hidden'}`}
            aria-labelledby="accordion-collapse-heading-2"
          >
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap">
            <span
                className='rounded-full mt-3 h-10 w-10 me-1 flex items-center justify-center text-slate-400 font-serif'
                onClick={() => {
                  onSelectColor('');
                    setSelectedColor('');
                }}
                style={{
                  border: '1px solid black' // Use the color prop for background
                }}
            >ALL
            </span>
                {Colors.map((color) => (
                    <ColorSelector
                    key={color.name}
                    color={color.name}
                    value={color.value}
                    isSelected={selectedColor === color.name }
                    onSelect={handleColorSelect}
                    />
                ))}
            </div>
            </div>
          </div>
          <hr className="mx-4" />
          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
              data-accordion-target="#accordion-collapse-body-3"
              aria-expanded={isOpen2}
              onClick={toggleAccordion2}
              aria-controls="accordion-collapse-body-3"
            >
              <h1 className="text-lg font-bold  text-gray-900">Size</h1>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-3"
            className={`${isOpen2? '' : 'hidden'}`}
            aria-labelledby="accordion-collapse-heading-3"
          >   
           <div className="flex flex-wrap my-3">
              {Sizes.map((size) => (
          <div
            key={size.name}
            className={`rounded-full bg-secondary hover:bg-black hover:text-white text-gray-400 h-11 w-auto m-1 place-content-center px-5 ${
              selectedSize === size.name ? 'ring-4 ring-black' : ''
            }`}
            onClick={() => {setSelectedSize(size.name), onSelectSize(size.name)}}
          >
            {size.name}
          </div>
        ))}
        </div>
          </div>
          <hr className="mx-4" />
          <h2 id="accordion-collapse-heading-4">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black    gap-3"
              data-accordion-target="#accordion-collapse-body-4"
              aria-expanded={isOpen3}
              onClick={toggleAccordion3}
              aria-controls="accordion-collapse-body-4"
            >
              <h1 className="text-lg font-bold  text-gray-900">
                Dress Style
              </h1>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-4"
            className={`${isOpen3? '' : 'hidden'}`}
            aria-labelledby="accordion-collapse-heading-4"
          >
            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
              <ul
                role="list"
                className="space-y-4 px-3 mt-2  border-gray-200 pb-6 text-sm font-medium  text-gray-500"
              >
                {dressStyle.map((style) => (
                  <li
                    key={style.name}
                    className="flex justify-between"
                  >
                    <input className={`hover:text-blue-500${selectedcategory === style.name?'text-blue-600':''}`} type='button'  onClick={()=>{onSelectCategory(style.name),setSelectedCategory(style.name)}} value={style.name}  name={style.name}  />
                   <svg
                      className="w-[19px] h-[19px] text-gray-400 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
           type='reset'  onClick={()=>handleRemoveFilter()}
            className="text-white w-11/12 my-3 mx-3 bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-3  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Remove Filter
          </button>
        </div>
      </form>
    )
}