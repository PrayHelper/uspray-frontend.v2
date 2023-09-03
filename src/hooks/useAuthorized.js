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

    return {
        isUndefined,
        isAuthrozed,
        setAutorized,
        setUnAuthorized,
    }
}

export default useAuthorized;