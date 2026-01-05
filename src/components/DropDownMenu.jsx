import { useState, useEffect } from "react";
import api from "../utils/axios";

const DropDownMenu = ({ isDarkmodeActive, value = "All", onChange = () => { } }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(value);

    const getCategories = async () => {
        try {
            const { data, statusText } = await api.get('/blogs/categories');
            if (statusText === 'OK') {
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const capitalize = (text = "") =>
        typeof text === "string"
            ? text.charAt(0).toUpperCase() + text.slice(1)
            : "";

    const handleSelect = (category) => {
        const finalCategory = category === "All" ? null : category;
        setSelected(finalCategory);
        setIsOpen(false);
        onChange(finalCategory);
    };

    useEffect(() => {
        getCategories();
        setSelected(value);
    }, [value]);

    return (
        <div
            className="relative w-full sm:w-60 md:w-72"
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                onClick={() => setIsOpen(prev => !prev)}
                onMouseEnter={() => setIsOpen(true)}
                className={`w-full h-12 px-4 rounded-xl border-2 flex justify-between items-center font-semibold transition-all duration-300
                    ${isDarkmodeActive
                        ? "bg-gray-800 border-gray-700 text-gray-100 hover:border-cyan-500 focus:ring-cyan-500"
                        : "bg-white border-gray-100 text-gray-600 hover:border-cyan-400 focus:ring-cyan-400"
                    } focus:outline-none focus:ring-2`}
            >
                <span className="truncate">
                    {selected ? capitalize(selected) : "Select Category"}
                </span>
                <span className={`ml-2 transform transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-500" : ""}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <ul
                    className={`absolute z-50 mt-2 w-full rounded-xl overflow-hidden shadow-2xl border transition-all duration-300
                        ${isDarkmodeActive
                            ? "bg-gray-800 border-gray-700 text-gray-100"
                            : "bg-white border-gray-100 text-gray-700"
                        }`}
                >
                    <li
                        onClick={() => handleSelect("All")}
                        className={`px-4 py-3 cursor-pointer text-sm font-medium transition-colors
                            ${selected === null
                                ? "bg-cyan-500/10 text-cyan-500"
                                : isDarkmodeActive ? "hover:bg-gray-700" : "hover:bg-gray-50"
                            }`}
                    >
                        All Categories
                    </li>

                    {categories.map((category) => (
                        <li
                            key={category}
                            onClick={() => handleSelect(category)}
                            className={`px-4 py-3 cursor-pointer text-sm font-medium transition-colors border-t border-gray-100/5
                                ${selected === category
                                    ? "bg-cyan-500/10 text-cyan-500"
                                    : isDarkmodeActive ? "hover:bg-gray-700" : "hover:bg-gray-50"
                                }`}
                        >
                            {capitalize(category)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDownMenu;