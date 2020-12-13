import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import { Button, Input, Space, Table, Form, Modal, Checkbox } from 'antd';
import { BsPencil } from 'react-icons/bs';
// import { MdDelete } from 'react-icons/md';
import moment from 'moment';
import { createCategory, getAllCategory, updateCategory } from '../../actions/index';

import { connect } from 'react-redux';

const Category = ({ fetchAllCategory, listCategory, listCourses, moveToCourse, updateCategory, createCategory }) => {
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const [category, setCategory] = useState({
    name: '',
    courses: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchAllCategory();
  }, [fetchAllCategory]);

  useEffect(() => {
    if (!idCategory) return;

    const currentCategory = listCategory.find(item => item._id === idCategory);

    setCategory({
      name: currentCategory.name,
      courses: currentCategory.courses,
    });
  }, [idCategory, listCategory]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 16,
      span: 8,
    },
  };

  const diffUpdate = useCallback(item => {
    const diffDayUpdate = moment().diff(moment(item.date_create), 'days');
    const diffHourUpdate = moment().diff(moment(item.date_create), 'hours');
    const diffMinuteUpdate = moment().diff(moment(item.date_create), 'minutes');
    const diffSecondUpdate = moment().diff(moment(item.date_create), 'seconds');

    if (diffDayUpdate) return `${diffDayUpdate} ngày trước`;
    if (diffHourUpdate) return `${diffHourUpdate} giờ trước`;
    if (diffMinuteUpdate) return `${diffMinuteUpdate} phút trước`;
    if (!diffSecondUpdate) return `vừa xong`;
    return `${diffSecondUpdate} giây trước`;
  }, []);

  const columns = [
    {
      align: 'center',
      title: 'Số thứ tự',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => <div>{listCategory.findIndex(item => item._id === record._id) + 1}</div>,
    },
    {
      align: 'center',
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: 'Ngày tạo',
      dataIndex: 'date_create',
      key: 'date_create',
      render: (_, record) => diffUpdate(record),
    },
    {
      align: 'center',
      title: 'Khóa học',
      dataIndex: 'courses',
      key: 'courses',
      render: (_, record) => (
        <div id="scroll-modal" style={{ paddingRight: 10, maxHeight: 100, overflowX: 'auto' }}>
          {record.courses.map((itemTo, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              {listCourses
                .filter(item => item._id === itemTo)
                .map((iCourse, id) => (
                  <div key={id} style={{ marginBottom: '6px' }} onClick={moveToCourse}>
                    <img src={iCourse.image} width="50px" height="50px" alt="ad" />
                    <span style={{ marginLeft: '6px' }}> {iCourse.name}</span>
                    <br />
                  </div>
                ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      align: 'center',
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <BsPencil className="styled-icon" onClick={() => showModalEdit(record)} />
        </Space>
      ),
    },
  ];

  const showModalEdit = record => {
    setIdCategory(record._id);

    setVisibleModalEdit(true);
  };

  const handleClickCheckbox = idCategory => {
    if (!category.courses.includes(idCategory)) {
      setCategory({
        ...category,
        courses: [...category.courses, idCategory],
      });
      return;
    }

    const arr = category.courses.filter(item => item !== idCategory);
    setCategory({
      ...category,
      courses: [...arr],
    });
  };

  const handleAddCategory = () => {
    createCategory({
      name: category.name,
    });
    setVisibleModalAdd(false);
  };

  const handleSaveCategory = () => {
    updateCategory({
      id: idCategory,
      data: category,
    });
    setVisibleModalEdit(false);
  };

  const handleSearchTermChange = e => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
  };

  const dataSourceCategory = useMemo(() => {
    if (!listCategory.length) return [];

    return listCategory
      .filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(item => ({
        ...item,
        key: item._id,
      }));
  }, [listCategory, searchTerm]);

  return (
    <Fragment>
      <Button
        type="primary"
        onClick={() => {
          setCategory({
            name: '',
            courses: [],
          });
          setVisibleModalAdd(true);
        }}
        style={{ margin: '10px 0px' }}
      >
        Thêm mới danh mục
      </Button>
      <div className="search-user">
        <Input allowClear placeholder="Tìm kiếm theo tên ..." onChange={handleSearchTermChange} value={searchTerm} />
      </div>
      <Table columns={columns} dataSource={dataSourceCategory} bordered />

      {/* Modal Add Category */}
      <Modal
        title="Thêm mới danh mục"
        onCancel={() => setVisibleModalAdd(false)}
        visible={visibleModalAdd}
        footer={null}
      >
        <Form {...layout}>
          <Form.Item label="Tên danh mục">
            <Input
              type="text"
              value={category.name}
              onChange={e =>
                setCategory({
                  ...category,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}>
            <Button type="primary" style={{ marginRight: 12, width: '64px' }} onClick={handleAddCategory}>
              Lưu
            </Button>
            <Button type="primary" onClick={() => setVisibleModalAdd(false)} style={{ width: '64px' }} danger>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Edit Category */}
      <Modal
        title="Chỉnh sửa danh mục"
        onCancel={() => setVisibleModalEdit(false)}
        visible={visibleModalEdit}
        footer={null}
      >
        <Form {...layout}>
          <Form.Item label="Tên danh mục">
            <Input
              type="text"
              value={category.name}
              onChange={e =>
                setCategory({
                  ...category,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Khóa học">
            <div id="scroll-modal" style={{ paddingRight: 10, maxHeight: 200, overflowX: 'auto' }}>
              {listCourses.map((item, index) => (
                <div
                  key={index}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onClick={e => {
                    e.preventDefault();
                    handleClickCheckbox(item._id);
                  }}
                >
                  <div>
                    <img src={item.image} width="50px" height="50px" alt="ad" />
                    <span style={{ marginLeft: '6px' }}> {item.name}</span>
                  </div>
                  <div>
                    <Checkbox checked={category.courses.find(category => category === item._id)} />
                  </div>
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}>
            <Button type="primary" style={{ marginRight: 12, width: '64px' }} onClick={handleSaveCategory}>
              Lưu
            </Button>
            <Button type="primary" onClick={() => setVisibleModalEdit(false)} style={{ width: '64px' }} danger>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    listCategory: state.listCategorys,
    listCourses: state.listCourses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllCategory: data => dispatch(getAllCategory(data)),
    updateCategory: data => dispatch(updateCategory(data)),
    createCategory: data => dispatch(createCategory(data)),
    // updateUser: data => dispatch(updateUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
