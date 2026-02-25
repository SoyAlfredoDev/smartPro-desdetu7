import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "Launch of New Feature",
    date: "2024-10-01",
    excerpt:
      "We are excited to announce the release of our new feature that will improve user experience.",
    image: "/placeholder.png",
  },
  {
    id: 2,
    title: "Company Milestone",
    date: "2024-09-15",
    excerpt: "Celebrating 10 years of innovation and growth.",
    image: "/placeholder.png",
  },
];

export default function News() {
  return (
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Latest News
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={200}
              className="rounded"
            />
            <h3 className="mt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
              {item.title}
            </h3>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {item.date}
            </time>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {item.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
