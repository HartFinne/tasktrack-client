import React from "react";
import { PieChart, Pie, Sector } from "recharts";

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
    <div
      style={{
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16, // space between chart and legend
      }}
    >
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          dataKey="value"
          isAnimationActive={true}
          shape={MyCustomPie}
        />
      </PieChart>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 16, height: 16, backgroundColor: COLORS[0] }}></div>
          <span>Admins: {adminCount}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 16, height: 16, backgroundColor: COLORS[1] }}></div>
          <span>Employees: {employeeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default UsersPieChart;
