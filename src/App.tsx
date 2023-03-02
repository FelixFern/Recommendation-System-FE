import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ErrorAlert from "./components/ErrorAlert";
import LoadingAlert from "./components/LoadingAlert";
import SuccessAlert from "./components/SuccessAlert";
import TrainingAlert from "./components/TrainingAlert";

function App() {
    const API_URL = "https://flask-production-3edb.up.railway.app";

    // State
    const [customerID, setCustomerID] = useState<string>("");
    const [addCustomerID, setAddCustomerID] = useState<string>("");
    const [stockCode, setStockCode] = useState<string>("");
    const [itemDesc, setItemDesc] = useState<string>("");
    const [transCustomerID, setTransCustomerID] = useState<string>("");
    const [transStockCode, setTransStockCode] = useState<string>("");
    const [transQty, setTransQty] = useState<number>(0);
    const [recommendation, setRecommendation] = useState<Array<any>>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsError(false);
            setIsSuccess(false);
        }, 5000);
    }, [isError, isSuccess]);

    // Function
    const getRecommendation = () => {
        setIsLoading(true);
        axios
            .post(API_URL + "/predict", {
                CustomerID: parseInt(customerID),
            })
            .then((res) => {
                setRecommendation([...res.data.prediction]);
                setIsLoading(false);
                setCustomerID("");
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
                setIsError(true);
            });
    };

    const addCustomerData = () => {
        setIsLoading(true);
        axios
            .post(API_URL + "/updateUsers", {
                CustomerID: parseInt(addCustomerID),
            })
            .then((res) => {
                setIsLoading(false);
                setIsSuccess(true);
                setAddCustomerID("");
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsError(true);
            });
    };

    const addStockData = () => {
        setIsLoading(true);
        axios
            .post(API_URL + "/updateStocks", {
                StockCode: parseInt(stockCode),
                Desciption: itemDesc,
            })
            .then((res) => {
                setIsLoading(false);
                setIsSuccess(true);
                setStockCode("");
                setItemDesc("");
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsError(true);
            });
    };

    const addTransaction = () => {
        setIsLoading(true);
        axios
            .post(API_URL + "/updateTransactions", {
                CustomerID: parseInt(transCustomerID),
                StockCode: parseInt(transStockCode),
                value: transQty,
            })
            .then((res) => {
                setIsLoading(false);
                setIsSuccess(true);
                setTransCustomerID("");
                setTransStockCode("");
                setTransQty(0);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsError(true);
            });
    };

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
        <div className="w-screen h-screen overflow-hidden bg-zinc-800">
            <div className="w-10/12 mx-auto mt-0">
                <div className="flex items-center justify-between w-full gap-2 pb-5 mt-6 border-b-2 ">
                    <h1 className="text-xl font-bold text-left rounded-md text-zinc-200">
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
                ) : isSuccess ? (
                    <SuccessAlert></SuccessAlert>
                ) : (
                    <></>
                )}

                <h2 className="mt-4 font-bold text-white">
                    Recommend Item to User
                </h2>
                <div className="flex gap-4">
                    <form className="w-1/3 p-4 my-2 rounded-md bg-slate-600">
                        <label className="block mb-2 text-sm font-medium text-white">
                            Recommend Item
                        </label>
                        <div className="flex items-center gap-2 w-1/1">
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
                    <div className="flex-1 p-4 my-2 rounded-md bg-slate-600">
                        <p className="font-medium text-white text-md">
                            Recommended Item Code :{" "}
                        </p>
                        {recommendation?.length === 0 ? (
                            <p className="text-sm text-white">
                                No recommendation yet
                            </p>
                        ) : (
                            <ul>
                                {recommendation?.map(
                                    (rec: string, index: number) => {
                                        return (
                                            <li
                                                className="text-sm text-white"
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
                        <h2 className="mt-2 font-bold text-white">
                            Add Customer Data
                        </h2>
                        <form className="w-full p-4 my-2 rounded-md bg-slate-600">
                            <label className="block mb-2 text-sm font-medium text-white">
                                Customer ID
                            </label>
                            <div className="flex items-center gap-2 w-1/1">
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
                        <h2 className="mt-4 font-bold text-white">
                            Add Stock Data
                        </h2>
                        <form className="p-4 my-2 rounded-md bg-slate-600 w-fuil">
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
                        <h2 className="mt-2 font-bold text-white">
                            Add Transaction
                        </h2>
                        <form className="p-4 my-2 rounded-md bg-slate-600 w-fuil">
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
