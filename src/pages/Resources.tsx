// src/pages/Resources.tsx
import React from "react";
import Layout from "@/components/ui/Layout";

const resources = [
  {
    id: 1,
    title: "OSCE Preparation Guide PDF",
    link: "/resources/osce-guide.pdf",
  },
  {
    id: 2,
    title: "Clinical Skills Video Series",
    link: "https://example.com/clinical-videos",
  },
  {
    id: 3,
    title: "Communication Skills Tips",
    link: "/resources/communication-tips.pdf",
  },
];

const Resources = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Resources</h1>

      <ul className="space-y-4">
        {resources.map((res) => (
          <li
            key={res.id}
            className="border p-4 rounded hover:shadow-lg transition cursor-pointer"
          >
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {res.title}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Resources;
