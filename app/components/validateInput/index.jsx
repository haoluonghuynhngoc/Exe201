function Validate(props) {
    const errors = props.errors;
    return (
        errors && (
            <span style={{ color: "red" }}>
                {errors}
            </span>
        )
    );
}
export default Validate;
