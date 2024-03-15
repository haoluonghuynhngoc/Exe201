export function updateProfile(values) {
    let errors = {};
    if (!values.providerName) {
        errors.providerName = "providerName is required";
    }
    if (!values.imageProvider) {
        errors.imageProvider = "imageProvider is required";
    }
    if (!values.contactInformation) {
        errors.contactInformation = "contactInformation is required";
    }
    if (!values.description) {
        errors.providerName = "description is required";
    }
    if (!values.serviceType) {
        errors.serviceType = "serviceType is required";
    }
    if (!values.rating) {
        errors.rating = "Rating is required";
    }
    if (!values.location) {
        errors.location = "Location is required";
    }

    if (!values.userName) {
        errors.userName = "Username is required";
    }
    if (!values.password) {
        errors.password = "Password is required";
    }
    return errors;
}