import Layout from "../../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">About CollegeBuddy</h1>

        <p className="mb-4">
          <strong>CollegeBuddy</strong> is a student-focused platform built to help college students explore,
          review, and make informed decisions about academic courses and professors. We aim to enhance the
          student learning experience by providing community-driven reviews, course materials, and shared notes.
        </p>

        <p className="mb-4">
          We also offer a curated collection of <strong>premium notes</strong> prepared by top-performing students
          and subject experts. These notes can be purchased at affordable prices to support quality content creation
          and help students prepare efficiently for exams.
        </p>

        <p className="mb-4">
          Our platform allows students to:
          <ul className="list-disc pl-6 mt-2">
            <li>Browse and filter academic courses by department, type, and semester</li>
            <li>Read detailed reviews and average ratings by peers</li>
            <li>Share and download course notes</li>
            <li>Buy premium notes through a secure Razorpay integration</li>
          </ul>
        </p>

        <p className="mb-4">
          CollegeBuddy is operated by a group of engineering students passionate about solving real academic
          challenges through technology. We do not collect or store any sensitive financial information on our servers.
          All payments are processed securely through Razorpay.
        </p>

        <p className="mt-6">
          For any queries, please contact us at: <br />
          <p><strong>Email:</strong> finalyrdata12@gmail.com</p>
          <p><strong>Phone:</strong> +91-8770475998</p>
          <p><strong>Address:</strong> IIT ISM Dhanbad – 826004</p>
          <p><strong>Working Hours:</strong> Monday to Saturday, 10:00 AM – 6:00 PM</p>
        </p>
      </div>
    </Layout>
  );
}
