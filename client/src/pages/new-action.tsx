
import { useState } from "react";
import { motion } from "framer-motion";
import ActionForm from "@/components/actions/action-form";

export default function NewAction() {
return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h1 className="text-3xl font-bold text-gray-900">Hành Động Xanh Mới</h1>
                <p className="mt-2 text-gray-600">
                    Chia sẻ hành động bảo vệ môi trường của bạn với cộng đồng
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <ActionForm />
            </motion.div>
        </div>
    </div>
);
}