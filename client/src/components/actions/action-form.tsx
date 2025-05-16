
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Camera, Map, CheckCircle } from "lucide-react";

export default function ActionForm() {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    actionType: "",
    description: "",
    location: "",
    imageFile: null as File | null
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setStep(4);
  };
  
  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const actionTypes = [
    { id: 1, name: "Trồng cây", points: 50, icon: "🌱" },
    { id: 2, name: "Tái chế", points: 15, icon: "♻️" },
    { id: 3, name: "Tiết kiệm năng lượng", points: 10, icon: "💡" },
    { id: 4, name: "Phương tiện công cộng", points: 20, icon: "🚌" },
    { id: 5, name: "Dọn rác", points: 25, icon: "🧹" }
  ];
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress steps */}
      <div className="px-6 pt-6">
        <div className="flex justify-between mb-2">
          {["Loại hành động", "Mô tả", "Xác nhận", "Hoàn thành"].map((label, i) => (
            <span key={i} className={`text-sm ${step > i ? "text-green-600 font-medium" : "text-gray-500"}`}>
              {label}
            </span>
          ))}
        </div>
        <div className="flex h-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`h-full ${
                i <= step ? "bg-green-500" : "bg-gray-200"
              } ${i === 1 ? "rounded-l-full" : ""} ${
                i === 4 ? "rounded-r-full" : ""
              } ${i !== 4 ? "mr-1" : ""}`}
              style={{ flex: 1 }}
            />
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="px-6 pb-6">
        {/* Step 1: Loại hành động */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Chọn loại hành động xanh</h2>
            <p className="text-gray-600">Hãy chọn loại hành động bảo vệ môi trường bạn vừa thực hiện</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {actionTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, actionType: type.name })}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.actionType === type.name
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{type.name}</h3>
                        <p className="text-sm text-gray-500">+{type.points} điểm</p>
                      </div>
                    </div>
                    {formData.actionType === type.name && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-end pt-6">
              <motion.button
                type="button"
                onClick={nextStep}
                disabled={!formData.actionType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium text-white shadow transition-all duration-200 ${
                  formData.actionType
                    ? "bg-gradient-to-r from-green-600 to-green-500 hover:shadow-md"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Tiếp theo
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Mô tả và hình ảnh */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Mô tả hành động</h2>
            <p className="text-gray-600">Chia sẻ thêm thông tin về hành động xanh của bạn</p>
            
            <div className="space-y-4 pt-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Mô tả hành động bảo vệ môi trường của bạn..."
                  className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Địa điểm
                </label>
                <div className="relative">
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Nhập địa điểm thực hiện..."
                    className="block w-full rounded-xl border-gray-300 pl-10 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh minh họa
                </label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl ${
                  imagePreview ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-green-300"
                }`}>
                  {!imagePreview ? (
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center">
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                        >
                          <span>Tải ảnh lên</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">hoặc kéo thả vào đây</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF lên đến 10MB</p>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, imageFile: null });
                        }}
                        className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white"
                      >
                        <X size={16} />
                      </button>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto max-h-64 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-6">
              <motion.button
                type="button"
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Quay lại
              </motion.button>
              <motion.button
                type="button"
                onClick={nextStep}
                disabled={!formData.description || !formData.location}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium text-white shadow transition-all duration-200 ${
                  formData.description && formData.location
                    ? "bg-gradient-to-r from-green-600 to-green-500 hover:shadow-md"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Tiếp theo
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Xác nhận */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Xác nhận thông tin</h2>
            <p className="text-gray-600">Vui lòng kiểm tra lại thông tin trước khi gửi</p>
            
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Loại hành động</h3>
                  <p className="text-gray-600">{formData.actionType}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  Sửa
                </button>
              </div>
              
              <div className="flex justify-between items-start py-4 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Mô tả</h3>
                  <p className="text-gray-600">{formData.description}</p>
                  <h3 className="font-medium text-gray-900 mt-3">Địa điểm</h3>
                  <p className="text-gray-600">{formData.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  Sửa
                </button>
              </div>
              
              {imagePreview && (
                <div className="pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Ảnh minh họa</h3>
                  <img
                    src={imagePreview}
                    alt="Hành động xanh"
                    className="max-h-64 rounded-lg mx-auto"
                  />
                </div>
              )}
              
              <div className="pt-4">
                <div className="rounded-xl bg-green-50 border border-green-200 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Điểm thưởng</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Bạn sẽ nhận được <span className="font-bold">+20 điểm</span> sau khi gửi hành động này.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-6">
              <motion.button
                type="button"
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Quay lại
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-medium shadow hover:shadow-md transition-all duration-200"
              >
                Gửi hành động
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Step 4: Hoàn thành */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </motion.div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Hành động đã được ghi nhận!</h2>
            <p className="text-gray-600 mb-8">
              Cảm ơn bạn đã đóng góp hành động xanh cho cộng đồng. Bạn đã nhận được <span className="font-medium text-green-600">+20 điểm</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <motion.a
                href="/actions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Xem danh sách hành động
              </motion.a>
              <motion.a
                href="/actions/new"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-medium shadow hover:shadow-md transition-all duration-200"
              >
                Thêm hành động mới
              </motion.a>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}