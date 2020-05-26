(function() {
    const formfill = [
        { id: 'startAddressStreet', val: 'Startstraße' },
        { id: 'startAddressHouseNum', val: '2' },
        { id: 'startAddressZipCode', val: '70180' },
        { id: 'startAddressCity', val: 'Stuttgart' },
        { id: 'endAddressStreet', val: 'Zielweg' },
        { id: 'endAddressHouseNum', val: '9' },
        { id: 'endAddressZipCode', val: '70181' },
        { id: 'endAddressCity', val: 'Stuttgart' },
    ];

    formfill.forEach(item => {
        const el = document.getElementById(item.id)

        // change value
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(el, item.val);

        // dispatch event
        const ev = new Event('input', { bubbles: true});
        el.dispatchEvent(ev);
    });
})()