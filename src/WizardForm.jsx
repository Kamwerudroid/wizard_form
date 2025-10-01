import React, { useState, useCallback, useMemo } from 'react';

// --- Step 1 Personal Info---

const Step1Personal = ({ formData, handleChange, nextStep }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-black">1. Personal Information</h2>
        <p className="text-gray-600">Tell us a bit about yourself.</p>

        <div className="flex flex-col space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
        </div>

        <div className="flex justify-end">
            <button
                onClick={nextStep}
                disabled={!formData.name || !formData.email}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition duration-200 shadow-md"
            >
                Next Step &rarr;
            </button>
        </div>
    </div>
);

// --- Step 2 Address ---

const Step2Address = ({ formData, handleChange, nextStep, prevStep }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">2. Address Details</h2>
        <p className="text-gray-600">Which is your prefered internet package?</p>

        <div className="flex flex-col space-y-4">
            <textarea
                name="address"
                placeholder="Building Name"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <input
                type="text"
                name="city"
                placeholder="City / Town"
                value={formData.city}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <input
                type="text"
                name="county"
                placeholder="County"
                value={formData.county}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <select
                name="subscription"
                value={formData.subscription}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white"
            >
                
                <option value="premium">Premium Subscription</option>
                <option value="pro">Gold Subscription </option>
                <option value="pro">Silver Subscription </option>
                <option value="pro">Bronze Subscription </option>
                <option value="basic">Basic Subscription</option>
            </select>
        </div>

        <div className="flex justify-between pt-4">
            <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
            >
                &larr; Back
            </button>
            <button
                onClick={nextStep}
                disabled={!formData.address || !formData.city}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition duration-200 shadow-md"
            >
                Review & Confirm &rarr;
            </button>
        </div>
    </div>
);

// --- Step 3 Confirmation ---

const Step3Confirmation = ({ formData, submitForm, prevStep }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">3. Review and Submit</h2>
        <p className="text-gray-600">Please review your details before submission.</p>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner space-y-3">
            <DetailItem label="Name" value={formData.name} />
            <DetailItem label="Email" value={formData.email} />
            <DetailItem label="Address" value={`${formData.address}, ${formData.city},${formData.county}`} />
            <DetailItem label="Subscription" value={formData.subscription.toUpperCase()} isPrimary={true} />
        </div>

        <div className="flex justify-between pt-4">
            <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
            >
                &larr; Back to Edit
            </button>
            <button
                onClick={submitForm}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200 shadow-md flex items-center space-x-2"
            >
                <span>Complete Registration</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </button>
        </div>
    </div>
);

// Helper component for displaying review details
const DetailItem = ({ label, value, isPrimary = false }) => (
    <div className="flex justify-between border-b border-gray-100 py-1">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className={`font-semibold ${isPrimary ? 'text-blue-600' : 'text-gray-800'}`}>{value}</span>
    </div>
);


//  Main App Component 
const initialData = {
    name: '',
    email: '',
    address: '',
    city: '',
    subscription: 'basic',
};

const STEPS = [
    { title: 'Personal', component: Step1Personal },
    { title: 'Address', component: Step2Address },
    { title: 'Confirm', component: Step3Confirmation },
];

function WizardForm() {
    // 1. STATE MANAGEMENT for form data and step index
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialData);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handler to update form data in the parent App state
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    
    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    
    const submitForm = () => {
        console.log("Form Submitted with Data:", formData);
        
        setTimeout(() => {
            setIsSubmitted(true);
            
        }, 500);
    };

    // Props bundle to pass down to the current step component
    const stepProps = useMemo(() => ({
        formData,
        handleChange,
        nextStep,
        prevStep,
        submitForm
    }), [formData, handleChange]);

    const CurrentStepComponent = STEPS[currentStep].component;

    // --- Render Logic ---
    if (isSubmitted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-lg text-center space-y-6">
                    <div className="text-green-500 mx-auto w-16 h-16">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Registration Complete!</h1>
                    <p className="text-lg text-gray-600">Thank you, **{formData.name}**.</p>
                    <p className="text-sm text-gray-500">Your data has been successfully processed.</p>
                    <button
                        onClick={() => { setIsSubmitted(false); setCurrentStep(0); setFormData(initialData); }}
                        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
                    >
                        Start New Registration
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-xl">
                <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
                    Internet Package Registration Form
                </h1>

                {/* Step Indicator (Progress Bar) */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-2">
                        {STEPS.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <span className={`text-sm font-medium ${index === currentStep ? 'text-indigo-600' : 'text-gray-400'}`}>
                                    {index + 1}. {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                
                <CurrentStepComponent {...stepProps} />
            </div>
        </div>
    );
}
export default WizardForm;