import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import * as React from 'react';
import { useEffect, useRef } from 'react';

export function BondsOverTime() {
  const bondsovertimeref = useRef<any>(null);

  useEffect(() => {
    d3.csv('/csvsforpafr22/4bondeddebtandlongtermnotespayable.csv').then(
      (bondeddebtandlongtermnotespayable: any) => {
        const bondeddebtandlongtermnotespayablecleaned =
          bondeddebtandlongtermnotespayable.filter(
            (eachItem: any) => eachItem.Total != null
          );

        const bondeddebtandlongtermnotespayablecleanedtotals =
          bondeddebtandlongtermnotespayablecleaned.filter(
            (eachItem: any) => eachItem['Activity Type'] === 'Governmental'
          );

        const plotforbondsovertimeelem = Plot.plot({
          color: {
            legend: true,
          },
          y: {
            tickFormat: 's',
          },
          marks: [
            Plot.barY(bondeddebtandlongtermnotespayablecleaned, {
              x: 'Fiscal Year',
              fill: 'Activity Type',
              y: 'Value',
            }),
            Plot.lineY(bondeddebtandlongtermnotespayablecleanedtotals, {
              x: 'Fiscal Year',
              y: 'Total',
            }),
            Plot.textY(bondeddebtandlongtermnotespayablecleanedtotals, {
              x: 'Fiscal Year',
              y: 'Total',
              text: 'Total',
              dx: 10,
            }),
            Plot.ruleY([0]),
          ],
        });

        if (bondsovertimeref.current) {
          console.log('current ref', bondsovertimeref.current);
          bondsovertimeref.current.append(plotforbondsovertimeelem);
        }
      }
    );
  }, []);

  return <div ref={bondsovertimeref}></div>;
}
