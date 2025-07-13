import Layout from "../../components/Layout";

export default function RefundPolicy() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Cancellation & Refund Policy</h1>

        <h2 className="text-xl font-semibold mt-4 mb-2">1. Cancellations</h2>
        <p>
          Once premium notes are purchased, cancellations are not permitted due to the digital nature of the content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Refunds</h2>
        <p>
          Refunds are only allowed in the following cases:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Technical failure in download access</li>
          <li>Duplicate payment or accidental double purchase</li>
          <li>Content not matching the title or description</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Refund Process</h2>
        <p>
          To request a refund, please contact us at <strong>finalyrdata12@gmail.com</strong> within 3 days of purchase. Refunds are processed within 5–7 business days.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact</h2>
        <p>
          For cancellation or refund issues, contact:<br />
          <strong>Email:</strong> finalyrdata12@gmail.com<br />
          <strong>Phone:</strong> +91-8770475998
        </p>
      </div>
    </Layout>
  );
}
