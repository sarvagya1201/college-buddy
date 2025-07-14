import Layout from "../../components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At CollegeBuddy, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Name, email address, and account info during sign up</li>
          <li>Usage data for improving user experience</li>
          <li>Payment details (processed via Razorpay — not stored on our servers)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To personalize your experience on our platform</li>
          <li>To provide access to purchased content</li>
          <li>To improve our website and services</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
        <p className="mb-4">
          We use Razorpay for secure payment processing. Your sensitive financial data is handled by Razorpay and never stored on our servers.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
        <p className="mb-4">
          We use encryption, access controls, and secure infrastructure to keep your data safe. However, no method of online transmission is 100% secure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
        <p>
          For any privacy-related concerns, email us at <strong>finalyrdata12@gmail.com</strong>
        </p>
      </div>
    </Layout>
  );
}
