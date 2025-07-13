import Layout from "../../components/Layout";

export default function ContactUs() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h1>

        <p className="mb-4">
          If you have any questions, suggestions, or need support, feel free to reach out to us. Our team is always happy to help!
        </p>

        <div className="space-y-3">
          <p><strong>Email:</strong> finalyrdata12@gmail.com</p>
          <p><strong>Phone:</strong> +91-8770475998</p>
          <p><strong>Address:</strong> IIT ISM Dhanbad – 826004</p>
          <p><strong>Working Hours:</strong> Monday to Saturday, 10:00 AM – 6:00 PM</p>
        </div>
      </div>
    </Layout>
  );
}
