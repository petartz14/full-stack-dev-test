import React from "react";

const getItems = (items) => {
    let content = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        content.push(
            <div
                className=" capitalize p-4 rounded shadow bg-gray-50 mb-3 text-sm"
                key={item.id}
            >
                {item.description}
            </div>
        );
    }
    return content;
};

const Index = (props) => {
    return (
        <div className=" container max-w-7xl m-auto py-6">
            <div className=" grid grid-cols-3 gap-4">
                <div className="bg-white shadow p-3">
                    <h3 className=" font-semibold text-lg tracking-wider uppercase pb-3 border-b border-gray-100">
                        Todo
                    </h3>
                    <div className="pt-3">{getItems(props.todoTodos)}</div>
                </div>
            </div>
        </div>
    );
};

export default Index;
