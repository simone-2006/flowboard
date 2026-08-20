import Button from "./Button";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react";

export default function ConfirmModal({ isOpen, title = "Confirm action?", message = "", confirmButtonVariant = "success", onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed flex items-center justify-center bg-black/20 w-full h-full left-0 top-0">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white rounded-md shadow-md max-w-100 min-h-30 p-4 flex flex-col gap-4 items-center justify-between">
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="font-bold text-xl">{title}</h1>
                    <p className="text-gray-600 text-xs">{message}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={onCancel} variant="ghost" icon={<ChevronLeft />}>Back</Button>
                    <Button onClick={onConfirm} variant={confirmButtonVariant}>Confirm</Button>
                </div>
            </motion.div>
        </motion.div>
    );
}