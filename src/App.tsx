import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const API_URL = "https://flask-production-3edb.up.railway.app";

    const [customerID, setCustomerID] = useState<string>("");
    const [recommendation, setRecommendation] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRecommendation = () => {
        setIsLoading(true);
        axios
            .post(API_URL + "/predict", {
                CustomerID: parseInt(customerID),
            })
            .then((res) => {
                if (res.data.predictions) {
                    setRecommendation([...res.data.prediction]);
                }
                console.log(recommendation);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    const trainModel = () => {
        setIsLoading(true);
        axios
            .post(API_URL + "/train")
            .then((res) => {
                console.log(res);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="bg-zinc-800 h-screen w-screen overflow-hidden">
            <div className="w-10/12 mt-0 mx-auto">
                <div className="flex items-center gap-2 w-full justify-between mt-6 pb-5 border-b-2">
                    <h1 className="font-bold text-zinc-200 text-left text-xl rounded-md">
                        Recommendation System
                        <p className="text-xs text-blue-200">
                            Project by Moch. Nabil Farras
                        </p>
                    </h1>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => trainModel()}
                        disabled={isLoading}
                    >
                        Train Model
                    </button>
                </div>

                {isLoading ? (
                    <div
                        className="flex p-4 my-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                        role="alert"
                    >
                        <svg
                            aria-hidden="true"
                            className="flex-shrink-0 inline w-5 h-5 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">
                                Recommending Item!
                            </span>{" "}
                            Please Wait a minute while we process the
                            recommendation..
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                <h2 className="font-bold text-white mt-4">
                    Recommend Item to User
                </h2>
                <div className="flex gap-3">
                    <div className="bg-slate-600 p-4 my-2 rounded-md w-fit">
                        <label className="block mb-2 text-sm font-medium text-white">
                            Recommend Item
                        </label>
                        <div className="w-fit flex items-center gap-2">
                            <input
                                value={customerID}
                                onChange={(e: any) => {
                                    setCustomerID(e.target.value);
                                }}
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Customer ID"
                                required
                            />
                            <button
                                onClick={() => getRecommendation()}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="bg-slate-600 p-4 my-2 rounded-md flex-1">
                        <p className="text-white font-medium text-md">
                            Recommended Item Code :{" "}
                        </p>
                        {recommendation?.length === 0 ? (
                            <p className="text-white text-sm">
                                No recommendation yet
                            </p>
                        ) : (
                            <ul>
                                {recommendation?.map(
                                    (rec: string, index: number) => {
                                        return (
                                            <li
                                                className="text-white text-sm"
                                                key={index}
                                            >
                                                {rec}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
