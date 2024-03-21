const errors = [
    // Programmatic errors
    "MISSING_ENV",

    // User errors
    "UNAUTHORIZED"
] as const;
export type ErrorKey = (typeof errors)[number];

const errorsObj = Object.fromEntries(errors.map((e) => [e, e])) as {
    [key in ErrorKey]: key;
};

const Errors = new Proxy(errorsObj, {
    get(target, prop) {
        prop = prop.toString();
        if (errors.includes(prop as ErrorKey)) {
            return prop;
        }
        throw new Error(`Error ${prop} not found`);
    }
});

export default Errors;
