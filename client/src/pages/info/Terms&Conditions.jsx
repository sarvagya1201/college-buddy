import Layout from "../../components/Layout";

export default function TermsAndConditions() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Terms & Conditions</h1>

        <p className="mb-4">
          Welcome to CollegeBuddy. By accessing or using our platform, you agree to the following terms and conditions:
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. User Accounts</h2>
        <p>
          You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Content</h2>
        <p>
          All content (notes, reviews, etc.) is for educational purposes only. Reselling or unauthorized distribution of content is prohibited.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Payments & Access</h2>
        <p>
          Premium notes can be accessed only after successful payment. All payments are processed securely through Razorpay.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
        <p>
          We reserve the right to suspend or delete user accounts for misuse, policy violations, or suspicious activity.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p>
          CollegeBuddy reserves the right to update these terms anytime. Users will be notified via email or platform notification.
        </p>
      </div>
    </Layout>
  );
}
