import React from "react";

const Textarea = (props) => {
    return (
        <div className="mt-2">
            <textarea
                rows={props.row}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                value={props.value}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => props.change(props.name, e.target.value)}
            />
            <span className="text-red-600 text-xs">{props.error}</span>
        </div>
    );
};

export default Textarea;
