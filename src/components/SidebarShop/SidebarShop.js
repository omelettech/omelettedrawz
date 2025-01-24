import React, {useState} from "react";
import "./SidebarShop.css";

const SidebarShop = ({categories, filters, onFilterChange}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);


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
                <h4>Type</h4>

                <div className="filter-group">

                        {categories.map((category, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        onChange={(e) => onFilterChange(e.target.value)}
                                    />
                                    {category}
                                </label>
                            </div>
                        ))}

                </div>

                <div className="sidebar-section">
                    {filters.map((filter, index) => (
                       <>
                           <h5>{filter.name}</h5>
                           <div key={index} className="filter-group">


                               {filter.options.map((option, idx) => (
                                   <a key={idx}>

                                       {/*<input*/}
                                       {/*    type={filter.type}*/}
                                       {/*    value={option}*/}
                                       {/*    onChange={(e) => onFilterChange(e.target.value)}*/}
                                       {/*/>*/}

                                       {option}

                                   </a>

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
