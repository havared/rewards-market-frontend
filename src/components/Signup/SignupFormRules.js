export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!values.firstname) {
    errors.firstname = 'First name is required';
  }
  if (!values.lastname) {
    errors.lastname = 'Last name is required';
  }
  if(values.is_brand){
      if (!values.brand) {
        errors.brand = 'Brand name is required';
      }
      if (!values.max_lp) {
          errors.max_lp = 'Loyal points is required';
      }else if (values.max_lp <= 0) {
          errors.max_lp = 'Loyal points should be greater than 0';
      }
  }
  return errors;
};
