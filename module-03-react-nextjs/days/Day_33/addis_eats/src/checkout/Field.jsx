import { forwardRef } from "react";
import PropTypes from "prop-types";

const Field = forwardRef(function Field({ as: Component, id, label, error, ...props }, ref) {
  const errorId = `${id}-error`;

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <Component
        id={id}
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Field.propTypes = {
  as: PropTypes.elementType,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

Field.defaultProps = {
  as: "input",
  error: "",
};

export default Field;