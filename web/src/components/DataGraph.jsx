import React from "react";
import { AreaChart } from "@tremor/react";

// Componente con memoización
export const DataGraph = React.memo(({ data }) => {
  return (
    <AreaChart
      data={data.map((item, index) => ({
        ...item,
        key: `${item.date}-${new Date().getTime()}-${index}`, // Usando el timestamp actual para asegurar unicidad
      }))}
      index="date"
      categories={["Organic", "Sponsored"]}
      colors={["blue", "violet"]}
      showLegend={false}
      showYAxis={false}
      showGridLines={true}
      startEndOnly={true}
      fill="solid"
      className="mt-6 h-48"
    />
  );
});
