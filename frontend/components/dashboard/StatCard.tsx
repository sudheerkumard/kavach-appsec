type Props = {
  title: string;
  value: number;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div className="card">
      <div>{title}</div>
      <div className="metric">{value}</div>
    </div>
  );
}