import React, { useEffect, useState, useMemo } from "react";
import { Avatar, Button } from "@nextui-org/react";
import "./home.css";
import { AreaChart } from "@tremor/react";
import { Card } from "@tremor/react";
import mqttClient from "../mqtt/mqttClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useMqttSub } from "../Hooks/useMqtt";
import { BarList } from "@tremor/react";
import { LogosNetflixIcon } from "../components/Netflix_Icon.jsx";
import { FlatColorIconsGoogle } from "../components/Google_Icon.jsx";
import { SimpleIconsMcdonalds } from "../components/Mcdonalds_Icon.jsx";
import { SimpleIconsCocacola } from "../components/CocaCola_Icon.jsx";
import { SimpleIconsWalmart } from "../components/Walmart_Icon.jsx";

const username = "Usuario";

export default function HomePage() {
  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    role: "",
    cobins: "0", // Valor inicial predeterminado
  });

  const [extended, setExtended] = useState(false); // Estado para alternar vista extendida

  const data_graph = useMqttSub("netbin/rasp/bin/sensor/level", 10);
  const data_table = useMqttSub("netbin/rasp/bin/sensor/AI", 3);

  const [reciclableState, setReciclableState] = useState(false); // Estado para compuerta reciclable
  const [noReciclableState, setNoReciclableState] = useState(false); // Estado para compuerta no reciclable

  const processedData_graph = useMemo(() => {
    return data_graph.map((item, index) => ({
      ...item,
      key: `graph-item-${index}`, // Evita usar un timestamp dinámico aquí
    }));
  }, [data_graph]);

  const processedData_table = useMemo(() => {
    return data_table.map((item, index) => ({
      ...item,
      key: `${item.date}-${index}`,
    }));
  }, [data_table]);

  const publishToTopic = (topic, message) => {
    if (mqttClient.connected) {
      mqttClient.publish(topic, message, (error) => {
        if (error) {
          console.error("Error al publicar en el topic:", error);
        } else {
          console.log(`Publicado en ${topic}: ${message}`);
        }
      });
    } else {
      console.error("Cliente MQTT no está conectado.");
    }
  };

  const toggleReciclable = () => {
    const newState = !reciclableState;
    setReciclableState(newState);
    const message = newState ? "abrir_reciclable" : "cerrar_reciclable";
    publishToTopic("netbin/rasp/bin/compuerta_reciclable", message);
  };

  // Función toggle para compuerta no reciclable
  const toggleNoReciclable = () => {
    const newState = !noReciclableState;
    setNoReciclableState(newState);
    const message = newState ? "abrir_no_reciclable" : "cerrar_no_reciclable";
    publishToTopic("netbin/rasp/bin/compuerta_no_reciclable", message);
  };

  const percent_No_reciclable =
    data_graph[data_graph.length - 1]?.NotOrganic || 0;
  const lastOrganicValue = data_graph[data_graph.length - 1]?.Organic || 0;

  // Datos para el componente BarList
  const pages = [
    { name: "Reciclables", value: lastOrganicValue },
    { name: "No Reciclables", value: percent_No_reciclable },
  ];

  const valueFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://netbin.onrender.com/user/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Actualiza los datos del usuario
          console.log("Datos del usuario:", data);
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="home-container">
      <div className="menu-column">
        <div className="user-info-block">
          <div className="avatar-container">
            <Avatar size="xl" />
          </div>
          <h1 className="user-title">
            👤 Nombre: <span>{userData.firstname}</span>
          </h1>
          <h1 className="user-title">
            🧾 Apellido: <span>{userData.lastname}</span>
          </h1>
          <p className="user-role">
            🏷️ Rol: <span>{userData.role}</span>
          </p>
        </div>
        <div className="cobins-block">
          <h1 className="cobins-title">🌟 CoBins</h1>
          <p className="cobins-value">{userData.cobins}</p>
        </div>
      </div>

      <div className="bin-column">
        <h1 className="bin-column-title">BOTE DE BASURA</h1>
        <Card>
          <AreaChart
            data={processedData_graph}
            index="timestamp_1"
            categories={["variable_1", "variable"]}
            colors={["blue", "violet"]}
            showLegend={false}
            showYAxis={false}
            showGridLines={true}
            startEndOnly={true}
            fill="solid"
            className="mt-6 h-48"
          />
        </Card>
        {/* Componente BarList */}
        <Card className="p-0 sm:mx-auto sm:max-w-lg mt-6">
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-900">
            <p className="font-medium text-gray-900 dark:text-gray-50">
              Porcentajes
            </p>
            <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
              Tipos de Basura
            </p>
          </div>
          <div
            className={`overflow-hidden p-6 ${extended ? "" : "max-h-[260px]"}`}
          >
            <BarList data={pages} valueFormatter={valueFormatter} />
          </div>
          <div
            className={`flex justify-center ${
              extended
                ? "px-6 pb-6"
                : "absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-white to-transparent dark:from-[#090E1A] py-7"
            }`}
          ></div>
        </Card>


      </div>

      <div className="Benefits-column">
        <h1 className="Benefits-title">Metricas de interacción</h1>
        <div className="Query-IA">
          <h1 className="Last-waste">Últimos Desechos</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Owner</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell> Costs </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processedData_table.map((item) => (
                <TableRow key={item.workspace}>
                  <TableCell>{item.variable_1}</TableCell>
                  <TableCell>{item.value_1}</TableCell>
                  <TableCell>{item.timestamp_1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="activation-board">
          {/* Botón con toggle para compuerta reciclable */}
          <Button
            color={reciclableState ? "success" : "primary"} // Cambia el color según el estado
            variant="shadow"
            className="custom-button"
            onClick={toggleReciclable}
          >
            {reciclableState
              ? "Cerrar Compuerta Reciclable"
              : "Abrir Compuerta Reciclable"}
          </Button>
          {/* Botón con toggle para compuerta no reciclable */}
          <Button
            color={noReciclableState ? "success" : "primary"} // Cambia el color según el estado
            variant="shadow"
            className="custom-button"
            onClick={toggleNoReciclable}
          >
            {noReciclableState
              ? "Cerrar Compuerta NO Reciclable"
              : "Abrir Compuerta NO Reciclable"}
          </Button>
        </div>
      </div>
    </div>
  );
}
