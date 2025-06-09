import "../styles/forms.css";

    export function FormInput({ label, error, registerProps, fontSize = "text-base" }) {
        return (
        <div className="mb-4">
            <label className="label-title">{label}</label>
            <input {...registerProps} className={`input-field ${fontSize}`} />
            {error && <span className="error">{error}</span>}
        </div>
        );
    }

    export function FormInput2({label1,label2,error1,error2,registerProps1,registerProps2}) {
        return (
            <div className="mb-4">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="label-title">{label1}</label>
                        <input {...registerProps1} className="input-field" />
                        {error1 && <span className="error">{error1}</span>}
                    </div>
                    <div className="w-1/2">
                        <label className="label-title">{label2}</label>
                        <input {...registerProps2} className="input-field" />
                        {error2 && <span className="error">{error2}</span>}
                    </div>
                </div>
            </div>
        );
    }

    export function FormP({label,error,registerProps}) {
        return (
            <div className="mb-4">
                <label className="label-title">{label}</label>
                <textarea {...registerProps} className="input-field-p"rows={5} />
                {error && <span className="error">{error}</span>}
            </div>
        );
    }

    export function FormRegister({placeholder,error,registerProps}) {
        return (
            <div className="mb-1" >
                <input {...registerProps}  placeholder={placeholder} className="input-field-register" />
                {error && <span className="error-register">{error}</span>}
            </div>
        );
    }

