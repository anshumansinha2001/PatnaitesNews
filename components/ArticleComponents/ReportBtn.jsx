"use client";
import { useRouter } from "next/navigation";
import { FiFlag } from "react-icons/fi";

const ReportBtn = ({ slug }) => {
  const router = useRouter();

  const handleReport = () => {
    router.push(`/report/${slug}`);
  };
  return (
    <button
      onClick={handleReport}
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent md:px-5"
    >
      <FiFlag className="text-[15px]" /> Report
    </button>
  );
};

export default ReportBtn;
