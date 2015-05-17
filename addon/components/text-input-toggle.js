import Ember from 'ember';
import layout from '../templates/components/text-input-toggle';

export default Ember.Component.extend({
    classNames: ['text-input-toggle'],
    classNameBindings: ['hover', 'textMode::active'],
    layout: layout,
    value: '',
    inputValue: '',
    textMode: true,
    notEmpty: true,

    // init
    setInputValue: Ember.on('init', function () {
        this.set('inputValue', this.get('value'));
    }),

    // event listeners
    mouseEnter: function () {
        this.set('hover', true);
    },
    mouseLeave: function () {
        this.set('hover', false);
    },
    click: function () {
        if (this.get('textMode')) {
            this.set('textMode', false);
            this.set('inputValue', this.get('value'));
        }
    },
    focusOut: function (e) {
        this.set('textMode', true);
        if (!this.$(e.relatedTarget).is('.cancel-edit')) {
            this.send('save');
        }
    },

    onTextModeChange: Ember.observer('textMode', function () {
        Ember.run.scheduleOnce('afterRender', this, function () {
            if (!this.get('textMode')) {
                this.$('input').focus();
            }
        });
        this.set('hover', false);
    }),

    actions: {
        save: function () {
            var inputValue = this.get('inputValue');
            if (this.get('value') !== inputValue) {
                if (this.get('notEmpty') && !inputValue.length) {
                    return;
                }
                this.set('value', inputValue);
                this.sendAction('afterUpdate', this.get('value'));
            }
        },
        cancel: function () {
            this.set('inputValue', this.get('value'));
        }
    }
});
