import Button from "./Button";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ConfirmModal({
    isOpen,
    title = "Confirm action?",
    message = "",
    confirmButtonVariant = "success",
    confirmButtonText = "Confirm",
    cancelButtonText = "Back",
    onConfirm,
    onCancel,
}) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/40"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-md shadow-md max-w-100 min-h-30 p-4 flex flex-col gap-4 items-center justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-xl text-center text-black dark:text-white">{title}</h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{message}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button onClick={onCancel} variant="ghost">
                                {cancelButtonText}
                            </Button>
                            <Button onClick={onConfirm} variant={confirmButtonVariant}>
                                {confirmButtonText}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
