interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage = ({ title }: PlaceholderPageProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold">{title}</h1>
  </div>
);