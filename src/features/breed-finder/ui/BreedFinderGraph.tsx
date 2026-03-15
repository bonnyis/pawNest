import { PieChart } from "react-minimal-pie-chart";

const PAW_NEST_COLORS = [
  "#2E7D32", // 진한 초록
  "#1565C0", // 진한 파랑
  "#E65100", // 진한 주황
  "#C2185B", // 진한 분홍
  "#5D4037", // 브라운
];

interface ChartData {
  title: string;
  value: number;
  color?: string;
}

interface ChartProps {
  chartData: ChartData[];
  width?: string | number;
  height?: string | number;
}

const BreedFinderGraph = ({
  chartData = [],
  width = "200px",
  height = "200px",
}: ChartProps) => {
  if (chartData.length === 0) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-gray-500 font-medium">데이터가 없습니다.</span>
      </div>
    );
  }

  const coloredData = chartData.map((item, index) => ({
    ...item,
    color: item.color || PAW_NEST_COLORS[index % PAW_NEST_COLORS.length],
  }));

  return (
    <div style={{ width, height, margin: "0 auto" }}>
      <PieChart
        data={coloredData}
        // label 함수에서 title과 percentage를 함께 반환
        label={({ dataEntry }) =>
          `${dataEntry.title} (${Math.round(dataEntry.percentage)}%)`
        }
        labelStyle={{
          fontSize: "5px", // 타이틀이 길어질 수 있으므로 폰트 크기 조절
          fontFamily: "Pretendard, sans-serif",
          fill: "#FFFFFF",
          fontWeight: "bold",
        }}
        labelPosition={75} // 조각 내부 적절한 위치
        lineWidth={50} // 텍스트 공간 확보를 위해 조금 더 두껍게
        paddingAngle={2}
        rounded
        animate
      />
    </div>
  );
};

export default BreedFinderGraph;
