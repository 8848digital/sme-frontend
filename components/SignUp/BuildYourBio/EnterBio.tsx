import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/bio.module.css';
import { useRouter } from 'next/router';

const EnterBio = () => {
  const validationSchema = Yup.object().shape({
    bio: Yup.string()
      .required('Bio is required')
      .min(10, 'Bio must be at least 10 characters long'),
  });
const router = useRouter()
  const formik = useFormik({
    initialValues: {
      bio: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // You can submit the form data here
      router.push("/")
      console.log(values);
    },
  });

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_bio_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>Enter Your Bio Here</h1>
              <h3></h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-5">
                <div className="mb-3">
                  <textarea
                    name="bio"
                    id="bio"
                    className={`form-control ${formik.touched.bio && formik.errors.bio ? 'is-invalid' : ''}`}
                    rows={6}
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bio && formik.errors.bio && (
                    <div className="invalid-feedback">{formik.errors.bio}</div>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterBio;

