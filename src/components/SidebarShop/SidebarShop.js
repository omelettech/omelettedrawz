import React, {useState} from "react";
import "./SidebarShop.css";

const SidebarShop = ({categories, filters, onFilterChange}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);


    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                <h3>Filters</h3>
                <button onClick={handleCollapse}>
                    {isCollapsed ? "Expand" : "Collapse"}
                </button>
            </div>

            <div className="sidebar-content">
                <div className="sidebar-section">
                    <h4>Categories</h4>
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        onChange={(e) => onFilterChange(e.target.value)}
                                    />
                                    {category}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sidebar-section">
                    {filters.map((filter, index) => (
                       <>
                           <h5>{filter.name}</h5>
                           <div key={index} className="filter-group">


                               {filter.options.map((option, idx) => (
                                   <label key={idx}>

                                       <input
                                           type={filter.type}
                                           value={option}
                                           onChange={(e) => onFilterChange(e.target.value)}
                                       />

                                       {option}

                                   </label>

                               ))}

                           </div>
                       </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SidebarShop;
