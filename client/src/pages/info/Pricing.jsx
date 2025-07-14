import Layout from "../../components/Layout";

export default function Pricing() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Premium Notes Pricing</h1>

        <p className="mb-4">
          CollegeBuddy offers high-quality, exam-ready notes created by top-performing students and subject matter experts. Below is our pricing for premium notes.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Individual Notes (PDF):</strong> ₹9 – ₹49 per subject</li>
          <li><strong>Full Semester Pack:</strong> ₹99 – ₹299 (includes all notes for a semester)</li>
          <li><strong>Departmental Bundles:</strong> ₹399 – ₹599 (full year notes for a department)</li>
          <li><strong>Free Notes:</strong> Shared notes by users are available at no cost</li>
        </ul>

        <p className="mt-4">
          All purchases are processed securely via Razorpay. Once payment is complete, users get instant access to the notes in their account dashboard.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          Prices are inclusive of all taxes. Refunds are applicable only in case of technical issues or duplicate purchases.
        </p>
      </div>
    </Layout>
  );
}
