"use client";
import React, { useState } from 'react';

interface LabOrder {
  orderDate: string;
  orderingPhysician: string;
  priority: string;
  specimenType: string;
  testCategory: string;
  diagnosis: string;
  specialInstructions: string;
}

interface LabOrderFormProps {
  labOrders: LabOrder[];
  onSave: (newLabOrders: LabOrder[]) => void;
}

const LabOrderForm: React.FC<LabOrderFormProps> = ({ labOrders, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLabOrders, setCurrentLabOrders] = useState<LabOrder[]>(labOrders);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (index: number, field: keyof LabOrder, value: string) => {
    const updatedLabOrders = [...currentLabOrders];
    updatedLabOrders[index][field] = value;
    setCurrentLabOrders(updatedLabOrders);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleAddLabOrder = () => {
    setCurrentLabOrders([
      ...currentLabOrders,
      {
        orderDate: getCurrentDate(),
        orderingPhysician: 'Dr. John Doe', //  actual logic will go here wai
        priority: '',
        specimenType: '',
        testCategory: '',
        diagnosis: '',
        specialInstructions: '',
      },
    ]);
  };

  const handleDeleteLabOrder = (index: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lab order?");
    if (confirmDelete) {
      const updatedLabOrders = [...currentLabOrders];
      updatedLabOrders.splice(index, 1);
      setCurrentLabOrders(updatedLabOrders);
    }
  };

  const handleSaveLabOrders = () => {
    if (currentLabOrders.length === 0) return;
    const confirmSave = window.confirm("Are you sure you want to save?");
    if (confirmSave) {
      onSave(currentLabOrders);
      setIsExpanded(false);
      console.log("Saved");
    }
  };

  const testCategories: Record<string, string[]> = {
    'Whole Blood': ['CBC', 'BF for Malaria', 'Blood Glucose', 'BF for malaria', 'Blood Film Comment', 'Lipid Panel'],
    'Plasma': ['Electrolytes', 'Hormone Levels'],
    'Serum': ['Liver Function Tests', 'Kidney Function Tests'],
    'Urine': ['Urinalysis', 'Urine Culture'],
    'Stool': ['Stool Analysis', 'Stool Culture', 'H-Pylori'],
    'Sputum': ['Sputum Culture', 'Acid-Fast Bacillus (AFB) test', 'Gene Xpert'],
    'N/A': ['MRI', 'CT Scan', 'X-ray', 'Ultrasound'],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center bg-[#28313B] text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Lab Orders</h2>
        <button
          onClick={handleToggleExpand}
          className="text-xl bg-gray-700 hover:bg-gray-600 text-white rounded-full p-1"
        >
          {isExpanded ? '-' : '+'}
        </button>
      </div>
      {isExpanded && (
        <div className="p-4">
          {currentLabOrders.map((labOrder, index) => (
            <div key={index} className="border p-4 mt-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="orderingPhysician"
                  placeholder="Ordering Physician"
                  value={labOrder.orderingPhysician}
                  readOnly
                  className="p-2 border rounded bg-gray-100"
                />
                <input
                  type="date"
                  name="orderDate"
                  value={labOrder.orderDate}
                  readOnly
                  className="p-2 border rounded bg-gray-100"
                />
                <select
                  name="priority"
                  value={labOrder.priority}
                  onChange={(e) => handleInputChange(index, 'priority', e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Priority</option>
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Stat">Stat</option>
                </select>
                <select
                  name="specimenType"
                  value={labOrder.specimenType}
                  onChange={(e) => handleInputChange(index, 'specimenType', e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Specimen Type</option>
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="Plasma">Plasma</option>
                  <option value="Serum">Serum</option>
                  <option value="Urine">Urine</option>
                  <option value="Stool">Stool</option>
                  <option value="Sputum">Sputum</option>
                  <option value="N/A">N/A</option>
                </select>
                <select
                  name="testCategory"
                  value={labOrder.testCategory}
                  onChange={(e) => handleInputChange(index, 'testCategory', e.target.value)}
                  className="p-2 border rounded"
                  disabled={!labOrder.specimenType}
                >
                  <option value="">Select Test Category</option>
                  {labOrder.specimenType && testCategories[labOrder.specimenType]?.map((test) => (
                    <option key={test} value={test}>{test}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="diagnosis"
                  placeholder="Diagnosis or Reason for Test"
                  value={labOrder.diagnosis}
                  onChange={(e) => handleInputChange(index, 'diagnosis', e.target.value)}
                  className="p-2 border rounded"
                />
                <textarea
                  name="specialInstructions"
                  placeholder="Special Instructions"
                  value={labOrder.specialInstructions}
                  onChange={(e) => handleInputChange(index, 'specialInstructions', e.target.value)}
                  className="p-2 border rounded col-span-2"
                />
              </div>
              <button
                onClick={() => handleDeleteLabOrder(index)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button onClick={handleAddLabOrder} className="bg-green-500 text-white p-2 rounded">
              Add
            </button>
            <button
              onClick={handleSaveLabOrders}
              className="bg-green-500 text-white p-2 rounded"
              disabled={currentLabOrders.length === 0}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabOrderForm;
