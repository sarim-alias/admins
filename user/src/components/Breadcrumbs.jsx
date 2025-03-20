import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ paths = [] }) => {
        const navigate = useNavigate();
      
        return (
          <div className="flex items-center gap-2 text-sm mb-4 mt-2">
            {paths.map((path, index) => (
              <React.Fragment key={path.name}>
                <span
                  className={`${
                    path.link ? 'text-purple-400 hover:text-purple-300 cursor-pointer' : 'text-gray-400'
                  }`}
                  onClick={() => path.link && navigate(path.link)}
                >
                  {path.name}
                </span>
                {index < paths.length - 1 && (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        );
      };
      

export default Breadcrumbs;