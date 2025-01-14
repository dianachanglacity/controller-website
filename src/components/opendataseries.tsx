import Link from 'next/link';
import * as React from 'react';

const kirbybutton =
  'w-content rounded-full bg-black px-4 py-2 font-bold text-white dark:bg-white dark:text-black';

function EachDataButton(props: any) {
  return (
    <div>
      <Link href={props.link}>
        <div className='w-full'>
          <a href={props.link} target='_blank' rel='noopener noreferrer'>
            <div className='rounded-lg bg-gray-200 px-2 py-2 dark:bg-zinc-800 dark:text-gray-100 '>
              <h3>{props.name}</h3>
              <div className='flex w-full flex-row gap-x-1'>
                {props.tags.includes('socrata') && (
                  <div className='rounded-full bg-gray-100 px-2 py-0.5 text-black dark:bg-zinc-700 dark:text-white'>
                    Socrata
                  </div>
                )}
                {props.tags.includes('buggy') && (
                  <div className='rounded-full bg-red-900 px-2 py-0.5 text-red-200 dark:bg-amber-900 dark:text-amber-300'>
                    ⚠️ Contains Bugs
                  </div>
                )}
              </div>
              <p className=''>
                Last Updated{' '}
                <span className='font-semibold'>
                  <time dateTime={props.lastupdated}>
                    {new Date(props.lastupdated).toLocaleDateString('default', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </span>
              </p>
              <p className=''>
                Data Since <span className='font-semibold'>{props.since}</span>
              </p>
              <div className='flex flex-row gap-x-2'>
                <p className=''>
                  Size <span className='font-semibold'>{props.size}</span>
                </p>
                <p className=''>
                  Rows <span className='font-semibold'>{props.rowcount}</span>
                </p>
              </div>
              <button className={kirbybutton}>View Data</button>
            </div>
          </a>
        </div>
      </Link>
    </div>
  );
}

export default function OpenDataSeries() {
  const datalinks = [
    {
      name: 'Payroll',
      link: 'https://lacity-2.payroll.socrata.com/',
      tags: ['socrata'],
      lastupdated: '2022-12-30',
      since: '2013',
      size: '122 MB',
      rowcount: '748K',
    },
    {
      name: 'Checkbook',
      link: 'https://lacity.spending.socrata.com/#!/year/2022/',
      tags: ['socrata'],
      lastupdated: '2023-01-13',
      size: '4.58GB',
      rowcount: '7.96M',
      since: '2012',
    },
    {
      name: 'All City Funds',
      link: 'https://controllerdata.lacity.org/Audits-and-Reports/All-City-Funds/ej7u-di9z/data',
      tags: ['socrata'],
      lastupdated: '2023-01-09',
      since: '2014',
      size: '575KB',
      rowcount: '840',
    },
    {
      name: 'Revenue',
      link: 'https://controllerdata.lacity.org/browse?category=Revenue',
      tags: ['socrata'],
      lastupdated: '2022-12-28',
      rowcount: '30.3K',
      size: '4.2MB',
      since: '2012',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4'>
      {datalinks.map((eachlink: any, eachlinknum: number) => (
        <EachDataButton
          key={eachlinknum}
          name={eachlink.name}
          link={eachlink.link}
          lastupdated={eachlink.lastupdated}
          since={eachlink.since}
          tags={eachlink.tags}
          size={eachlink.size}
          rowcount={eachlink.rowcount}
        />
      ))}
    </div>
  );
}
