import React from "react";
import { useForm } from "react-hook-form";
import {FormInput} from "../components/FormInput";
import {FormInput2} from "../components/FormInput";
import {FormP} from "../components/FormInput";
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
                        <FormInput2
                            label1="Email"
                            label2="Website"
                            error1={errors.email?.message}
                            registerProps1={register("email", { required: "Email is required" })}
                        />
                        <FormInput2
                            label1="Phone"
                            label2="Location"
                            error1={errors.phone?.message}
                            error2={errors.location?.message}
                            registerProps1={register("phone", { required: "Phone is required" })}
                            registerProps2={register("location", { required: "Location is required" })}
                        />
                        <FormInput
                            label="Phone Number"
                            error={errors.phone?.message}
                            registerProps={register("phone", { required: "Phone number is required" })}
                        />
                        <FormInput2
                            label1="Alternate Phone 1"
                            label2="Alternate Phone 2"
                            error1={errors.alternate1?.message}
                            error2={errors.alternate2?.message}
                            registerProps1={register("alternate1", { required: "Alternate phone 1 is required" })}
                            registerProps2={register("alternate2", { required: "Alternate phone 2 is required" })}
                        />
                        <FormP
                            label="Summary"
                            error={errors.summary?.message}
                            registerProps={register("summary", { required: "Summary is required" })}
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
            <h2>Select Tamplaet</h2>
        </div>
    );
}
export default CreateCV;
