
export interface IIdentity {
    firstName: string | null;
    lastName: string | null;
    identificationDocumentId: string | null;
    hashedIdentificationDocumentId: string | null;
}

const IdentityProvider = {
    getIdentity(): IIdentity {
        const rawIdentity = window.localStorage.getItem('identity');
        if (rawIdentity) {
            return JSON.parse(rawIdentity) as IIdentity;
        } else {
            return {
                firstName: null,
                lastName: null,
                identificationDocumentId: null,
                hashedIdentificationDocumentId: null,
            }
        }
    },

    setIdentity(firstName: string, lastName: string, identificationDocumentId: string, hashedIdentificationDocumentId: string) {

        // console.log('set identity', {
        //     firstName, lastName, identificationDocumentId, hashedIdentificationDocumentId,
        // });

        window.localStorage.setItem('identity', JSON.stringify({
            firstName,
            lastName,
            identificationDocumentId,
            hashedIdentificationDocumentId,
        }));
    }
}

export default IdentityProvider;