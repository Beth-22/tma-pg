import { useState } from "react";
import { CATEGORIES } from "../utils/constants";
import Button from "./Button";

const AddDestinationModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    note: "",
    category: CATEGORIES.NATURE,
    visited: false,
    liked: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-300/30">
        <div className="p-6">
          <h2 className="text-xl font-bold text-black mb-4">
            Add New Destination
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Destination Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-telegram-button bg-white text-black"
                placeholder="e.g., Paris, France"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Image URL (optional)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-telegram-button bg-white text-black"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-telegram-button bg-white text-black"
              >
                {Object.values(CATEGORIES).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Note (optional)
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => handleChange("note", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-telegram-button bg-white text-black"
                placeholder="Why do you want to visit this place?"
              />
            </div>

            {/* Status - Visited */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="visited"
                checked={formData.visited}
                onChange={(e) => handleChange("visited", e.target.checked)}
                className="w-4 h-4 text-telegram-button rounded focus:ring-telegram-button bg-white border-gray-300/30"
              />
              <label htmlFor="visited" className="text-sm text-black">
                I've already visited this place
              </label>
            </div>

            {/* Status - Liked */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="liked"
                checked={formData.liked}
                onChange={(e) => handleChange("liked", e.target.checked)}
                className="w-4 h-4 text-telegram-button rounded focus:ring-telegram-button bg-white border-gray-300/30"
              />
              <label htmlFor="liked" className="text-sm text-black">
                Add to liked destinations
              </label>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!formData.name.trim()}
              >
                Add Destination
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDestinationModal;
