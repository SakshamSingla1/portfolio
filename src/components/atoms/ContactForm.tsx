import React from 'react';
import { useContactUsService, type ContactUsRequest } from '../../services/useContactUsService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from '../../utils/constant';
import TextField from '../atoms/TextField';
import Button from '../atoms/Button';

interface ContactFormProps {
  profileId: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/,
    'Invalid phone number'
  ),
  message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const ContactForm: React.FC<ContactFormProps> = ({ profileId }) => {
  const contactUsService = useContactUsService();

  const formik = useFormik<ContactUsRequest>({
    initialValues: {
      name: '',
      email: '',
      message: '',
      phone: '',
      profileId: profileId,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await contactUsService.create(values);
        if (response?.status === 200) {
          resetForm();
        } else {
          console.error('Error creating contact:', response?.data?.message);
        }
      } catch (error) {
        console.error('Error creating contact:', error);
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-xl shadow-lg" style={{ background: COLORS.secondary }}>
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium" style={{ color: COLORS.offWhite }}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              backgroundColor: COLORS.darkShade1,
              borderColor: formik.touched.name && formik.errors.name ? COLORS.error : 'transparent',
              color: COLORS.offWhite
            }}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm" style={{ color: COLORS.error }}>{formik.errors.name}</p>
          )}
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium" style={{ color: COLORS.offWhite }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                backgroundColor: COLORS.darkShade1,
                borderColor: formik.touched.email && formik.errors.email ? COLORS.error : 'transparent',
                color: COLORS.offWhite
              }}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm" style={{ color: COLORS.error }}>{formik.errors.email}</p>
            )}
          </div>
  
          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium" style={{ color: COLORS.offWhite }}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                backgroundColor: COLORS.darkShade1,
                borderColor: formik.touched.phone && formik.errors.phone ? COLORS.error : 'transparent',
                color: COLORS.offWhite
              }}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm" style={{ color: COLORS.error }}>{formik.errors.phone}</p>
            )}
          </div>
        </div>
  
        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium" style={{ color: COLORS.offWhite }}>
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              backgroundColor: COLORS.darkShade1,
              borderColor: formik.touched.message && formik.errors.message ? COLORS.error : 'transparent',
              color: COLORS.offWhite
            }}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent resize-none"
          />
          {formik.touched.message && formik.errors.message && (
            <p className="mt-1 text-sm" style={{ color: COLORS.error }}>{formik.errors.message}</p>
          )}
        </div>
  
        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            style={{
              background: formik.isSubmitting || !formik.isValid 
                ? COLORS.grayTransparent 
                : COLORS.primaryGradient,
              color: COLORS.darkest
            }}
            onClick={() => formik.handleSubmit()}
            className="w-full py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition duration-200"
          >
            {formik.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;