import React, {useState, useEffect} from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const Onboard = ({ values, touched, errors, status }) => {

  const [onboardState, setOnboardState] = useState([]);

  useEffect(() => {
    status && setOnboardState(onboardState => [...onboardState, status])
  },[status]);

  return (

    <div className="onboard-Form">

      <Form>

        <Field type="text" name="name" placeholder="Name" />

        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
        
        <br></br>
        <Field type="text" name="email" placeholder="Email" />
        <br></br>
        <Field component="select" className="favfood" name="favfood">
          <option>Choose an option</option>
          <option value="pizza">Pizza</option>
          <option value="burgers">burgers</option>
          <option value="salad">Salad</option>
        </Field>

        {touched.favfood && errors.favfood && <p className="error">{errors.favfood}</p>}
        <br></br>
        <label className="checkbox-container">

          {" "}

          Terms of Service

          <Field
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          <br></br>
          <span className="checkmark" />

        </label>

        <Field
          component="textarea"
          type="text"
          name="notes"
          placeholder="Notes"
        />
        <br></br>
        <button type="submit">Submit!</button>

      </Form>

      {onboardState.map(person => (

        <ul key={person.id}>
          <li>Name: {person.name}</li>
          <li>Email: {person.email}</li>
          <li>Password: {person.password}</li>
          <li>Fav-food: {person.favfood}</li>
          <li>Notes: {person.notes}</li>
        </ul>

      ))}

    </div>

  );
};
const FormikOnboard = withFormik({

  mapPropsToValues({ name, email, favfood, terms, notes }) {
    return {
      name: name || "",
      email: email || "",
      favfood: favfood || " ",
      terms: terms || false,
      notes: notes || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Put your name please!"),
    name: Yup.string().min(2),
    email: Yup.string().required("Put yo email!"),
    terms: Yup.string().required("State your terms"),
    notes: Yup.string().required("Wuz your notes"),
    favfood: Yup.string()
      .oneOf(["pizza", "burgers", "salad"])
      .required("Please select one")
  }),

  handleSubmit(values, {setStatus}) { 
    axios.post('https://reqres.in/api/users/', values) 
          .then(res => { setStatus(res.data); }) 
          .catch(err => console.log(err.response));
    }
})(Onboard);

export default FormikOnboard;
