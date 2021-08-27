function convertActionNameToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}

export const actions = new Proxy(
    {},//target
    {
        // prop="setCompanyName"
        // args=company_name="ex:"leader"
        get: function (target, prop) {

            if (target[prop] === undefined)
                return function (args) {
                    return {
                        type: convertActionNameToType(prop),//SET_COMPANY_NAME
                        payload: args
                    };////     return {type:"SET_COMPANY_NAME",payload:company_name}

                };

            else return target[prop];
        }
    }
);