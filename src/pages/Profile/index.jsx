import React, { useEffect, useState } from 'react';
import { Form, Input, Divider, Button, message, Spin } from 'antd';
import { useRequest } from 'ahooks';
import EmailSearch from '../components/EmailSearch';
import './index.css';
import { getNormalRules } from '../../utils/util';
import { PATTERN } from '../../common/pattern';
import { getProfile, updateProfile } from '../../service/profile';

const ReadItem = React.memo(({ value }) => {
  return <span className="read-item">{value || '-'}</span>;
});
function loaderFormItem(operateDom, operate) {
  return operate ? operateDom : <ReadItem />;
}

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [form] = Form.useForm();
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    form && form.setFieldsValue(profileData);
  }, [profileData]);

  const { loading } = useRequest(getProfile, {
    onSuccess: (res = {}) => {
      if (res.code !== 0) {
        message.error(res?.msg);
        return;
      }
      setProfileData(res.data || {});
    },
    onError: (res) => {
      message.error(res?.msg || '请求失败');
    },
    loadingDelay: 300,
  });
  const { run: fetchUpdateProfile, loading: updateLoading } = useRequest(updateProfile, {
    manual: true,
    onSuccess: (res = {}) => {
      if (res.code !== 0) {
        message.error(res?.msg);
        return;
      }
      setProfileData(res.data || {});
      message.success('更新成功');
      setEditForm(false);
    },
    onError: (res) => {
      message.error(res?.msg || '更新失败');
    },
  });

  const handleEdit = () => {
    setEditForm(true);
  };

  // 提交
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      fetchUpdateProfile(values);
    });
  };

  // 取消
  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue(profileData);
    setEditForm(false);
  };

  return (
    <div className="profile">
      <Form
        className="profile-form"
        form={form}
        readOnly={!editForm}
        colon={false}
        initialValues={profileData}
        requiredMark={false}>
        <h3>账户信息</h3>
        <Spin spinning={loading}>
          <Form.Item
            label="用户名"
            name="name"
            rules={getNormalRules('用户名', {
              pattern: PATTERN.CH_EN_NUM,
              maxLen: 20,
            })}
            validateFirst>
            {loaderFormItem(<Input autoComplete="off" placeholder="请输入用户名" />, editForm)}
          </Form.Item>
          <Divider />
          <Form.Item
            label="手机号"
            name="phone"
            rules={getNormalRules('手机号', {
              pattern: PATTERN.PHONE,
              validateLen: false,
              required: false,
            })}
            validateTrigger="onBlur"
            validateFirst>
            {loaderFormItem(<Input autoComplete="off" placeholder="请输入手机号" />, editForm)}
          </Form.Item>
          <Divider />
          <Form.Item label="邮箱" name="email">
            {loaderFormItem(<EmailSearch placeholder="请输入邮箱" />, editForm)}
          </Form.Item>
          {editForm ? (
            <>
              <Button className="profile-btn submit-btn" type="primary" onClick={handleSubmit} loading={updateLoading}>
                提交
              </Button>
              <Button className="profile-btn cancel-btn" onClick={handleReset}>
                取消
              </Button>
            </>
          ) : (
            <Button className="profile-btn edit-btn" onClick={handleEdit}>
              修改信息
            </Button>
          )}
        </Spin>
      </Form>
    </div>
  );
}
