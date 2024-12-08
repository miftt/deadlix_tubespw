import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Bar,
    Line,
    LineChart,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const defaultData = [
    { month: "Jan", users: 125 },
    { month: "Feb", users: 147 },
    { month: "Mar", users: 162 },
    { month: "Apr", users: 184 },
    { month: "May", users: 198 },
    { month: "Jun", users: 223 },
];

interface UserChartProps {
    title: string;
    data?: Array<Record<string, string | number>>;
    dataKey: string;
    type: 'line' | 'bar';
}

export function UserChart({
    title,
    data = defaultData,
    dataKey,
    type
}: UserChartProps) {
    return (
        <Card className="dark:border-gray-800 dark:bg-gray-900/50">
            <CardHeader>
                <CardTitle className="">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {type === 'line' ? (
                            <LineChart data={data}>
                                <XAxis
                                    dataKey="month"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value: number) => `${value}${type === 'line' ? '%' : ''}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        border: "1px solid #374151",
                                    }}
                                    labelStyle={{ color: "#e5e7eb" }}
                                    itemStyle={{ color: "#e5e7eb" }}
                                    formatter={(value: number) => [`${value}${type === 'line' ? '%' : ''}`, '']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey={dataKey}
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        ) : (
                            <BarChart data={data}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value: number) => `${value}${type === 'bar' ? '%' : ''}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1f2937",
                                        border: "1px solid #374151",
                                    }}
                                    labelStyle={{ color: "#e5e7eb" }}
                                    itemStyle={{ color: "#e5e7eb" }}
                                    formatter={(value: number) => [`${value}${type === 'bar' ? '%' : ''}`, '']}
                                />
                                <Bar
                                    dataKey={dataKey}
                                    fill="#ef4444"
                                />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}