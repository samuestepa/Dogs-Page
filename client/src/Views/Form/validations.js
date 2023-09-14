const regImage = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\./;
const regName = /^[a-zA-Z\s]+$/;
const regNumber = /^(?:[1-9][0-9]?|100)$/;

const validations = (formData) => {
    const error = {};
    if (!regImage.test(formData.image)) error.image = "Url image is not valid";
    if (!formData.image) error.image = "Image is required";

    if (!regName.test(formData.name)) error.name = "Name is not valid";
    if (!formData.name) error.name = "Name is required";

    if  (!regNumber.test(formData.heightMin)) error.heightMin = "Value is not valit"
    if  (!regNumber.test(formData.heightMax)) error.heightMax = "Value is not valit"
    if  (!regNumber.test(formData.weightMin)) error.weightMin = "Value is not valit"
    if  (!regNumber.test(formData.weightMax)) error.weightMax = "Value is not valit"
    if  (!regNumber.test(formData.lifeSpan)) error.lifeSpan = "Value is not valit"

    if (Number(formData.heightMin) >= Number(formData.heightMax)) {
        error.heightMax = "Minimum cannot be greater than or equal to maximum";
    }
    if (!formData.heightMin && !formData.heightMax) error.heightMin = "Minimum height is required";
    if (!formData.heightMax) error.heightMax = "Maximum height is required";

    if (Number(formData.weightMin) >= Number(formData.weightMax)) error.weightMax = "Minimum cannot be greater than or equal to maximum";
    if (!formData.weightMin && !formData.weightMax) error.weightMin = "Minimum weight is required";
    if (!formData.weightMax) error.weightMax = "Maximum weight is required";

    if (!formData.lifeSpan) error.lifeSpan = "Life span is required";

    if (!formData.temperaments || formData.temperaments.length === 0) error.temperaments = "Not selected any value yet";
    return error;
};

export default validations;