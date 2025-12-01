import { useState } from "react";

export default function Test() {
    const [num, setNum] = useState(0);
    return (
        <div className="w-full h-[100vh] bg-amber-700 flex items-center justify-center">
            <div className="w-[300px] h-[300px] bg-amber-50 flex items-center justify-center">
                <button className="w-[40px] h-[40px] bg-blue-400 rounded-full text-white text-4xl items-center justify-center flex hover:bg-blue-600"
                onClick={
                    () => {
                        const newNum = num - 1;
                        setNum(newNum);
                    }
                }
                >-</button>

                <span className="mx-4 text-2xl font-semibold">{num}</span>
                <button className="w-[40px] h-[40px] bg-blue-400 rounded-full text-white text-4xl items-center justify-center flex hover:bg-blue-600"
                onClick={
                    () => {
                        const newNum = num + 1;
                        setNum(newNum);A
                    }
                }
                >+</button>
            </div>
        </div>
    )
}