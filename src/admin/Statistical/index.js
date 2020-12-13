import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';

import { getAllCourses } from '../../actions';

function Statistical({ listUsers, listCourses, getAllCourses }) {
  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  const topBuyCourses = useMemo(() => {
    if (!listUsers.listUsers.length || !listCourses.length) return [];

    let arr = [];

    const listAfterMap = listUsers.listUsers
      .map(user => user.course)
      .filter(course => !!course)
      .map(item => item.map(x => x.id));

    listAfterMap.forEach(y => {
      arr = [...[...arr, ...y]];
    });

    return listCourses.map(z => {
      let count = 0;

      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === z._id) count++;
      }
      return {
        ...z,
        count,
      };
    });
  }, [listUsers, listCourses]);

  const topRevenueCourses = useMemo(() => {
    if (!topBuyCourses.length) return [];

    return topBuyCourses.map(course => ({
      name: course.name,
      revenue: course.cost * course.count,
    }));
  }, [topBuyCourses]);

  const topUserBuyCountCourses = useMemo(() => {
    if (!listUsers || !listUsers.listUsers || !listUsers.listUsers.length) return [];

    return listUsers.listUsers.map(user => ({
      name: user.name,
      count: user.course ? user.course.length : 0,
    }));
  }, [listUsers]);

  const topUserBuyMoneyCourses = useMemo(() => {
    if (!listUsers || !listUsers.listUsers || !listUsers.listUsers.length) return [];

    return listUsers.listUsers.map(user => ({
      name: user.name,
      money: user.course ? user.course.map(x => x.cost || 0).reduce((y, z) => y + z) : 0,
    }));
  }, [listUsers]);

  const totalRevenue = useMemo(() => {
    if (!topUserBuyMoneyCourses.length) return 0;

    return topUserBuyMoneyCourses.map(x => x.money).reduce((y, z) => y + z);
  }, [topUserBuyMoneyCourses]);

  const totalUser = useMemo(() => {
    if (!listUsers || !listUsers.listUsers || !listUsers.listUsers.length) return 0;

    return listUsers.listUsers.length;
  }, [listUsers]);

  const totalCourses = useMemo(() => {
    if (!listCourses || !listCourses.length) return 0;

    return listCourses.length;
  }, [listCourses]);

  return (
    <>
      <p>
        <span style={{ fontWeight: 'bold' }}>Tổng Doanh Thu :</span>
        <span style={{ fontWeight: 'bold', color: '#002bff', marginLeft: 10 }}>{totalRevenue} coin</span>
        <span style={{ fontWeight: 'bold', color: '#cc00ff', marginLeft: 10 }}>Tương ứng</span>
        <span style={{ fontWeight: 'bold', color: 'red', marginLeft: 10 }}>
          {(totalRevenue * 1000).toLocaleString('en-US', { style: 'currency', currency: 'VND' }).slice(1)} VND
        </span>
      </p>

      <p>
        <span style={{ fontWeight: 'bold' }}>Tổng Số Học Viên :</span>
        <span style={{ fontWeight: 'bold', color: '#002bff', marginLeft: 10 }}>{totalUser} học viên</span>
      </p>

      <p>
        <span style={{ fontWeight: 'bold' }}>Tổng Số Khóa Học :</span>
        <span style={{ fontWeight: 'bold', color: '#002bff', marginLeft: 10 }}>{totalCourses} khóa học</span>
      </p>

      <div className="total-statistical">
        {!!topBuyCourses.length && (
          <div>
            <div style={{ fontWeight: 'bold' }}>Top Khóa Học Được Mua Nhiều Nhất</div>
            <Chart
              options={{
                chart: {
                  width: 500,
                  type: 'pie',
                },
                labels: topBuyCourses.map(course => course.name),
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              }}
              series={topBuyCourses.map(course => course.count)}
              type="pie"
              width={500}
            />
          </div>
        )}
        {!!topRevenueCourses.length && (
          <div>
            <div style={{ fontWeight: 'bold' }}>Top Khóa Học Mang Lại Doanh Thu Cao Nhất</div>
            <Chart
              options={{
                chart: {
                  width: 500,
                  type: 'pie',
                },
                labels: topRevenueCourses.map(course => course.name),
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              }}
              series={topRevenueCourses.map(course => course.revenue)}
              type="pie"
              width={500}
            />
          </div>
        )}
        {!!topUserBuyCountCourses.length && (
          <div>
            <div style={{ fontWeight: 'bold' }}>Top Học Viên Mua Nhiều Khóa Học Nhất</div>
            <Chart
              options={{
                chart: {
                  width: 500,
                  type: 'pie',
                },
                labels: topUserBuyCountCourses.map(course => course.name),
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              }}
              series={topUserBuyCountCourses.map(course => course.count)}
              type="pie"
              width={500}
            />
          </div>
        )}
        {!!topUserBuyMoneyCourses.length && (
          <div>
            <div style={{ fontWeight: 'bold' }}>Top Học Viên Bỏ Nhiều Tiền Mua Khóa Học Nhất</div>
            <Chart
              options={{
                chart: {
                  width: 500,
                  type: 'pie',
                },
                labels: topUserBuyMoneyCourses.map(course => course.name),
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
              }}
              series={topUserBuyMoneyCourses.map(course => course.money)}
              type="pie"
              width={500}
            />
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = ({ listUsers, listCourses }) => ({ listUsers, listCourses });

export default connect(mapStateToProps, { getAllCourses })(Statistical);
