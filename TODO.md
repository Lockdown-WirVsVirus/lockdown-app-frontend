# TODO

## concept of store tickets for logged in user

once a ticket is downloaded to Local storage, there is no property, if it is a ticket for the currently logged in users.
Because the downloaded ticket contains the hashedPassport. But frontend does only know the passportId.

Main problem is, what shall happen if the user is logging out? Shall we delete all downloaded tickets?
But than you can not access tickets when logging in without network connection.

Shall we add the original passport Id to downloaded ticket client side? Injecting information?
Or shall we create different "stores" in local storage. Each by user (by passport).

    store['PASSPORT_A] = tickets[]
    store['PASSPORT_B] = tickets[]
    # then the user can switch between downloaded tickets, just by logging out and in.
    # we should encode the key (the passort) with base64 then, or not?

if we add the PIN to encrypt downloaded tickets. we could verify the store, by adding a meta field with encrypted passport.
When we try to decrypt the local storage of a user (by passport) with a PIN, we just check if the encrypted meta property of passport equals to login passport.