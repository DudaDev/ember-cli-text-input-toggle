import Ember from 'ember';

export default Ember.Controller.extend({
    testValue: 'The value',

    actions: {
        valueUpdated: function (value) {
            this.set('testValue', value);
            console.log("value was updated: ", this.get('testValue'));
        }
    }
});