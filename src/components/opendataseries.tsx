import Link from 'next/link';
import * as React from 'react';

function EachDataButton(props: any) {
  return (
    <div>
      <Link href={props.link}>
        <div className='w-full'>
          <a href={props.link} target='_blank' rel='noopener noreferrer'>
            <div className='rounded-lg bg-gray-200 px-2 py-2 dark:bg-zinc-800 dark:text-gray-100 '>
              <h3>{props.name}</h3>
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
      link: 'https://lacity.payroll.finance.socrata.com/#!/year/2022/',
      tags: ['socrata', 'buggy'],
      lastupdated: '2022-12-30',
      since: '2013',
    },
    {
      name: 'Checkbook',
      link: 'https://lacity.spending.socrata.com/#!/year/2022/',
      tags: ['socrata'],
      lastupdated: '2023-01-03',
      since: '2012',
    },
    {
      name: 'Budget',
      link: 'https://controllerdata.lacity.org/browse?category=Budget',
      tags: ['socrata'],
      lastupdated: '2022-11-07',
      since: '2012',
    },
    {
      name: 'Revenue',
      link: 'https://controllerdata.lacity.org/browse?category=Revenue',
      tags: ['socrata'],
      lastupdated: '2022-12-28',
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
        />
      ))}
    </div>
  );
}
