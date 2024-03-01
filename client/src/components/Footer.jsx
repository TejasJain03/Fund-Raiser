const Footer = () => {
  return (
    <footer className="w-full h-auto p-6 bg-lightGray flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600">
          Have questions or need assistance? Reach out to our support team.
        </p>
        <div className="mt-4">
          <a
            href="mailto:support@pledgenow.com"
            className="text-blue-500 hover:underline"
          >
            Email: support@pledgenow.com
          </a>
        </div>
        <div className="mt-2">
          <p className="text-gray-500">Mangalore</p>
        </div>
        <div className="mt-4 text-gray-500">
          &copy; 2023 Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
