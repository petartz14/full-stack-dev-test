import Textarea from "@/Components/Textarea.jsx";

import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const getItems = (items, destroy, handleEditForm) => {
    let content = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        content.push(
            <div
                className="capitalize p-4 rounded shadow bg-gray-50 mb-3 text-sm group"
                key={item.id}
            >
                <div className="flex items-center ">
                    <div className="truncate">{item.description}</div>
                    <div className="ml-auto flex">
                        <div
                            className="pr-2 pl-10 cursor-pointer text-blue-600"
                            onClick={(e) =>
                                handleEditForm(e, item.description, item.id)
                            }
                        >
                            Edit
                        </div>
                        <div
                            className=" cursor-pointer text-red-600"
                            onClick={(e) => destroy(e, item.id)}
                        >
                            Delete
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return content;
};

const storeForm = (data, change, store, processing, errors) => {
    return (
        <form onSubmit={store}>
            <Textarea
                id="description"
                name="description"
                placeholder="Input todo description..."
                value={data.description}
                change={change}
                error={errors["description"]}
            />
            <div className="flex mt-2">
                <button
                    disabled={processing}
                    className="py-1 px-4 text-sm ml-auto bg-blue-600 text-white rounded hover:bg-blue-800"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

const updateForm = (data, change, update, processing, errors, updateStatus) => {
    return (
        <form onSubmit={(e) => update(e, data.id)}>
            <Textarea
                id="description"
                name="description"
                placeholder="Input todo description..."
                value={data.description}
                change={change}
                error={errors["description"]}
            />
            <div className="flex mt-2">
                <div className="ml-auto">
                    <button
                        type="button"
                        disabled={processing}
                        className="py-1 px-4 text-sm mr-1 bg-teal-600 text-white rounded hover:bg-teal-800"
                        onClick={(e) => updateStatus(e, data.id, "completed")}
                    >
                        Mark as complete
                    </button>
                    <button
                        disabled={processing}
                        className="py-1 px-4 text-sm bg-blue-600 text-white rounded hover:bg-blue-800"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
};

const Index = (props) => {
    const [showCreateForm, setshowCreateForm] = useState(false);
    const [showEditForm, setshowEditForm] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        id: "",
        description: "",
    });

    const change = (key, value) => {
        setData(key, value);
    };

    const store = (e) => {
        e.preventDefault();
        post("/todos");
        data.description = "";
        setshowCreateForm(false);
    };

    const update = (e, id) => {
        e.preventDefault();
        put("/todos/" + id);
        data.description = "";
        setshowEditForm(false);
    };

    const updateStatus = (e, id, status) => {
        e.preventDefault();
        put(`/todos/${id}/${status}`);
        data.description = "";
        setshowEditForm(false);
    };

    const destroy = (e, id) => {
        e.preventDefault();
        router.delete("/todos/" + id);
        data.description = "";
        setshowCreateForm(false);
    };

    const handleCreateForm = (e) => {
        e.preventDefault();
        setshowCreateForm(true);
        setshowEditForm(false);
    };
    const handleEditForm = (e, value, id) => {
        e.preventDefault();
        data.id = id;
        data.description = value;
        setshowCreateForm(false);
        setshowEditForm(true);
    };

    return (
        <div className=" container max-w-7xl m-auto py-6">
            <div className=" grid grid-cols-2 gap-8">
                <div className="bg-white shadow p-3">
                    <div className=" flex items-center pb-3 border-b border-gray-100">
                        <h3 className=" font-semibold text-lg tracking-wider uppercase">
                            Todo
                        </h3>
                        <div
                            className="ml-auto text-blue-600 cursor-pointer"
                            onClick={handleCreateForm}
                        >
                            Add
                        </div>
                    </div>
                    {showCreateForm
                        ? storeForm(data, change, store, processing, errors)
                        : null}
                    {showEditForm
                        ? updateForm(
                              data,
                              change,
                              update,
                              processing,
                              errors,
                              updateStatus
                          )
                        : null}
                    <div className="pt-3">
                        {getItems(props.todoTodos, destroy, handleEditForm)}
                    </div>
                </div>

                <div className="bg-white shadow p-3">
                    <div className=" flex items-center pb-3 border-b border-gray-100">
                        <h3 className=" font-semibold text-lg tracking-wider uppercase">
                            Completed Todo
                        </h3>
                    </div>
                    <div className="pt-3">
                        {getItems(props.completeTodos, destroy, handleEditForm)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
