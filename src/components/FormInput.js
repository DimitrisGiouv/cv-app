
const FormInput = ({ label, error, registerProps }) => (
    <div className="mb-4">
        <label className="bloack font-semibold">{label}</label>
        <input
            {...registerProps} className="border p-2 w-full" />
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
)

export default FormInput;
// This component is a reusable input field for forms.