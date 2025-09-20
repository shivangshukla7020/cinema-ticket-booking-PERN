import React, { useState } from 'react';
import FormData from './FormData';

function ModalForm({ data, isShow }) {
  const [show, setShow] = useState(isShow || false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleShow}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Edit
      </button>

      {/* Modal Overlay */}
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal Container */}
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-lg relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h2 className="text-lg font-bold">Edit Information</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4">
              <FormData handleClose={handleClose} data={data} />
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t px-4 py-3 space-x-2">
              <button
                onClick={handleClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="form-edit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalForm;
