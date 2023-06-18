import * as React from 'react';
import { createContext, useState, useEffect } from 'react';

type NotificationContextType = {
    showNotification: boolean;
    type: String;
    message: String;
    notificationHandler: (type: string, message: string) => void;
};

const NotificationContext = createContext({} as NotificationContextType);

export const NotificationProvider = ({ children }: any) => {
    const [showNotification, setShowNotification] = useState(false);
    const [type, setType] = useState<String>("");
    const [message, setMessage] = useState<String>("");

    useEffect(() => {
        const time = setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        return () => clearTimeout(time)
    }, [showNotification]);

    const notificationHandler = (type: string, message: string) => {
        setType(type);
        setMessage(message);
        setShowNotification(true);
    };

    return ( 
        <NotificationContext.Provider 
        value={{ notificationHandler, showNotification, type, message }}>
            {children}
        </NotificationContext.Provider>
     );
}
 
export default NotificationContext;