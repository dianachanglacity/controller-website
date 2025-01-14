import c from 'calendar';
import Link from 'next/link';
import * as React from 'react';

import '@/styles/aboutstyles.module.css';

import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import Seo from '@/components/Seo';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const importantdates: any = {
  '2023': {
    holiday: [
      '01-02',
      '01-16',
      '02-20',
      '03-27',
      '05-29',
      '07-04',
      '09-04',
      '10-09',
      '11-10',
      '11-23',
      '11-24',
      '12-25',
    ],
    excess: ['01-25'],
    nodeduction: ['05-31', '11-29'],
    endofpay: [
      //every other saturday of 2023
      '01-14',
      '01-28',
      '02-11',
      '02-25',
      '03-11',
      '03-25',
      '04-08',
      '04-22',
      '05-06',
      '05-20',
      '06-03',
      '06-17',
      '07-01',
      '07-15',
      '07-29',
      '08-12',
      '08-26',
      '09-09',
      '09-23',
      '10-07',
      '10-21',
      '11-04',
      '11-18',
      '12-02',
      '12-16',
      '12-30',
    ],
    payday: [
      //every other wednesday of 2023 except for the excess sick pays and no deduction pays

      '01-11',
      '02-08',
      '02-22',
      '03-08',
      '03-22',
      '04-05',
      '04-19',
      '05-03',
      '05-17',
      '06-14',
      '06-28',
      '07-12',
      '07-26',
      '08-09',
      '08-23',
      '09-06',
      '09-20',
      '10-04',
      '10-18',
      '11-01',
      '11-15',
      '12-13',
      '12-27',
    ],
  },
};

const endofpayperiodsreference: any = {
  '2023': {
    '01-14': '15',
    '01-28': '16',
    '02-11': '17',
    '02-25': '18',
    '03-11': '19',
    '03-25': '20',
    '04-08': '21',
    '04-22': '22',
    '05-06': '23',
    '05-20': '24',
    '06-03': '25',
    '06-17': '26',
    '07-01': '1',
    '07-15': '2',
    '07-29': '3',
    '08-12': '4',
    '08-26': '5',
    '09-09': '6',
    '09-23': '7',
    '10-07': '8',
    '10-21': '9',
    '11-04': '10',
    '11-18': '11',
    '12-02': '12',
    '12-16': '13',
    '12-30': '14',
  },
};

export function DatesLegendItem(props: any) {
  return (
    <div className='flex flex-row flex-nowrap'>
      <div
        className={`h-5 w-5 rounded-full ${props.colorstring} printcolour `}
      ></div>

      <div className='ml-2  print:text-black'>{props.label}</div>
    </div>
  );
}

export default function PayrollCalendar(props: any) {
  const [selectedYear, setSelectedYear] = React.useState<number>(2023);
  const [todaysDate, setTodaysDate] = React.useState<string>('');
  const [calendar, setCalendar] = React.useState<Array<Array<Array<number>>>>(
    []
  );
  const [listofimportantdates, setListofimportantdates] = React.useState<any>(
    {}
  );

  function setCurrentDate() {
    // current datetime string in America/Chicago timezone
    const la_datetime_str = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });

    // create new Date object
    const date_la = new Date(la_datetime_str);

    // year as (YYYY) format
    const year = date_la.getFullYear();

    // month as (MM) format
    const month = ('0' + (date_la.getMonth() + 1)).slice(-2);

    // date as (DD) format
    const date = ('0' + date_la.getDate()).slice(-2);

    // date time in YYYY-MM-DD format
    const date_time = year + '-' + month + '-' + date;

    // "2021-03-22"
    console.log(date_time);

    if (todaysDate !== date_time) {
      setTodaysDate(date_time);
    }
  }

  function generateCalendar() {
    const cal = new c.Calendar();

    const monthsarray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const arraysofwholecalendar = monthsarray.map((month: number) => {
      return cal.monthDays(selectedYear, month);
    });

    setCalendar(arraysofwholecalendar);
  }

  function getcategoryfromdate(month: number, day: number) {
    const stringmonth = ('0' + month).slice(-2);
    const stringday = ('0' + day).slice(-2);

    console.log('stringmonth', stringmonth);
    console.log('stringday', stringday);

    if (listofimportantdates[stringmonth] === undefined) {
      return '';
    }

    if (listofimportantdates[stringmonth][stringday] === undefined) {
      return '';
    }

    const category = listofimportantdates[stringmonth][stringday];

    return category;
  }

  function checkiftodaysdate(month: number, day: number) {
    const stringmonth = ('0' + month).slice(-2);
    const stringday = ('0' + day).slice(-2);

    const todaysdatecheck = `${selectedYear}-${stringmonth}-${stringday}`;

    if (todaysDate === todaysdatecheck) {
      return ' border-2 border-black dark:border-white';
    } else {
      return ' ';
    }
  }

  function endofpayperiodstring(month: number, day: number) {
    const yeartoref = endofpayperiodsreference[String(selectedYear)];

    const stringmonth = ('0' + month).slice(-2);

    const stringday = ('0' + day).slice(-2);

    const refstring = `${stringmonth}-${stringday}`;

    console.log('ref string', refstring);

    const answer = yeartoref[refstring];

    if (answer) {
      return answer;
    } else {
      return '';
    }
  }

  function getAriaOfDate(month: number, day: number) {
    const category = getcategoryfromdate(month, day);

    const date = new Date(selectedYear, month, day);

    let aria = `${date.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}`;

    if (category) {
      aria =
        aria +
        ` is a ${category} ${
          category.toLowerCase().includes('day') ? '' : 'day'
        }`;
    }

    return aria;
  }

  function givecolourstringfromdate(month: number, day: number) {
    const category = getcategoryfromdate(month, day);

    switch (category) {
      case 'holiday':
        return 'bg-yellow-500 dark:bg-yellow-500 dark:text-black printcolour ';
      case 'excess':
        return 'bg-purple-500 dark:bg-purple-500 dark:text-black printcolour ';
      case 'nodeduction':
        return 'bg-red-500 dark:bg-red-500 dark:text-black printcolour ';
      case 'endofpay':
        return 'bg-blue-500 dark:bg-blue-500 dark:text-black printcolour ';
      case 'payday':
        return 'bg-green-500 dark:bg-green-500 dark:text-black printcolour';
      default:
        return '';
    }
  }

  function indexOfDates() {
    const yearToLook = String(selectedYear);

    const listofdates: any = {};

    const selectedYearObject = importantdates[yearToLook];

    console.log('selectedYearObject', selectedYearObject);

    Object.keys(selectedYearObject).forEach((categoryname) => {
      const category = selectedYearObject[categoryname];

      category.forEach((date: string) => {
        const month = date.split('-')[0];
        const day = date.split('-')[1];

        if (listofdates[month] === undefined) {
          listofdates[month] = {};
        }

        listofdates[month][day] = categoryname;
      });
    });

    console.log(listofdates);

    setListofimportantdates(listofdates);
  }

  React.useEffect(() => {
    indexOfDates();
    generateCalendar();

    setInterval(() => {
      setCurrentDate();
    }, 1000);
  }, []);

  React.useEffect(() => {
    indexOfDates();
    generateCalendar();
  }, [selectedYear]);

  return (
    <>
      <Navbar />

      <Layout>
        {/* <Seo templateTitle='Home' /> */}

        <Seo title='Payroll Calendar - Los Angeles Controller' />

        <div className='mx-2 flex w-full flex-col px-4 py-2   dark:text-white print:text-black  print:text-black sm:mx-4 md:px-0 lg:mx-auto lg:max-w-3xl  xl:max-w-4xl'>
          <div className='flex flex-row gap-x-2 pt-2  pb-2  print:text-black '>
            <h1 className='dark:text-white  print:text-black'>
              Payroll Calendar {selectedYear}
            </h1>
            <Link
              download={true}
              href='/payroll2023v2.pdf'
              target='_blank'
              referrerPolicy='no-referrer'
            >
              <button className='my-auto rounded-full bg-black p-1.5 text-white dark:bg-white dark:text-black print:hidden  md:p-2'>
                <svg className='l-4 h-4' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z'
                  />
                </svg>
              </button>
            </Link>
          </div>
          <p className='text-green-900 underline dark:text-mejito '>
            <Link
              href='/legacy-Payroll-Calendar-2023.pdf'
              className='font-semibold text-green-500 dark:text-mejito'
            >
              Print Old Version
            </Link>
          </p>
          <div>
            <div className='flex flex-row flex-wrap gap-x-4 gap-y-2'>
              <DatesLegendItem
                colorstring='bg-yellow-500 dark:bg-yellow-500 dark:text-black'
                label='Holiday'
              />
              <DatesLegendItem
                colorstring='bg-green-500 dark:bg-green-500 dark:text-black'
                label='Pay Day'
              />
              <DatesLegendItem
                colorstring='bg-red-500 dark:bg-red-500 dark:text-black'
                label='No Deduction Pay'
              />
              <DatesLegendItem
                colorstring='bg-purple-500 dark:bg-purple-500 dark:text-black'
                label='Excess Sick Pay'
              />
              <DatesLegendItem
                colorstring='bg-blue-500 dark:bg-blue-500 dark:text-black'
                label='End of Pay Period'
              />
              <p>
                <span className='font-bold print:text-black'>[PP]</span> Pay
                Period
              </p>
            </div>
          </div>

          <div
            className={
              `mt-2 sm:mx-4 sm:grid sm:grid-cols-2 sm:gap-8 lg:mx-0 lg:grid-cols-3` +
              '  print:grid-cols-3 '
            }
          >
            {calendar.length != 0 &&
              calendar.map((month, monthindex: number) => (
                <div key={monthindex} className=''>
                  <h3 className='w-full text-center'>
                    {new Date(`2022-${monthindex + 1}-15`).toLocaleDateString(
                      'default',
                      {
                        month: 'long',
                      }
                    )}
                  </h3>
                  <div className='mx-auto pt-2'>
                    {month.map((weekline, weeklineindex) => (
                      <div
                        key={weeklineindex}
                        className='grid grid-cols-8 content-center'
                      >
                        {weekline.map((day, dayindex) =>
                          day === 0 ? (
                            <div
                              key={dayindex}
                              className={`h-7 w-7
                            
                           
                            `}
                            ></div>
                          ) : (
                            <div
                              key={dayindex}
                              className={`printcolour flex h-7 w-7 items-center justify-center rounded-full ${givecolourstringfromdate(
                                monthindex + 1,
                                day
                              )}  ${checkiftodaysdate(monthindex + 1, day)}`}
                            >
                              <time
                                dateTime={`${selectedYear}-${
                                  monthindex + 1
                                }-${day}`}
                              >
                                <p
                                  className='m-auto print:text-black'
                                  aria-label={getAriaOfDate(
                                    monthindex + 1,
                                    day
                                  )}
                                >
                                  {day}
                                </p>
                              </time>
                            </div>
                          )
                        )}

                        <div className='flex h-7 w-7 justify-center font-bold  print:text-black'>
                          {weekline[6] !== 0 &&
                            endofpayperiodstring(
                              monthindex + 1,
                              weekline[6]
                            ) && (
                              <>
                                <span>[</span>
                                <span>
                                  {endofpayperiodstring(
                                    monthindex + 1,
                                    weekline[6]
                                  )}
                                </span>
                                <span>]</span>
                              </>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
