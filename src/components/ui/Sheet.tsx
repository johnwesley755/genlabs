import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface SheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Sheet = ({ isOpen, onClose, children }: SheetProps) => {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return createPortal(
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Sheet Drawer */}
            <div 
                ref={sheetRef}
                className={`fixed top-0 right-0 h-full w-[85vw] max-w-md bg-genMain z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Close Button Header */}
                <div className="flex justify-end p-6">
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-8 pb-8">
                    {children}
                </div>
            </div>
        </>,
        document.body
    );
};

export default Sheet;
