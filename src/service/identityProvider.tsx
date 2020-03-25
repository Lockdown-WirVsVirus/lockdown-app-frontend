export interface IIdentity {
    firstName: string | undefined;
    lastName: string | undefined;
    identificationDocumentId: string | undefined;
    hashedIdentificationDocumentId: string | undefined;
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

    setIdentity(firstName: string, lastName: string, identificationDocumentId: string, hashedIdentificationDocumentId: string) {
        window.localStorage.setItem('identity', JSON.stringify({
            firstName,
            lastName,
            identificationDocumentId,
            hashedIdentificationDocumentId,
        }));
    },
    isLoggedIn() {
        const identity = IdentityProvider.getIdentity();
        return identity.firstName && identity.lastName && identity.identificationDocumentId && identity.hashedIdentificationDocumentId ? true : false;
    }
}

export default IdentityProvider;