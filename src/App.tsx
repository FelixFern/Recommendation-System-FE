import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ErrorAlert from "./components/ErrorAlert";
import LoadingAlert from "./components/LoadingAlert";
import TrainingAlert from "./components/TrainingAlert";

function App() {
    const API_URL = "https://flask-production-3edb.up.railway.app";

    // State
    const [customerID, setCustomerID] = useState<string>("");
    const [addCustomerID, setAddCustomerID] = useState<string>("");
    const [stockCode, setStockCode] = useState<string>("");
    const [itemDesc, setItemDesc] = useState<string>("");
    const [stockDataStockCode, setStockDataStockCode] = useState<string>("");
    const [transCustomerID, setTransCustomerID] = useState<string>("");
    const [transStockCode, setTransStockCode] = useState<string>("");
    const [transQty, setTransQty] = useState<number>(0);
    const [recommendation, setRecommendation] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isTraining, setIsTraining] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsError(false);
        }, 5000);
    }, [isError]);

    // Function
    const getRecommendation = () => {
        setIsLoading(true);
        axios
            .post(API_URL + "/predict", {
                CustomerID: parseInt(customerID),
            })
            .then((res) => {
                setRecommendation([...res.data.prediction]);
                console.log(recommendation);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
                setIsError(true);
            });
    };

    const addCustomerData = () => {};

    const addStockData = () => {};

    const addTransaction = () => {};

    const trainModel = () => {
        setIsTraining(true);
        axios
            .post(API_URL + "/train")
            .then((res) => {
                console.log(res);
                setIsTraining(false);
            })
            .catch((err) => {
                console.error(err);
                setIsTraining(false);
                setIsError(true);
            });
    };

    return (
        <div className="bg-zinc-800 h-screen w-screen overflow-hidden">
            <div className="w-10/12 mt-0 mx-auto">
                <div className="flex items-center gap-2 w-full justify-between mt-6 pb-5 border-b-2">
                    <h1 className="font-bold text-zinc-200 text-left text-xl rounded-md">
                        Recommendation System
                        <p className="text-xs text-blue-200">
                            Project by Moch. Nabil Farras (Backend) and Felix
                            Fernando (Frontend)
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
                    <LoadingAlert></LoadingAlert>
                ) : isError ? (
                    <ErrorAlert></ErrorAlert>
                ) : isTraining ? (
                    <TrainingAlert></TrainingAlert>
                ) : (
                    <></>
                )}

                <h2 className="font-bold text-white mt-4">
                    Recommend Item to User
                </h2>
                <div className="flex gap-4">
                    <form className="bg-slate-600 p-4 my-2 rounded-md w-1/3">
                        <label className="block mb-2 text-sm font-medium text-white">
                            Recommend Item
                        </label>
                        <div className="w-1/1 flex items-center gap-2">
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
                    </form>
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
                <div className="flex gap-8">
                    <div className="flex-1 w-full">
                        <h2 className="font-bold text-white mt-2">
                            Add Customer Data
                        </h2>
                        <form className="bg-slate-600 p-4 my-2 rounded-md w-full">
                            <label className="block mb-2 text-sm font-medium text-white">
                                Customer ID
                            </label>
                            <div className="w-1/1 flex items-center gap-2">
                                <input
                                    value={addCustomerID}
                                    onChange={(e: any) => {
                                        setAddCustomerID(e.target.value);
                                    }}
                                    type="text"
                                    id="cust_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Customer ID"
                                    required
                                />
                                <button
                                    onClick={() => addCustomerData()}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <h2 className="font-bold text-white mt-4">
                            Add Stock Data
                        </h2>
                        <form className="bg-slate-600 p-4 my-2 rounded-md w-fuil">
                            <div className="flex flex-col gap-2">
                                <div className="w-full">
                                    <label className="flex-1 block mb-2 text-sm font-medium text-white">
                                        Stock Code
                                    </label>
                                    <input
                                        value={stockCode}
                                        onChange={(e: any) => {
                                            setStockCode(e.target.value);
                                        }}
                                        type="text"
                                        id="stock_code"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Customer ID"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="flex-1 block mb-2 text-sm font-medium text-white">
                                        Item Description
                                    </label>
                                    <input
                                        value={itemDesc}
                                        onChange={(e: any) => {
                                            setItemDesc(e.target.value);
                                        }}
                                        type="text"
                                        id="item_desc"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Item Description"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => addStockData()}
                                className=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="flex-1">
                        <h2 className="font-bold text-white mt-2">
                            Add Transaction
                        </h2>
                        <form className="bg-slate-600 p-4 my-2 rounded-md w-fuil">
                            <div className="flex flex-col gap-2">
                                <div className="w-full">
                                    <label className="flex-1 block mb-2 text-sm font-medium text-white">
                                        Customer ID
                                    </label>
                                    <input
                                        value={transCustomerID}
                                        onChange={(e: any) => {
                                            setTransCustomerID(e.target.value);
                                        }}
                                        type="text"
                                        id="stock_code"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Customer ID"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="flex-1 block mb-2 text-sm font-medium text-white">
                                        Stock Code
                                    </label>
                                    <input
                                        value={transStockCode}
                                        onChange={(e: any) => {
                                            setTransStockCode(e.target.value);
                                        }}
                                        type="text"
                                        id="stock_code_trans"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Stock Code"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="flex-1 block mb-2 text-sm font-medium text-white">
                                        Quantity
                                    </label>
                                    <input
                                        value={transQty}
                                        onChange={(e: any) => {
                                            setTransQty(e.target.value);
                                        }}
                                        type="number"
                                        id="qty"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Quantity"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => addTransaction()}
                                className=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
