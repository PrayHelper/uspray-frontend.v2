let authorized = null;


const useAuthorized = () => {

    const isUndefined = () => {
        return authorized === null;
    }

    const isAuthrozed = () => {
        return authorized === true;
    }

    const setAutorized = () => {
        authorized = true;
    }

    const setUnAuthorized = () => {
        authorized = false;
    }

    const setUndefined = () => {
        authorized = null
    }

    return {
        isUndefined,
        isAuthrozed,
        setAutorized,
        setUnAuthorized,
        setUndefined
    }
}

export default useAuthorized;