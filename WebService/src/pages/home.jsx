import React from "react";
import { Input, Button } from "@nextui-org/react";
import "./home.css";
import { Avatar } from "@nextui-org/react";
import { CameraIcon } from "../components/CameraIcon";
import Bin from "../components/Bin";
import { AreaChart } from "@tremor/react";
import { Card } from "@tremor/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import {useMqtt} from "../Hooks/useMqtt";



const data_graph = [
  { date: "Jan 23", Organic: 232, Sponsored: 0 },
  { date: "Feb 23", Organic: 241, Sponsored: 0 },
  { date: "Mar 23", Organic: 291, Sponsored: 0 },
  { date: "Apr 23", Organic: 101, Sponsored: 0 },
  { date: "May 23", Organic: 318, Sponsored: 0 },
  { date: "Jun 23", Organic: 205, Sponsored: 0 },
  { date: "Jul 23", Organic: 372, Sponsored: 0 },
  { date: "Aug 23", Organic: 341, Sponsored: 0 },
  { date: "Sep 23", Organic: 387, Sponsored: 120 },
  { date: "Oct 23", Organic: 220, Sponsored: 0 },
  { date: "Nov 23", Organic: 372, Sponsored: 0 },
  { date: "Dec 23", Organic: 321, Sponsored: 0 },
];

const data_table = [
  {
    owner: "John Doe",
    status: "live",
    costs: "$3,509.00",
  },
  {
    owner: "Jane Smith",
    status: "live",
    costs: "$5,720.00",
  },
  {
    owner: "Jane Smith",
    status: "live",
    costs: "$5,720.00",
  },

];

const username = "Usuario";
const percent_No_reciclable  = data_graph[data_graph.length - 1]?.Organic;
const lastOrganicValue = data_graph[data_graph.length - 1]?.Organic;
const lastNotOrganicValue = data_graph[data_graph.length - 1]?.Organic;
const coinBin = "5000";

export default function HomePage() {
  const topic = "iot/bin/data"; // Cambia al tópico de tu nodo IoT
  const messages = useMqtt(topic);

  console.log("Mensaje obtenidos: ", messages);
  return (
    <div className="home-container">
      <div className="menu-column">
        <div className="user-info flex gap-3">
          <Avatar
            showFallback
            src="..."
            className="w-12 h-12"
            fallback={
              <CameraIcon
                className="animate-pulse w-8 h-8 text-default-500"
                fill="currentColor"
                size={20}
              />
            }
          />

          <h1 className="username">{username}</h1>
        </div>

        <h1 className="CoinBin">CoinBins: {coinBin}</h1>
      </div>
      {/* ///////////////////////// */}
      <div className="bin-column">
        <h1 className="bin-column-title">BOTE DE BASURA</h1>
        <Card className="sm:mx-auto sm:max-w-lg bg-white text-gray-900">
          <h1 className="font-medium text-gray-900">Follower metrics</h1>
          <AreaChart
            data={data_graph}
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
        </Card>

        {/* <Bin /> */}

        <div>
          <h1 className="bin-percent">Porcentaje reciclabes: {lastOrganicValue}</h1>
          <h1 className="bin-percent">Porcentaje NO reciclabes: {lastOrganicValue}</h1>
        </div>
      </div>
      {/* ///////////////////////// */}
      <div className="Benefits-column">
        <h1 className="Benefits-title">BENEFICIOS</h1>

        <div className="Query-IA">

          <h1 className="Last-waste">Ultimos Desechos</h1>
          <div className="Table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Owner</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell> Costs </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data_table.map((item) => (
                  <TableRow key={item.workspace}>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.costs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </div>

        <div className="Benefits-list">

        </div>
      </div>
      {/* ///////////////////////// */}
    </div>
  );
}
