
const FormInput = ({ label, error, registerProps }) => (
    <div className="mb-4">
        <label className="bloack font-semibo text-sm">{label}</label>
        <input
            {...registerProps} className="border p-2 w-full h-7  co " />
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
)

export default FormInput;
