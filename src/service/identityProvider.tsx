export interface IIdentity {
    firstName: string;
    lastName: string;
    identificationDocumentId: string;
}

const IdentityProvider = {
    getIdentity(): IIdentity {
        const rawIdentity = window.localStorage.getItem('identity');
        if (rawIdentity) {
            return JSON.parse(rawIdentity) as IIdentity;
        } else {
            return {} as IIdentity
        }
    },

    setIdentity(firstName: string, lastName: string, identificationDocumentId: string) {
        window.localStorage.setItem('identity', JSON.stringify({
            firstName,
            lastName,
            identificationDocumentId,
        }));
    },

    isLoggedIn() {
        const identity = IdentityProvider.getIdentity();
        return identity.firstName && identity.lastName && identity.identificationDocumentId ? true : false;
    },

    logout() {
        window.localStorage.removeItem('identity');
    }
}

export default IdentityProvider;