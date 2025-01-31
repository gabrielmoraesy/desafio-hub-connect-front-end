import { createContext, useContext, ReactNode } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
    title: string;
    description?: string;
    duration?: number;
}

interface ToastContextProps {
    showToast: (type: ToastType, options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const showToast = (type: ToastType, options: ToastOptions) => {
        toaster.create({
            title: options.title,
            description: options.description || "",
            type: type,
            duration: options.duration || 3000,
        });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster />
        </ToastContext.Provider>
    );
};

// const getToastColor = (type: ToastType): string => {
//     switch (type) {
//         case "success":
//             return "#38A169";
//         case "error":
//             return "#E53E3E";
//         case "warning":
//             return "#D69E2E";
//         case "info":
//             return "#3182CE";
//         default:
//             return "#333";
//     }
// };

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
