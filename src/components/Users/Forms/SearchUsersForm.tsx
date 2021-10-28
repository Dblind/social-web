import { Field, Form, Formik } from "formik";
import React, { Props } from "react";
import { TypeFilter } from "../../../Redux/users-reducer";


function searchUsersFormValidate(values: any) {
  const errors = {};
  // if (!values.email) {
  //   errors.email = 'Required';
  // } else if (
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  // ) {
  //   errors.email = 'Invalid email address';
  // }
  return errors;
}

type PropsType = { onFilterChanged: (filter: TypeFilter) => void, };
type TypeSerchUsersForm = {
  term: string,
  friend: "true" | "false" | "null",
}

const SearchUsersForm: React.FC<PropsType> = (props) => {
  const submit = (values: TypeSerchUsersForm, { setSubmitting }: { setSubmitting: (isSubmiting: boolean) => void }) => {
    const filter: TypeFilter = {
      term: values.term,
      friend: values.friend == "null" ? null 
        : values.friend == "true" ? true 
        : false,
    }

    props.onFilterChanged(filter);
    setSubmitting(false);
  }

  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: "null", }}
        validate={searchUsersFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followers</option>
              <option value="false">Only unfollowers</option>
            </Field>
            <Field type="text" name="term" />
            {/* <ErrorMessage name="email" component="div" /> */}
            {/* <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" /> */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SearchUsersForm;
