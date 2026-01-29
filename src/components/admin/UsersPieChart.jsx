import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F"]; // Blue = Admin, Green = Employee

// Custom label showing percentage
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > Number(cx) ? "start" : "end"} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom pie slice color
const MyCustomPie = (props) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

// Main component
const UsersPieChart = ({ users }) => {
  const adminCount = users.filter((u) => u.role === "admin").length;
  const employeeCount = users.filter((u) => u.role === "employee").length;

  const data = [
    { name: "Admin", value: adminCount },
    { name: "Employee", value: employeeCount },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Responsive PieChart */}
      <div className="w-full h-90">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
              isAnimationActive={true}
              shape={MyCustomPie}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[0] }}></span>
          <span>Admins: {adminCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[1] }}></span>
          <span>Employees: {employeeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default UsersPieChart;
