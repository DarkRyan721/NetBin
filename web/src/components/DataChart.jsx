// 'use client';

import React from 'react';
import { RiCloseLine } from '@remixicon/react';
import { AreaChart } from '@tremor/react';
import { Button } from '@tremor/react';
import { Card } from '@tremor/react';


const summary = [
  { name: 'Organic', value: 3273 },
  { name: 'Sponsored', value: 120 },
];

// Formatea el valor numérico
const valueFormatter = (number) => `${Intl.NumberFormat('us').format(number).toString()}`;

// Colores para cada categoría
const statusColor = {
  Organic: 'bg-blue-500 dark:bg-blue-500',
  Sponsored: 'bg-violet-500 dark:bg-violet-500',
};

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(true);

  // Simula un reinicio de estado
  React.useEffect(() => {
    if (!isOpen) {
      const timeoutId = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">Follower metrics</h1>
        <AreaChart
          data={data}
          index="date"
          categories={['Organic', 'Sponsored']}
          colors={['blue', 'violet']}
          showLegend={false}
          showYAxis={false}
          showGridLines={true}
          startEndOnly={true}
          fill="solid"
          className="mt-6 h-48"
        />
        <ul role="list" className="mt-2 divide-y divide-gray-200 dark:divide-gray-800">
          {summary.map((item) => (
            <li key={item.name} className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className={`${statusColor[item.name]} h-[3px] w-3.5 shrink-0 rounded-full`} />
                <span className="text-gray-500 dark:text-gray-500">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-50">
                {valueFormatter(item.value)}
              </span>
            </li>
          ))}
        </ul>
        {isOpen ? (
          <div className="mt-3 rounded-md bg-gray-50 py-3 pl-4 pr-2 ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:ring-gray-400/20">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  More power?{' '}
                  <a
                    href="#"
                    className="font-normal text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Upgrade
                  </a>{' '}
                  <span className="font-normal text-gray-600 dark:text-gray-400">
                    to get more insights.
                  </span>
                </p>
              </div>
              <Button
                variant="ghost"
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-500 hover:dark:text-gray-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
              </Button>
            </div>
          </div>
        ) : null}
      </Card>
    </>
  );
}
