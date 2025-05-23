import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewResumeCard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("./create")}
      className="group cursor-pointer rounded-lg bg-gradient-to-b dark:from-gray-800 from-gray-300 dark:to-gray-900 to-gray-400 dark:hover:from-gray-700 hover:from-gray-200
       dark:hover:to-gray-800 hover:to-gray-300 border dark:border-gray-700 border-gray-200 p-6 w-64 h-80 flex flex-col justify-center items-center transition duration-300"
    >
      <div className="dark:text-white text-black text-5xl mb-4 transition-transform duration-200 group-hover:scale-110">
        <Plus size={48} />
      </div>
      <h3 className="dark:text-white text-black text-lg font-semibold mb-1">Create a new resume</h3>
      <p className="dark:text-gray-400 text-gray-900  text-sm text-center">Start building from scratch</p>
    </div>
  );
}