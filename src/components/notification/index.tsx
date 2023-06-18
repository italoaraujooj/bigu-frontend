import { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";

const Notification = () => {
    const { type, message } = useContext(NotificationContext);

    return (
        <>
            {type === "success" && (
                <div className="fixed top-0 right-4 bg-blue-200 p-2 m-4 flex gap-2 rounded-md">
                    <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                    </svg>
                    <p className="text-green-500" >
                        {message}
                    </p>
                </div>
            )}
            {type === "fail" && (
                <div className="fixed top-0 right-4 bg-blue-200 p-2 m-4 flex gap-2 rounded-md">
                    <svg width="24" height="24" fill="none" stroke="#ea0000" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-green-500" >
                        {message}
                    </p>
                </div>
            )}

        </>
    );
}

export default Notification;