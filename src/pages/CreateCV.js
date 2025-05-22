import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";

function CreateCV() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("Resume Data", data);
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Your CV</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Full Name"
                    error={errors.name?.message}
                    registerProps={register("name", { required: "Name is required" })}
                />
                <FormInput
                    label="Email"
                    error={errors.email?.message}
                    registerProps={register("email", { required: "Email is required" })}
                />
                <FormInput
                    label="Phone Number"
                    error={errors.phone?.message}
                    registerProps={register("phone", { required: "Phone number is required" })}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
            <Link to="/preview">
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                    Preview CV
                </button>
            </Link>
        </div>
    );
}
export default CreateCV;
