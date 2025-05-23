import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";
import "../styles/pageStyle.css";

function CreateCV() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("Resume Data", data);
    };
    return (
        <div className="container">
            <div className="container-left-create">
                <h2 className="section-title">Create Your CV</h2>
                <div className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6">
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
                        
                        <Link to="/preview">
                            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                                Preview CV
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
            <div className="container-right-create">
            </div>
        </div>
    );
}
export default CreateCV;
