import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { updateProfileAction } from '../../../redux/actions/authActions';

function FormEdit({ data: user, handleClose }) {
  const [picture, setPicture] = useState(user?.avatar || null);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmitData = (formData) => {
    let bodyFormData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'avatar') {
        bodyFormData.append(key, formData[key][0]);
      } else {
        bodyFormData.append(key, formData[key]);
      }
    });

    dispatch(updateProfileAction(bodyFormData));
    handleClose();
  };

  const onChangePicture = (e) => {
    if (e.target.files.length !== 0) {
      setPicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const isNumber = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className="space-y-4">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <img
          src={picture}
          alt="avatar"
          className="w-44 h-44 rounded-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          {...register('avatar')}
          onChange={(e) => {
            register('avatar').onChange(e);
            onChangePicture(e);
          }}
          className="mt-3"
        />
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              defaultValue={user?.fullname || ''}
              {...register('fullname')}
              autoComplete="fullname"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              {...register('email')}
              autoComplete="email"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Birthday & Phone */}
        <div className="space-y-3">
          <div>
            <label className="block font-medium">Birthday</label>
            <input
              type="date"
              defaultValue={
                user?.birthday ? moment(user.birthday).format('YYYY-MM-DD') : ''
              }
              {...register('birthday')}
              autoComplete="birthday"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              maxLength="10"
              onInput={isNumber}
              defaultValue={user?.phone || ''}
              {...register('phone')}
              autoComplete="phone"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block font-medium">Address</label>
        <input
          type="text"
          defaultValue={user?.address || ''}
          {...register('address')}
          autoComplete="address"
          required
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </form>
  );
}

export default FormEdit;
