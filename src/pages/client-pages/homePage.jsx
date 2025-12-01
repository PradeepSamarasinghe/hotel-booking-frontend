import Header from "../../components/header/header.jsx";

export default function HomePage() {
    return (
    <>
      <Header />

      <div className="w-full h-screen bg-[#f9dfff] flex flex-col items-center">
        <div className="w-[750px] bg-white rounded-xl shadow-md p-8 space-y-6">

          {/* Form (Horizontal line preserved) */}
          <div className="flex items-center gap-9 justify-center">
            <input
              type="date"
              className="border rounded-md px-3 py-2 w-[150px] focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />

            <input
              type="date"
              className="border rounded-md px-3 py-2 w-[150px] focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />

            <select className="border rounded-md px-3 py-2 w-[120px] focus:outline-none focus:ring-2 focus:ring-fuchsia-400">
              <option>Luxury</option>
              <option>Double</option>
              <option>Normal</option>
            </select>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ">
              Check
            </button>
          </div>

        </div>
        <h1 className="text-3xl font-bold mt-6">Welcome to the LUXURY CROWN</h1>
      </div>
    </>
  );
}