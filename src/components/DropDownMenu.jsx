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
        <div className="relative w-64" onMouseLeave={() => setIsOpen(false)}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                onMouseEnter={() => setIsOpen(true)}
                className={`w-183 h-20 px-4 rounded-lg border focus:outline-none focus:ring-2 flex justify-between items-center font-medium transition-all duration-500 ${isDarkmodeActive
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-700"
                    : "bg-white text-gray-400 hover:bg-gray-300"
                    }`}
            >
                {selected ? capitalize(selected) : "Select Category"}
                <span className={`transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <ul
                    className={`absolute z-50 mt-2 w-full rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${isDarkmodeActive
                        ? "bg-gray-700 text-gray-100 shadow-gray-900"
                        : "bg-white text-gray-900 shadow-gray-300"
                        }`}
                >
                    <li
                        onClick={() => handleSelect("All")}
                        className={`px-4 py-2 cursor-pointer transition-all duration-500 ${selected === null
                            ? isDarkmodeActive
                                ? "bg-gray-700"
                                : "bg-gray-100"
                            : ""
                            } hover:${isDarkmodeActive ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                        All
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category}
                            onClick={() => handleSelect(category)}
                            className={`w-150 px-4 py-2 cursor-pointer transition-all duration-500 ${selected === category
                                ? isDarkmodeActive
                                    ? "bg-gray-700"
                                    : "bg-gray-100"
                                : ""
                                } hover:${isDarkmodeActive ? "bg-gray-700" : "bg-gray-100"}`}
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
