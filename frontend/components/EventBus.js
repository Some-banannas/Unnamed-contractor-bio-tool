const eventBus = {
    on(event, callback) {
        // console.log('Listening for event:', event, callback)
        window.addEventListener(event, (e) => callback(e.detail));
    },

    dispatch(event, data) {
        // console.log('Dispatching event:', event, data)
        window.dispatchEvent(new CustomEvent(event, { detail: data }));
    },

    remove(event, callback) {
        try {
            // console.log('Attempting to remove event: ', event, callback)
            window.removeEventListener(event, callback);
            // console.log('Successfully removed event: ', event, callback)
        } catch (error) {
            // console.log('Could not remove event listener: ', event, error)
        }
    },
};


export default eventBus;